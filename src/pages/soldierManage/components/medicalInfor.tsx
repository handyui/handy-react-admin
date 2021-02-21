import React, {useState, useEffect, forwardRef, useContext} from 'react'
import { CustSchemaForm } from '@/components/form'
import {Context} from './allDetail'

const MedicalInfor = forwardRef<any>((props, ref) => {
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
                type: "checkbox",
                label: "医疗保险",
                field: "medicalInsurance",
                value: "",
                options:[
                    { label: '城镇职工基本医疗保险', value: '1' },
                    { label: '城镇居民基本医疗保险', value: '2' },
                    { label: '新型农村合作医疗', value: '3' },
                    { label: '商业保障', value: '4' }
                ]
            },
            {
                type: "checkbox",
                label: "其它保障方式",
                field: "otherSafeguards",
                value: "",
                options:[
                    { label: '城乡医疗救助', value: '1' },
                    { label: '优抚对象医疗救助', value: '2' },
                    { label: '医疗机构减免', value: '3' }
                ]
            },
            {
                type: "checkbox",
                label: "养老保障方式",
                field: "pensionSecurityType",  
                value: "",
                options:[
                    { label: '新型农村养老保险', value: '1' },
                    { label: '城镇居民养老保险', value: '2' },
                    { label: '城镇职工基本养老保险', value: '3' },
                    { label: '商业保险', value: '4' },
                    { label: '无', value: '5' }
                ]
            },
            // {
            //     type:"title",
            //     title:"医疗保障标准和供养信息"
            // },
            // {
            //     type: "input",
            //     label: "医疗保障体系报销",  
            //     field: "medicalReimbursement",
            //     value: "",
            //     props: {
            //         placeholder: "请输入医疗保障体系报销（元/年）"
            //     },
            // },
            // {
            //     type: "input",
            //     label: "城乡医疗救助",
            //     field: "urbanMedicalHelp",
            //     value: "",
            //     props: {
            //         placeholder: "请输入城乡医疗救助（元/年）"
            //     },
            // },
            // {
            //     type: "input",
            //     label: "优抚对象医疗补助",
            //     field: "comfortMedicaid",  
            //     value: "",
            //     props: {
            //         placeholder: "请输入优抚对象医疗补助（元/年）"
            //     },
            // },
            // {
            //     type: "input",
            //     label: "医疗机构减免",
            //     field: "medicalInstitutionRelief",
            //     value: "",
            //     props: {
            //         placeholder: "请输入医疗机构减免（元/年）"
            //     },
            // },   
            // {
            //     type: "input",
            //     label: "个人负担",
            //     field: "personalPayment",
            //     value: "",
            //     props: {
            //         placeholder: "请输入个人负担（元/年）"
            //     },
            // },
            // {
            //     type: "input",
            //     label: "医疗费合计",
            //     field: "medicalFee", 
            //     value: "",
            //     props: {
            //         placeholder: "请输入医疗费合计（元）"
            //     },
            // },
            // {
            //     type: "select",
            //     label: "供养方式",
            //     field: "supportType",
            //     value: "",
            //     props: {
            //         placeholder: "请输入供养方式"
            //     },
            //     options:[
            //         {label:'无', value:'1'}
            //     ]
            // },
        ]
    }

    const [fields, setFields] = useState(null as any)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [validateForm, setValidateForm] = useState(addSchema)

    useEffect(()=>{
        if(resData) setFields({
            'medicalInsurance': resData.medicalInsurance,
            'otherSafeguards':resData.otherSafeguards,
            'pensionSecurityType':  resData.pensionSecurityType,
            'medicalReimbursement': resData.medicalReimbursement,
            'urbanMedicalHelp':resData.urbanMedicalHelp,
            'comfortMedicaid':resData.comfortMedicaid,
            'medicalInstitutionRelief':resData.medicalInstitutionRelief,
            'personalPayment':resData.personalPayment,
            'medicalFee':resData.medicalFee,
            'supportType':resData.supportType
        })
    }, [])

    return (
        <CustSchemaForm ref={ref} fields={fields} dynamicValidateForm={validateForm} modalType={modalType}/>
    )
})

export default MedicalInfor