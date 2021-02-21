import React, {useState, useEffect, forwardRef, useContext} from 'react'
import { CustSchemaForm } from '@/components/form'
import {getDictionaryOption} from '@/api/system'
import {Context} from './allDetail'

const OtherInfor = forwardRef<any>((props, ref) => {
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
                label: "房屋性质",
                field: "houseType",
                value: "",
                props: {
                    placeholder: "请输入房屋性质"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300025')
                    return result  
                },
            },
            {
                type: "select",
                label: "房屋状况",
                field: "houseStatus",
                value: "",
                props: {
                    placeholder: "请输入房屋状况"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300026')
                    return result  
                },
            },
            {
                type: "input",
                label: "房屋面积（平方米）",
                field: "houseArea",
                value: "",
                props: {
                    placeholder: "请输入房屋面积（平方米）"
                },
            },
            {
                type: "input",
                label: "房屋间数",
                field: "roomsNumber",
                value: "",
                props: {
                    placeholder: "请输入房屋间数"
                },
            },
            {
                type: "input",
                label: "家庭总人口（人数）",
                field: "familySize",
                value: "",
                props: {
                    placeholder: "请输入家庭总人口（人数）"
                },
            },
            {
                type: "input",
                label: "其中18岁（含）以下人口",
                field: "underAgeSize",
                value: "",
                props: {
                    placeholder: "请输入其中18岁（含）以下人口"
                },
            },
            {
                type: "input",
                label: "60岁（含）以上人口",
                field: "agedSize",
                value: "",
                props: {
                    placeholder: "请输入60岁（含）以上人口"
                },
            },
        ]
    }

    const [fields, setFields] = useState(null as any)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [validateForm, setValidateForm] = useState(addSchema)

    useEffect(()=>{
        if(resData) setFields(resData.veteransHouseInfo)
    }, [])

    return (
        <CustSchemaForm ref={ref} fields={fields} dynamicValidateForm={validateForm} modalType={modalType}/>
    )
})

export default OtherInfor