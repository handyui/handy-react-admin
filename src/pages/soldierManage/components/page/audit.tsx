import React, { FC, useRef, useEffect} from 'react'
import {  Modal, Button, message as Message, Space } from 'antd'
import DetailPage from '../allDetail'
import { SchemaForm } from '@/components/form'
import { FormInstance } from 'antd/lib/form'
import {saveAudit} from '@/api/preferential'
import { useLocation } from 'react-router-dom'

interface editPageProps{
  urlName?:string
  preType?:string
}

const EditPage:FC<editPageProps> = (props) =>{
    const {urlName, preType} = props
    const formRef = useRef<FormInstance>(null)
    const detailRef = useRef(null)
    const location:any = useLocation()
    const {pathname, state} = location
    
    useEffect(()=>{
      const index = pathname.lastIndexOf("/")
      const path = pathname.substring(0, index)
      if(state && (state as any).refresh && path === `/soldierManage/${urlName}/audit`){
        (detailRef as any).current.forceUpdate()
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    const addSchema = {
      formItem: [
        {
            type: "radio",
            label: "是否通过",
            field: "isOk",
            value: '',
            options:[
              {value:'1', label:'通过'},
              {value:'0', label:'不通过'}
            ],
            // rules: [
            //     {
            //         required: true,
            //         message: "性别不能为空"
            //     }
            // ]
        },
        {
            type: "textarea",
            label: "备注",
            field: "remarks",
            value: '',
            props: {
                placeholder: "请输入通过/不通过原因"
            },
        },
      ]
    }

    const handleAudit =()=>{
      Modal.confirm({
          title: '审核优抚',
          icon: '',
          content: <SchemaForm ref={formRef} dynamicValidateForm={addSchema} />,
          onOk: (close) => { 
              formRef.current!.validateFields().then(async(values:any)=>{
                const {preferentialId, type, version} = (detailRef as any).current.resData
                const params = {
                  belongingId: preferentialId,
                  isOk: values.isOk,
                  remarks: values.remarks,
                  type,
                  version
                }
                const {code, message}:any = await saveAudit(params)
                if(code === 200){
                  Message.success(`${message}`,1.5,()=>close());
                  (detailRef as any).current.close()
                }
              }).catch((err:any) => console.log(err))
          }
      })
  }
    return (
      <>
        <DetailPage modalType='detail' preType={preType} ref={detailRef}/>
        <div className="form-footer center">
              <Space>
                <Button type="primary" onClick={handleAudit}>
                  审核
                </Button>
                <Button onClick={()=>{
                    (detailRef as any).current.close()
                }}>
                  关闭
                </Button>
              </Space>
            </div>
      </>
  )
}

export default EditPage