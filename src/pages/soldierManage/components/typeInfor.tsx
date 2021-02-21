import React, {useState, useEffect, forwardRef, useContext} from 'react'
import { CustSchemaForm } from '@/components/form'
import {getDictionaryOption} from '@/api/system'
import {Context} from './allDetail'

const TypeInfor = forwardRef<any>((props, ref) => {
    const getContext = useContext(Context)
    const { modalType, resData } = getContext

    const addSchema = {
        layout : {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        },
        grid: {
            rowGutter: 10,
            colSpan: 12
        },
        formItem: [
            {
                type: "select",
                label: "申请类别",
                field: "applyType",
                value: "",
                props: {
                    placeholder: "请选择申请类别"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300015')
                    return result  
                },
            },
            {
                type: "radio",
                label: "是否精神病",
                field: "joinParty",
                value: '',
                options:[
                    {value:'y', label:'是'},
                    {value:'n', label:'否'}
                ]
            },
            {
                type: "radio",
                label: "是否属于孤儿",
                field: "isOrphan",
                value: '',
                options:[
                    {value:'y', label:'是'},
                    {value:'n', label:'否'}
                ]
            },
            {
                type: "radio",
                label: "是否属于孤老",
                field: "ionelyOldPeople",
                value: '',
                options:[
                    {value:'y', label:'是'},
                    {value:'n', label:'否'}
                ]
            },
            {
                type: "select",
                label: "涉核情况",
                field: "nuclearRelatedSituation",
                value: "",
                props: {
                    placeholder: "请选择涉核情况"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300021')
                    return result  
                },
            },
            {
                type: "select",
                label: "伤残时期",
                field: "disabilityPeriod",
                value: "",
                props: {
                    placeholder: "请选择伤残时期"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300022')
                    return result  
                },
            },
            {
                type: "select",
                label: "伤残情形",
                field: "disabilitySituation",
                value: "",
                props: {
                    placeholder: "请选择伤残情形"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300023')
                    return result  
                },
            },
            {
                type: "input",
                label: "情形描述",
                field: "situationRemark",
                value: "",
                props: {
                    placeholder: "请输入情形描述"
                },
            },
            {
                type: "input",
                label: "等级调整描述",
                field: "levelAdjustment",
                value: "",
                props: {
                    placeholder: "请输入等级调整描述"
                },
            },
        ]
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [validateForm, setValidateForm] = useState(addSchema)
    const [fields, setFields] = useState(null as any)
    
    useEffect(()=>{
        if(resData) setFields(resData.veteransTypeInfo)
    }, [])
    
    return (
        <CustSchemaForm ref={ref} fields={fields} dynamicValidateForm={validateForm} modalType={modalType}/>
    )
})

export default TypeInfor