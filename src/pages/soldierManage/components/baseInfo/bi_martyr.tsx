import React, {useState, useEffect, forwardRef, useContext, useRef, useImperativeHandle} from 'react'
import { CustSchemaForm } from '@/components/form'
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
                label: "烈士标识",
                field: "martyrLogo",
                value: "",
                props: {
                    placeholder: "请输入烈士标识"
                }
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
                label: "曾用名",
                field: "nameUsedBefore",
                value: "",
                props: {
                    placeholder: "请输入曾用名"
                },
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
                label: "籍贯",
                field: "householdAddress",
                value: "",
                props: {
                    placeholder: "请输入籍贯"
                },
            },
            {
                type: "input",
                label: "牺牲时籍贯",
                field: "sacrificeNativePlace",
                value: "",
                props: {
                    placeholder: "请输入牺牲时籍贯"
                },
            },
            {
                type: "date-pcker",
                label: "参加革命时间",
                field: "revolutionaryTime",
                value: "",
                props: {
                    placeholder: "请选择参加革命时间"
                }
            },
            {
                type: "select",
                label: "政治面貌",
                field: "politicalIdentity",
                value: "",
                props: {
                    placeholder: "请选择政治面貌"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('301004')
                    return result  
                }
            },
            {
                type: "input",
                label: "生前单位",
                field: "livingUnit",
                value: "",
                props: {
                    placeholder: "请输入生前单位"
                },
            },
            {
                type: "input",
                label: "曾任职务",
                field: "previousPosition",
                value: "",
                props: {
                    placeholder: "请输入曾任职务"
                },
            },  
            {
                type: "date-pcker",
                label: "牺牲时间",
                field: "sacrificeDate",
                value: "",
                props: {
                    placeholder: "请选择牺牲时间"
                }
            },
            {
                type: "input",
                label: "牺牲地点",
                field: "sacrificePlace",
                value: "",
                props: {
                    placeholder: "请输入牺牲地点"
                },
            },  
            {
                type: "select",
                label: "安葬地类型",
                field: "burialPlaceType",
                value: "",
                props: {
                    placeholder: "请选择安葬地类型"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300033')
                    return result  
                },
            },
            {
                type: "input",
                label: "安葬地点",
                field: "burialPlace",
                value: "",
                props: {
                    placeholder: "请输入牺牲地点"
                },
            },
            {
                type: "textArea",
                label: "烈士简要事迹",
                field: "martyrsDeeds",
                value: "",
                props: {
                    placeholder: "请输入烈士简要事迹"
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
            <CustSchemaForm ref={formRef} fields={fields} dynamicValidateForm={validateForm} modalType={modalType} />
        </>
    )
})

export default BaseInfor