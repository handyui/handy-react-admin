import React, {useState, useEffect, forwardRef, useContext, useRef, useImperativeHandle} from 'react'
import { NCustSchemaForm } from '@/components/form'
import {getOrganizationTtree, getDictionaryOption} from '@/api/system'
import { mapTree } from '@/utils/index'
import { FormInstance } from 'antd/lib/form'
import {Context} from '../allDetail'
import moment from 'moment'
import {isCardNo} from '@/utils/validate'

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
                rules: [
                    {
                        required: true,
                        message: "行政区域不能为空"
                    }
                ]
            },
            {
                type: "input",
                label: "名称",
                field: "name",
                value: "",
                props: {
                    placeholder: "请输入名称"
                },
                rules: [
                    {
                        required: true,
                        message: "名称不能为空"
                    }
                ]
            },
            {
                type: "input",
                label: "身份证号",
                field: "idCardNo",
                value: "",
                props: {
                    placeholder: "请输入身份证号"
                },
                rules: [
                    {
                        required: true,
                        message: "身份证号不能为空"
                    },
                    {
                        validator:(rule:any, value:any, callback:any)=>{
                            return new Promise(async (resolve, reject) => {
                                if(!isCardNo(value)){
                                    await reject('请输入正确的身份证号')
                                }else{
                                    await resolve(value)
                                }
                            })
                        }
                    }
                ]
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
                rules: [
                    {
                        required: true,
                        message: "民族不能为空"
                    }
                ]
            },
            {
                type: "date-pcker",
                label: "出生日期",
                field: "birthDate",
                value: "2020-12-29 09:23:14",
                props: {
                    placeholder: "请选择出生日期"
                },
                rules: [
                    {
                        required: true,
                        message: "出生日期不能为空"
                    }
                ]
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
                rules: [
                    {
                        required: true,
                        message: "性别不能为空"
                    }
                ]
            },
            {
                type: "input",
                label: "联系电话",
                field: "phone",
                value: "",
                props: {
                    placeholder: "请输入联系电话"
                },
                rules: [
                    {
                        required: true,
                        message: "联系电话不能为空"
                    }
                ]
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
                rules: [
                    {
                        required: true,
                        message: "婚姻不能为空"
                    }
                ]
            },
            {
                type: "date-pcker",
                label: "入伍时间",
                field: "joinArmyDate",
                value: "",
                props: {
                    placeholder: "请选择出生日期",
                    onChange(date: any, dateString: string){
                        (formRef as any).current.setFieldsValue({
                            outArmyDate: null
                        })
                    },
                    
                }
            },
            {
                type: "date-pcker",
                label: "退伍时间",
                field: "outArmyDate",
                value: "", 
                props: {
                    placeholder: "请选择出生日期",
                    // disabled(){
                    //     return  (formRef as any).current.getFieldValue('conscriptsStartDate')? false:true
                    // },
                    disabledDate(current:string){
                        let startDate = (formRef as any).current.getFieldValue('joinArmyDate')
                        return current && current < (moment(startDate).endOf('day')  as any)
                    },
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
                label: "生活状况",
                field: "abilityState",
                value: "",
                props: {
                    placeholder: "请选择生活状况"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300009')
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
                label: "申请类别",
                field: "applyType",
                value: "",
                props: {
                    placeholder: "请选择申请类别"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300016')
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
                type: "date-pcker",
                label: "去世/迁出/取消日期",
                field: "cancelTime",
                value: "",
                props: {
                    placeholder: "请选择去世/迁出广东/取消日期"
                }
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
                grid: {
                    rowGutter: 0,
                    colSpan: 24
                },
                tailLayout:{
                    labelCol: { span: 4 },
                    wrapperCol: { span: 18 },
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
                grid: {
                    rowGutter: 0,
                    colSpan: 24
                },
                tailLayout:{
                    labelCol: { span: 4 },
                    wrapperCol: { span: 18 },
                }, 
            },
            {
                type: "title",
                title: "三属关系"
            },
            {
                type: "input",
                label: "烈士姓名",
                field: "martyrName",
                value: "",
                props: {
                    placeholder: "请输入烈士姓名"
                },
            },
            {
                type: "date-pcker",
                label: "牺牲时间",
                field: "sacrificeDate",
                value: "2020-12-29 09:23:14",
                props: {
                    placeholder: "请选择牺牲时间"
                },
            },
            {
                type: "input",
                label: "持证人名称",
                field: "holderName",
                value: "",
                props: {
                    placeholder: "请输入持证人名称"
                },
            },
            {
                type: "select",
                label: "与烈士关系",
                field: "relation",
                value: "",
                props: {
                    placeholder: "请选择与烈士关系"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300032')
                    return result  
                },
            },
            {
                type: "input",
                label: "烈士证书编号",
                field: "martyrCertificateNo",
                value: "",
                props: {
                    placeholder: "请输入烈士证书编号"
                },
            },
            {
                type: "textArea",
                label: "备注",
                field: "remarks",
                value: "",
                props: {
                    placeholder: "请输入备注"
                },
                grid: {
                    rowGutter: 0,
                    colSpan: 24
                },
                tailLayout:{
                    labelCol: { span: 4 },
                    wrapperCol: { span: 18 },
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
            <NCustSchemaForm ref={formRef} fields={fields} dynamicValidateForm={validateForm} modalType={modalType} />
        </>
    )
})

export default BaseInfor