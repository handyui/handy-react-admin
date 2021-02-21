import React, {  useEffect, useRef, forwardRef, useImperativeHandle, useState, Fragment} from 'react'
import { Form, Input, Radio, InputNumber, Switch, 
  TreeSelect, Select, Checkbox, Modal } from 'antd'
import classNames from 'classnames'
import { FormInstance } from 'antd/lib/form';
import {isFunction} from '@/utils/is'
import IconSelector from '../IconSelector'
import {IconFont} from '../iconfont'

const { TextArea } = Input
// const { Option } = Select

declare interface FormSchema{
    style?: object // 表单样式
    formItemLayout?: object // 表单布局
    watchKeys?: string[]
    watchCallback?: (watchKeys: string[], {dynamicForm, modelRef}:any) => any
    formItem:  any[]
    [key: string]: any
}

export interface SchemaFormProps {
    dynamicValidateForm: FormSchema
    fields?: Object
    className?:string
}

// const widthRef=(Component:any)=>{
//     let newComponent = forwardRef((props, ref) =>{
//       return  <Component ref={ref} {...props} />
//     })
//     return newComponent
// }

const SchemaForm = forwardRef<any, SchemaFormProps>((props, ref) => {
    const {fields, dynamicValidateForm, className} = props
    const {formItemLayout, formItem, modalType} = dynamicValidateForm
    const [icons, setIcons] = useState({title:'', code:''})
    const formRef =  useRef<FormInstance>(null)
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({} as any), [])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isDetail, setIsDetail]= useState(modalType === 'detail'? true:false)
    const _isCancelled = useRef(false)


    // 异步设置默认数据
    const getAsyncOptions = () => {
      formItem.forEach(async(item:any)=>{
        if (isFunction(item.asyncOptions)) {
            let res1 = await item.asyncOptions(item, fields).finally(() => item.loading = false)
            if(res1){
              item.options = res1
            }
        }
        if(fields && isFunction(item.asyncValue)){ // 异步默认值
          let res2 = await item.asyncValue(item, fields).finally(() => item.loading = false)
          if(res2){
            (fields as any)[item.field] = res2
            item.value = res2
          }
        }
        if(!_isCancelled.current){
          forceUpdate()
          fields && (ref as any).current.setFieldsValue(fields)
        }
      })
   }

    // 数据回显
    useEffect(()=>{
      getAsyncOptions()
      return () => {
        _isCancelled.current = true
      }
    },[])

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    // const formRef = useRef<FormInstance>(null)
    // const [form] = Form.useForm()
    // useImperativeHandle(ref, () => form)
    // console.log('props', props)
   
    // console.log('formItem', formItem)

    const onFinish = (values:any) => {
        // console.log('onFinish~~~~',values)
    }
  

    const selectIcon=(field:string)=>{
     let confirmModal = Modal.confirm({
        title: '选择图标',
        icon: '',
        content: <IconSelector selectIcon={(item:any)=>{
          console.log(item)
          setIcons(item)
          let obj={
            ...(ref as any).current.getFieldsValue(),
            [field]:item.code
          };
          (ref as any).current.setFieldsValue(obj)
          confirmModal.destroy()
        }}/>,
      })
    }

    useImperativeHandle(ref, () => ({
      ...formRef.current
    }));

  const classes = classNames('default-form', className)

  return (
    <Form {...(formItemLayout ? formItemLayout:layout)} ref={formRef} name="control-ref" onFinish={onFinish} className={classes} >
        {formItem.map((item:any) => 
          // 单选框
          item.type === 'radio' ? 
              <Form.Item label={item.label} name={item.field} rules={item.rules} key={item.field}>
                <Radio.Group onChange={(e) => console.log(e)} value={item.field} disabled={isDetail}>
                    {item.options.map((dateItem:any, index:number) =><Radio value={dateItem.value} key={index}>{dateItem.label}</Radio>)}
                </Radio.Group>
              </Form.Item> :
          // 普通输入框
          item.type === 'input' ? 
              <Form.Item label={item.label} name={item.field} rules={item.rules}  key={item.field} >
                <Input disabled={isDetail} {...item.props} value={item.field}/>
              </Form.Item> :
          item.type === 'textarea' ? 
          <Form.Item label={item.label} name={item.field} rules={item.rules}  key={item.field} >
            <TextArea disabled={isDetail} {...item.props} value={item.field} key={item.field} />
          </Form.Item> :
          // 数字输入框
          item.type === 'input-number' ?
              <Form.Item label={item.label} name={item.field} rules={item.rules}
              key={item.field}
            >
              <InputNumber  min={0} {...item.props} value={item.field} disabled={isDetail} precision={0}/>
            </Form.Item>:
          // 开关
          item.type === 'switch' ? 
            <Form.Item label={item.label} name={item.field} rules={item.rules} key={item.field} valuePropName="checked">
              <Switch defaultChecked={(fields && (fields as any).status)? ((fields as any).status ==='y'? true: false): false} disabled={isDetail}/> 
            </Form.Item>:
          item.type === 'select' ?
          <Form.Item label={item.label} name={item.field} rules={item.rules} key={item.field}>
            <Select options={item.options} disabled={isDetail}/>
          </Form.Item>:
          item.type === 'multiple-select' ? 
          <Form.Item label={item.label} name={item.field} rules={item.rules} key={item.field}>
            {/* <Spin spinning={item.loading}> */}
              <Select  mode="multiple" allowClear  options={item.options} {...item.props} disabled={isDetail}/>
            {/* </Spin> */}
          </Form.Item>:
          item.type === 'tree-select' ?
          <Form.Item label={item.label} name={item.field} rules={item.rules} key={item.field}>
            <TreeSelect treeData={item.options} treeDefaultExpandAll {...item.props} disabled={isDetail}/>   
          </Form.Item>:
          item.type === 'checkbox'?
          <Form.Item label={item.label} name={item.field} rules={item.rules} key={item.field}>
            <Checkbox.Group options={item.options} {...item.props} disabled={isDetail}/>   
          </Form.Item>:
          item.type === 'icon-select'?
          <Form.Item label={item.label} name={item.field} rules={item.rules} key={item.field}>
            <Input placeholder="Enter your username" onClick={()=>selectIcon(item.field)} disabled={isDetail}
              // prefix={((icons as any).code || fields)? <IconFont type={((icons as any).code? (icons as any).code : (fields ? (fields as any)[item.field]:'')) } size="18" />:''}
              // suffix={<IconFont type="icon-yuanhuan-guanbi" size="18" color='#a0a0a0' callback={()=> {
              //   selectIcon({title:'', code:''} as any);
              //   (fields as any)[item.field] = '';
              //   let obj={
              //     ...(ref as any).current.getFieldsValue(),
              //     [item.field]:''
              //   };
              //   (ref as any).current.setFieldsValue(obj);
              // }}
              // />}
              
              allowClear
            /> 
          </Form.Item>:      
          <Fragment key="fragment"></Fragment>
        )}
        {/* <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <button onClick={test}>sss</button>
        </Form.Item> */}
    </Form>
  )
})

SchemaForm.defaultProps = {
  
}

export default SchemaForm
