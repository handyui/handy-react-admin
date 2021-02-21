import React, { Component } from 'react'
import FieldContext from './FieldContext'
import classNames from 'classnames'
import {
  EventArgs,
  FieldEntity,
  FormInstance,
  Rule,
  InternalFormInstance,
} from './interface'
import { validateRules } from './utils/validateUtil'
import {Row, Col} from 'antd'

interface ChildProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}


export interface InternalFieldProps<Values = any> {
  children?:
    | React.ReactElement
    | ((control: ChildProps, form: FormInstance<Values>) => React.ReactNode);
  /**
   * Set up `dependencies` field.
   * When dependencies field update and current field is touched,
   * will trigger validate rules and render.
   */
  name?: string;
  label?: string
  rules?: Rule[];
  initialValue?: any;
  onReset?: () => void;
  labelCol?: { offset?:number, span?:number }
  wrapperCol?: { offset?:number, span?:number }
  fieldContext?: InternalFormInstance
  required?:boolean
}

export interface FieldProps<Values = any>
  extends Omit<InternalFieldProps<Values>, 'name'|'fieldContext'> {
  name?: string;
}

export interface FieldState {
  errors: any[]
}

class Field extends Component<InternalFieldProps, FieldState> implements FieldEntity {
  public static contextType = FieldContext;
  private cancelRegister: any;
  private validatePromise: Promise<string[]> | null = null;
  private mounted = false
 
  constructor(props: InternalFieldProps) {
    super(props)
    this.state = {
      errors: []
    }
  }

  componentDidMount() {
    const { registerField } = this.context;
    this.cancelRegister = registerField(this);
    this.mounted = true
    console.log('rules', this.props.rules)
  }

  componentWillUnmount() {
    this.cancelRegister && this.cancelRegister();
    this.mounted = false
  }

  public reRender() {
    if (!this.mounted) return;
    this.forceUpdate()
  }

  public onStoreChange = () => {
    this.setState({errors: []})
    this.forceUpdate()
  };

  public validateError(error:any){
    console.log('error', error)
    if(error.length>0){
      // this.errors = error[0].message
      // console.log('error.length', this.errors)
      this.setState({errors: error})
    }
  }

  public validateRules = () => {
    const { rules, name } = this.props;
    if (!name || !rules || !rules.length) return [];
    const cloneRule: any = [...rules];
    const { getFieldValue } = this.context;
    const value = getFieldValue(name);
    const promise = validateRules(name, value, cloneRule);
    if (!this.mounted) {
      return [];
    }
    promise
      .catch(e => e)
      .then((errors: any) => {
        if (this.validatePromise === promise) {
          this.validatePromise = null
          this.setState({errors: errors})
          this.reRender()
          console.log('errors', errors )
        }
      });

    this.setState({errors: []})
    return promise;
  };

  getControled = () => {
    const { name } = this.props;
    const { getFieldValue, setFieldsValue } = this.context;
    return {
      value: getFieldValue(name),
      onChange: (...args: EventArgs) => {
        const event = args[0];
        if (event && event.target && name) {
          setFieldsValue({
            [name]: (event.target as HTMLInputElement).value,
          });
        }
      },
    };
  };
  render() {
    const { children, label, labelCol, wrapperCol, rules} = this.props
    const lCol = Object.assign((this.props.fieldContext as any).labelCol, labelCol) 
    const wCol = Object.assign((this.props.fieldContext as any).wrapperCol, wrapperCol)

    console.log(wCol, lCol)
    const returnChildNode = React.cloneElement(
      children as React.ReactElement,
      this.getControled(),
    );
    // console.log('rules',(rules as any)[0].required )

    const classes = classNames('ant-form-item', {
      [`ant-form-item-has-error`]: this.state.errors.length>0,
    })

    const labelClass = classNames({
      // [`ant-form-item-required`]: (rules as any)[0].required,
    })

    return (
      <>
       <Row className={classes}  key="row" >
          {label?<Col className='ant-form-item-label' span={lCol?lCol.span:''} offset={lCol?lCol.offset:''}>
            <label className={labelClass}>{label}</label>
          </Col>:''}
          
          <Col className="ant-form-item-control" span={wCol?wCol.span:''} offset={wCol?wCol.offset:''}>
            <div className="ant-form-item-control-input">{returnChildNode}</div>
            {this.state.errors.length>0?<div className="ant-form-item-explain ant-form-item-explain-error">
              <div role="alert">{this.state.errors[0].message}</div>
            </div>:''}
          </Col>
        </Row>
      </>
    )
  }
}

function WrapperField<Values = any>({ name, ...restProps }: FieldProps<Values>) {
  const fieldContext = React.useContext(FieldContext);
  let key: string = 'keep';
  return (
    <Field key={key} name={name} {...restProps} fieldContext={fieldContext}/>
  )
}

export default WrapperField;
