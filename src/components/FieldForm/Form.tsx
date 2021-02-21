import React ,{forwardRef, useImperativeHandle}from 'react'
import { Store, FormInstance, Callbacks } from './interface'
import FieldContext, { HOOK_MARK } from './FieldContext'
import useForm from './useForm'
import {Row, Col} from 'antd'

type BaseFormProps = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
>;

type RenderProps = (
  values: Store,
  form: FormInstance,
) => JSX.Element | React.ReactNode;

export interface FormProps<Values = any> extends BaseFormProps {
  initialValues?: Store;
  form?: FormInstance<Values>;
  children?: RenderProps | React.ReactNode;
  name?: string;
  onValuesChange?: Callbacks<Values>['onValuesChange'];
  onFieldsChange?: Callbacks<Values>['onFieldsChange'];
  onFinish?: Callbacks<Values>['onFinish'];
  onFinishFailed?: Callbacks<Values>['onFinishFailed'];
  validateTrigger?: string | string[] | false;
  preserve?: boolean;
  labelCol?: { offset?:number, span?:number }
  wrapperCol?: { offset?:number, span?:number }
}
const Form = forwardRef<any, FormProps>((props, ref) => {
// const Form: React.FC<FormProps> = (props) => {
  const {
    name,
    initialValues,
    form,
    preserve,
    labelCol,
    wrapperCol,
    children,
    onValuesChange,
    onFinish,
    onFinishFailed,
    ...restProps
  }: FormProps = props
  const [formInstance] = useForm(form);
  const { setCallbacks, setInitialValues } = formInstance as FormInstance;
  setCallbacks({
    onFinish,
    onFinishFailed,
    onValuesChange,
  });

  const mountRef = React.useRef<boolean>(true);
  setInitialValues(initialValues || {}, !mountRef.current);
  if (!mountRef.current) {
    mountRef.current = false;
  }

  useImperativeHandle(ref, () => formInstance)

  const formContextValue = React.useMemo(
    () => ({
      ...(formInstance as any),
      labelCol,
      wrapperCol
    }),
    [formInstance, labelCol, wrapperCol],
  );
  

  const WrapperNode = (
    <FieldContext.Provider value={formContextValue}>
      {children}
    </FieldContext.Provider>
  );

  return (
    <Row ref={ref}>
      <Col>
      <form
        className="ant-form ant-form-horizontal"
        {...restProps}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          event.stopPropagation();
          formInstance.submit();
        }}
      >
        {WrapperNode}
      </form>
      </Col>
    </Row>
  );
})

export default Form;
