import React, {useState, useEffect, forwardRef, useContext} from 'react'
import { CustSchemaForm } from '@/components/form'
import {Context} from './allDetail'

const Lifenfor = forwardRef<any>((props, ref) => {
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
            // {
            //     type: "input",
            //     label: "生活费合计",
            //     field: "iivingExpenses",
            //     value: "",
            //     props: {
            //         placeholder: "请输入生活费合计（元/年）"
            //     },
            //     // rules: [
            //     //     {
            //     //         required: true,
            //     //         message: "请输入生活费合计（元）"
            //     //     }
            //     // ]
            // },
            // {
            //     type: "input",
            //     label: "伤残抚恤金",
            //     field: "disabilityPension",
            //     value: "",
            //     props: {
            //         placeholder: "请输入伤残抚恤金金额（元/年）"
            //     },
            //     // rules: [
            //     //     {
            //     //         required: true,
            //     //         message: "请输入伤残抚恤金金额（元）"
            //     //     }
            //     // ]
            // },
            // {
            //     type: "input",
            //     label: "伤残人员生活补助金",
            //     field: "disabilityBenefits",
            //     value: "",
            //     props: {
            //         placeholder: "请输入伤残人员生活补助金（元/年）"
            //     },
            // },
            // {
            //     type: "input",
            //     label: "护理费",
            //     field: "nursingExpenses",
            //     value: "",
            //     props: {
            //         placeholder: "请输入护理费（元/年）"
            //     },
            // },
            // {
            //     type: "input",
            //     label: "优待金",
            //     field: "preferentialBenefits",
            //     value: "",
            //     props: {
            //         placeholder: "请输入优待金（元/年）"
            //     },
            // },
            // {
            //     type: "input",
            //     label: "最低生活保障金",
            //     field: "minimumLivingAllowance",
            //     value: "",
            //     props: {
            //         placeholder: "请输入最低生活保障金（元/年）"
            //     },
            // },
            // {
            //     type: "input",
            //     label: "工资/养老金/离退休费",
            //     field: "pension",
            //     value: "",
            //     props: {
            //         placeholder: "请输入工资/养老金/离退休费（元/年）"
            //     },
            // },
            // {
            //     type: "input",
            //     label: "一次性抚恤金",
            //     field: "lumpSumPension",
            //     value: "",
            //     props: {
            //         placeholder: "请输入一次性抚恤金（元/年）"
            //     },
            // },
            // {
            //     type: "input",
            //     label: "特别抚恤金",
            //     field: "specialPension",
            //     value: "",
            //     props: {
            //         placeholder: "请输入特别抚恤金（元）"
            //     },
            // },
            // {
            //     type: "input",
            //     label: "其它",
            //     field: "other",
            //     value: "",
            //     props: {
            //         placeholder: "请输入其它（元）"
            //     },
            // },
            // {
            //     type:"title",
            //     title:"账户信息"
            // },
            {
                type: "input",
                label: "开户银行帐户",
                field: "bankAccount",
                value: "",
                props: {
                    placeholder: "请输入开户银行帐户"
                },
            },
            {
                type: "input",
                label: "开户银行帐号",
                field: "bankAccountNo",
                value: "",
                props: {
                    placeholder: "请输入开户银行帐号"
                },
            },
            {
                type: "input",
                label: "开户银行名称",
                field: "bankName",
                value: "",
                props: {
                    placeholder: "请输入开户银行名称"
                },
            },
            {
                type: "input",
                label: "开户银行地址",
                field: "bankAddress",
                value: "",
                props: {
                    placeholder: "请输入开户银行地址"
                },
            },
            {
                type: "input",
                label: "开户人",
                field: "bankAccountHolder",
                value: "",
                props: {
                    placeholder: "请输入开户人"
                },
            }
        ]
    }

    const [fields, setFields] = useState(null as any)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [validateForm, setValidateForm] = useState(addSchema)

    useEffect(()=>{
        if(resData) setFields(resData.veteransBankInfo)
    }, [])

    return (
        <CustSchemaForm ref={ref} fields={fields} dynamicValidateForm={validateForm} modalType={modalType}/>
    )
})

export default Lifenfor