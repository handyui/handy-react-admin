import React, {useState, useEffect, forwardRef, useContext, useRef, useImperativeHandle} from 'react'
import { CustSchemaForm } from '@/components/form'
import {getOrganizationTtree, getDictionaryOption} from '@/api/system'
import { mapTree } from '@/utils/index'
import { FormInstance } from 'antd/lib/form'
import {Context} from './allDetail'

const BaseInfor = forwardRef<any>((props, ref) => {
    const getContext = useContext(Context) // 接收创建的context
    const { modalType, resData }:any = getContext

    const formRef =  useRef<FormInstance>(null)
    
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
            //     type: "slot",
            //     label: "证件照",
            //     field: "idPhoto",
            //     grid: {
            //         rowGutter: 0,
            //         colSpan: 24
            //     },
            //     tailLayout:{
            //         labelCol: { span: 4 },
            //         wrapperCol: { span: 20 },
            //     }, 
            //     render(){
            //         return 
            //     }
            // },
            {
                type: "tree-select",
                label: "行政区域",
                field: "organizationId",
                value: undefined,
                loading: true,
                props: {
                    placeholder: "请选择单位",
                    treeDefaultExpandAll: false,
                },
                asyncOptions: async (curValue:any, fields:any) => {
                    const {result}:any = await getOrganizationTtree() 
                    let arr = mapTree(result[0])
                    return arr? [arr]:[]
                },
            },
            {
                type: "input",
                label: "名称",
                field: "name",
                value: "",
                props: {
                    placeholder: "请输入名称"
                },
                // rules: [
                //     {
                //         required: true,
                //         message: "名称不能为空"
                //     }
                // ]
            },
            {
                type: "input",
                label: "身份证号",
                field: "idCardNo",
                value: "",
                props: {
                    placeholder: "请输入身份证号"
                },
                // rules: [
                //     {
                //         required: true,
                //         message: "身份证号不能为空"
                //     }
                // ]
            },
            {
                type: "select",
                label: "民族",
                field: "nation",
                value: "",
                props: {
                    placeholder: "请输入民族"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300029')
                    return result  
                },
            },
            {
                type: "date-pcker",
                label: "出生日期",
                field: "birthDate",
                value: "2020-12-29 09:23:14",
                props: {
                    placeholder: "请选择出生日期"
                }
            },
            {
                type: "radio",
                label: "性别",
                field: "sex",
                value: '',
                options:[
                    {value:'M', label:'男'},
                    {value:'F', label:'女'}
                ],
                // rules: [
                //     {
                //         required: true,
                //         message: "性别不能为空"
                //     }
                // ]
            },
            {
                type: "select",
                label: "婚姻状况",
                field: "maritalStatus",
                value: "",
                props: {
                    placeholder: "请选择婚姻状况"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300030')
                    return result  
                },
            },
            {
                type: "select",
                label: "伤残等级",
                field: "disabilityLevel",
                value: "",
                props: {
                    placeholder: "请选择伤残等级"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300003')
                    return result  
                },
            },
            {
                type: "select",
                label: "伤残性质",
                field: "disabilityNature",
                value: "",
                props: {
                    placeholder: "请选择伤残等级"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300005')
                    return result  
                },
            },
            {
                type: "select",
                label: "伤残属别",
                field: "disabilityBelong",
                value: "",
                props: {
                    placeholder: "请选择伤残等级"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300004')
                    return result  
                },
            },
            {
                type: "date-pcker",
                label: "入伍时间",
                field: "conscriptsStartDate",
                value: "",
                props: {
                    placeholder: "请选择出生日期"
                }
            },
            {
                type: "date-pcker",
                label: "退伍时间",
                field: "conscriptsEndDate",
                value: "",
                props: {
                    placeholder: "请选择出生日期"
                }
           
            },
            {
                type: "select",
                label: "劳动能力",
                field: "laborCapacity",
                value: "",
                props: {
                    placeholder: "请选择伤残等级"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300006')
                    return result  
                },
            },
            {
                type: "select",
                label: "生活能力",
                field: "abilityLive",
                value: "",
                props: {
                    placeholder: "请选择生活能力"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300007')
                    return result  
                },
            },
            {
                type: "select",
                label: "就业情况",
                field: "employmentSituation",
                value: "",
                props: {
                    placeholder: "请选择就业情况"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300010')
                    return result  
                },
            },
            {
                type: "select",
                label: "户口类型",
                field: "householdType",
                value: "",
                props: {
                    placeholder: "请选择户口类型"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300031')
                    return result  
                },
            },
            {
                type: "select",
                label: "户口簿上住址类别",
                field: "householdAddressType",
                value: "",
                props: {
                    placeholder: "请选择户口簿住址类别"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300001')
                    return result  
                },
            },
            {
                type: "input",
                label: "联系电话",
                field: "phone",
                value: "",
                props: {
                    placeholder: "请输入联系电话"
                },
            },
            {
                type: "input",
                label: "工作单位",
                field: "workUnit",
                value: "",
                props: {
                    placeholder: "请输入工作单位"
                },
            },
            {
                type: "select",
                label: "优抚对象状态",
                field: "preferentialTreatmentType",
                value: "",
                props: {
                    placeholder: "请选择优抚对象状态"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300011')
                    return result  
                },
            },
            {
                type: "radio",
                label: "是否享受低保待遇",
                field: "subsistenceAllowances",
                value: "",
                props: {
                    placeholder: "请选择是否享受低保待遇"
                },
                options:[
                    {label:'是', value:'y'},
                    {label:'否', value:'n'},
                ]
            },
            {
                type: "input",
                label: "户口簿上地址",
                field: "householdAddress",
                value: "",
                props: {
                    placeholder: "请输入户口簿上地址"
                },
            },
            {
                type: "input",
                label: "实际居住地址",
                field: "actualAddress",
                value: "",
                props: {
                    placeholder: "请输入实际居住地址"
                },
            },
            {
                type: "input",
                label: "备注",
                field: "remarks",
                value: "",
                props: {
                    placeholder: "请输入备注"
                },
            },
        ]
    }

    const [fields, setFields] = useState(null as any)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [validateForm, setValidateForm] = useState(addSchema)

    useEffect(()=>{
       if(resData) setFields(resData.veteransBaseInfo)
    }, [])

    useImperativeHandle(ref, () => ({
        ...formRef.current,
    }))

    return (
        <>
            <CustSchemaForm ref={formRef} fields={fields} dynamicValidateForm={validateForm} modalType={modalType} />
        </>
    )
})

export default BaseInfor