import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState, Fragment, ReactNode, memo} from 'react'
import { Form, Row, Col, Input, Radio, InputNumber, Switch, 
  TreeSelect, Button, Select, Checkbox,  DatePicker, Space } from 'antd'
import classNames from 'classnames'
import { FormInstance } from 'antd/lib/form'
import { SearchOutlined } from '@ant-design/icons'
import {isFunction} from '@/utils/is'
// import IconSelector from '../IconSelector'
// import {IconFont} from '../iconfont'
import moment from 'moment'
import zhCN from "antd/lib/locale/zh_CN"

const { TextArea } = Input
const { RangePicker } = DatePicker;

declare interface FormSchema{
    style?: object // 表单样式
    layout?: object // 表单布局
    grid?: {rowGutter:number, colSpan:number} // 表单布局
    watchKeys?: string[]
    watchCallback?: (watchKeys: string[], {dynamicForm, modelRef}:any) => any
    formItem:  any[]
    [key: string]: any
}

export interface SchemaFormProps{
    dynamicValidateForm: FormSchema
    fields?: Object
    callback?: (res:object)=>void
    children?: ReactNode
    showBtn?: boolean
    modalType? : string
    className?:string
}

// const widthRef=(Component:any)=>{
//     let newComponent = forwardRef((props, ref) =>{
//       return  <Component ref={ref} {...props} />
//     })
//     return newComponent
// }

const SchemaForm = forwardRef<any, SchemaFormProps>((props, ref) => {
    const {fields, dynamicValidateForm, showBtn, modalType, className, callback, children} = props
    const {style, layout, grid, formItem} = dynamicValidateForm
    const [isDetail, setIsDetail]= useState(modalType === 'detail'? true:false)
    const [isLoading, setIsLoading] = useState(true)
    const [icons, setIcons] = useState({})
    const [formData, setFormData]= useState([])
    const formRef =  useRef<FormInstance>(null)
    const _isCancelled = useRef(false)

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({} as any), [])

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
          }
        }
       if(!_isCancelled.current) forceUpdate()
      })
      // if (_isCancelled.current) {
      //   formItem.forEach(async(item:any)=>{
      //     if (isFunction(item.asyncOptions)) {
      //       item.options = await item.asyncOptions(item, fields).finally(() => item.loading = false)
      //     }
      //     if(fields && isFunction(item.asyncValue)){ // 异步默认值
      //       (fields as any)[item.field] = await item.asyncValue(item, fields).finally(() => item.loading = false)
      //     }
      //     forceUpdate()
      //   })
      // }
    }

    // 数据回显
    useEffect(()=>{
      getAsyncOptions()
      return () => {
          _isCancelled.current = true
      }
    },[])

    const defaultlayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    // const tailLayout = {
    //     wrapperCol: { offset: 8, span: 16 },
    // }
    // const [switchChecked, setSwitchChecked] = useState(true)

    const onSubmit=()=>{
      (ref as any).current.validateFields().then((res:any)=>{
        callback && callback(Object.assign(res,{current:1}))
      }).catch((err:any)=>{
        console.log(err)
      })
    }

    const onReset=()=> (ref as any).current.resetFields()

    useImperativeHandle(ref, () => ({
        ...formRef.current,
        refreshData: onSubmit
    }));

  const classes = classNames('default-form', className)

  return (
    <Form {...(layout ? layout:defaultlayout)} ref={formRef} name="control-ref" initialValues={fields} className={classes} >
      <Row gutter={grid && grid.rowGutter}>
        {formItem.map((item:any) => 
          // 单选框
          item.type === 'radio' ? 
            <Col  span={(item.grid && item.grid.colSpan) || (grid && grid.colSpan)}  key={item.field}>
              <Form.Item {...(item.tailLayout && item.tailLayout)} label={item.label} name={item.field} rules={item.rules} >
                <Radio.Group onChange={(e) => console.log(e)} value={item.field} disabled={isDetail}>
                    {item.options.map((dateItem:any, index:number) =><Radio value={dateItem.value} key={index}>{dateItem.label}</Radio>)}
                </Radio.Group>
              </Form.Item> </Col>:
          // 普通输入框
          item.type === 'input' ? 
          <Col span={(item.grid && item.grid.colSpan) || (grid && grid.colSpan)}  key={item.field}>
              <Form.Item {...(item.tailLayout && item.tailLayout)}  label={item.label} name={item.field} rules={item.rules}  key={item.field} >
                <Input {...item.props} value={item.field} disabled={isDetail}/>
              </Form.Item> </Col>:
           item.type === 'textArea' ?
           <Col  span={(item.grid && item.grid.colSpan) || (grid && grid.colSpan)}  key={item.field}>
             <Form.Item {...(item.tailLayout && item.tailLayout)} label={item.label} name={item.field} rules={item.rules}
             key={item.field}
           >
            <TextArea {...item.props} value={item.field} key={item.field} disabled={isDetail}/>
           </Form.Item> </Col>:
          // 数字输入框
          item.type === 'input-number' ?
            <Col  span={(item.grid && item.grid.colSpan) || (grid && grid.colSpan)}  key={item.field}>
              <Form.Item {...(item.tailLayout && item.tailLayout)} label={item.label} name={item.field} rules={item.rules}
              key={item.field}
            >
              <InputNumber min={0} {...item.props} value={item.field} precision={0} disabled={isDetail}/>
            </Form.Item> </Col>:
          // 开关
          item.type === 'switch' ? 
          <Col  span={(item.grid && item.grid.colSpan) || (grid && grid.colSpan)}  key={item.field}>
            <Form.Item {...(item.tailLayout && item.tailLayout)} label={item.label} name={item.field} rules={item.rules} key={item.field} valuePropName='checked'>
              <Switch onChange={(val)=>val} disabled={isDetail}/>
            </Form.Item></Col>:
          item.type === 'select' ?
          <Col  span={(item.grid && item.grid.colSpan) || (grid && grid.colSpan)}  key={item.field}>
          <Form.Item {...(item.tailLayout && item.tailLayout)} label={item.label} name={item.field} rules={item.rules} key={item.field}>
            <Select options={item.options} {...item.props} disabled={isDetail}/>
          </Form.Item></Col>:
          item.type === 'multiple-select' ? 
          <Col  span={(item.grid && item.grid.colSpan) || (grid && grid.colSpan)}  key={item.field}>
          <Form.Item {...(item.tailLayout && item.tailLayout)} label={item.label} name={item.field} rules={item.rules} key={item.field}>
            {/* <Spin spinning={item.loading}> */}
              <Select  mode="multiple" allowClear  options={item.options} {...item.props} disabled={isDetail}/>
            {/* </Spin> */}
          </Form.Item></Col>:
          item.type === 'tree-select' ?
          <Col  span={(item.grid && item.grid.colSpan) || (grid && grid.colSpan)}  key={item.field}>
          <Form.Item {...(item.tailLayout && item.tailLayout)} label={item.label} name={item.field} rules={item.rules} key={item.field}>
            <TreeSelect treeData={item.options} treeDefaultExpandAll {...item.props} disabled={isDetail}/>   
          </Form.Item></Col>:
          item.type === 'checkbox'?
          <Col span={(item.grid && item.grid.colSpan) || (grid && grid.colSpan)} key={item.field}>
          <Form.Item {...(item.tailLayout && item.tailLayout)} label={item.label} name={item.field} rules={item.rules} key={item.field}>
            <Checkbox.Group options={item.options} {...item.props} disabled={isDetail}/>   
          </Form.Item></Col>:
          item.type === 'date-pcker'? 
          <Col  span={(item.grid && item.grid.colSpan) || (grid && grid.colSpan)} key={item.field}>
            {/* {item.value} */}
          <Form.Item {...(item.tailLayout && item.tailLayout)} label={item.label} name={item.field} rules={item.rules} key={item.field}>
             <DatePicker {...item.props} format="YYYY-MM-D" disabled={isDetail}/>
          </Form.Item></Col>:
           item.type === 'range-pcker'? 
           <Col  span={(item.grid && item.grid.colSpan) || (grid && grid.colSpan)} key={item.field}>
             {/* {item.value} */}
           <Form.Item {...(item.tailLayout && item.tailLayout)} label={item.label} name={item.field} rules={item.rules} key={item.field}>
              {/* <DatePicker {...item.props} format="YYYY-MM-D"/> */}
              <RangePicker  {...item.props} format="YYYY-MM-D" value={zhCN} disabled={isDetail}/>
           </Form.Item></Col>:
          item.type === 'title'? 
             <Col span={24} key={`${Math.random()}-col`}>
                <div className="form-title">{item.title}</div></Col>:
           item.type === 'slot'? 
           <Col span={(item.grid && item.grid.colSpan) || (grid && grid.colSpan)}  key={item.field}>
              <Form.Item {...(item.tailLayout && item.tailLayout)} label={item.label} name={item.field} rules={item.rules} key={item.field}>
                  {item.render()}
            </Form.Item></Col>: 
          <Fragment key="fragment"></Fragment>
        )}
        {showBtn ? <Col>
           <Space>
            <Button type="primary" icon={<SearchOutlined />} onClick={onSubmit}> 搜索 </Button>
            <Button onClick={onReset}> 重置 </Button>
            {children}
            </Space>
        </Col> : ''}
        
      </Row>
    </Form>
  )
})

SchemaForm.defaultProps = {
  showBtn: false
}

export default memo(SchemaForm)
