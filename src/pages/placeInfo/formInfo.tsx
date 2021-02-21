import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle, useContext} from 'react'
import { CustSchemaForm } from '@/components/form'
import { FormInstance } from 'antd/lib/form'
import {getOrganizationTtree, getDictionaryOption} from '@/api/system'
import { mapTree } from '@/utils/index'
import {SingleUpload} from '@/components/upload'
import {Context} from './allDetail'

const FormInfoPage = forwardRef<any>((props, ref) => {
    const getContext = useContext(Context) // 接收创建的context
    const { modalType, resData, fileList, veteransId} = getContext

    // const placeInfoData = useSelector((state:RootState) => state.placeInfoReducer)
    const formRef =  useRef<FormInstance>(null)
    const uploadRef = useRef<any>(null)
    // const {} = resData ? resData:{fileList:[], veteransId:null}
    // useEffect(()=>{
    //     console.log('placeInfoData', placeInfoData)
    //     let isUnmount = false;      //这里插入isUnmount
    //     const fetchDetail = async () => {
    //         const {code, result}:any = await getOrganizationTtree() 
    //       if (code == '200' && !isUnmount) {  //加上判断isUnmount才去更新数据渲染组件
    //         let arr = mapTree(result[0])['children']
    //         console.log('arr', arr)
    //         setState({organizationIdOtions:arr.length > 0? arr:[]});
    //       }
    //     }
    //     fetchDetail()
    //     return () => (isUnmount = true) as any
    // },[])

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
                type:"title",
                title:"个人基本信息"
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
                type: "input",
                label: "曾用名",
                field: "nameUsedBefore",
                value: "",
                props: {
                    placeholder: "请输入曾用名"
                }
            },
            {
                type: "radio",
                label: "委托代办",
                field: "agentOrNot",
                value: '',
                options:[
                    {value:'0', label:'是'},
                    {value:'1', label:'否'}
                ]
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
                type: "input",
                label: "户籍地",
                field: "domicile",
                value: "",
                props: {
                    placeholder: "请输入户籍地"
                },
            },
            {
                type: "input",
                label: "签发机关",
                field: "signingIssuingOrganization",
                value: "",
                props: {
                    placeholder: "请输入签发机关"
                },
            },
            {
                type: "date-pcker",
                label: "有效期",
                field: "termValidityEnd",
                value: "",
                props: {
                    placeholder: "请选择有效期"
                }
            },
            {
                type: "select",
                label: "文化程度",
                field: "educationDegree",
                value: "",
                props: {
                    placeholder: "文化程度"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300028')
                    return result  
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
                type: "select",
                label: "户口类型",
                field: "householdType",
                value: "",
                props: {
                    placeholder: "请选择户口类别"
                },
                asyncOptions: async () => {
                    const result = await getDictionaryOption('300031')
                    return result  
                },
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
                type: "input",
                label: "固定电话",
                field: "fixedTelephone",
                value: "",
                props: {
                    placeholder: "请输入固定电话"
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
                label: "微信或者qq",
                field: "wechatQq",
                value: "",
                props: {
                    placeholder: "请输入微信或者qq"
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
            // {
            //     type: "input",
            //     label: "附件",
            //     field: "fileIds",
            //     value: "",
            //     props: {
            //         placeholder: "请输入附件"
            //     },
            // },
            {
                type: "slot",
                label: "附件",
                field: "fileIds",
                grid: {
                    rowGutter: 0,
                    colSpan: 24
                },
                tailLayout:{
                    labelCol: { span: 4 },
                    wrapperCol: { span: 20 },
                }, 
                render(){
                    return <SingleUpload ref={uploadRef} ownerId={veteransId} fileList={fileList} disable={modalType === 'detail'? true:false}/>
                }
            },
            {
                type:"title",
                title:"类别信息"
            },
            {
                type: "checkbox",
                label: "人员类型",
                field: "personnelType",
                value: "",
                grid: {
                    rowGutter: 0,
                    colSpan: 24
                },
                tailLayout:{
                    labelCol: { span: 4 },
                    wrapperCol: { span: 20 },
                }, 
                options:[
                    { label: '军队转业干部', value: '1' },
                    { label: '退役士兵', value: '2' },
                    { label: '军队离退休干部和退休士官', value: '3' },
                    { label: '军队无军籍离退休退职职工', value: '4' },
                    { label: '退伍红军老战士', value: '5' },
                    { label: '复员军人', value: '6' },
                    { label: '残疾军人', value: '7' },
                    { label: '伤残民兵民工', value: '8' },
                    { label: '烈士遗属', value: '9' },
                    { label: '因公牺牲军人遗属', value: '10' },
                    { label: '病故军人遗属', value: '11' },
                    { label: '现役军人家属', value: '12' }
                ]
            },
            {
                type:"title",
                title:"生活状况"
            },
            {
                type: "input",
                label: "个人年收入(元)",
                field: "personAnnualIncome",
                value: "",
                props: {
                    placeholder: "请输入个人年收入"
                },
            },
            {
                type: "checkbox",
                label: "医疗保险",
                field: "medicalInsurance",
                value: "",
                options:[
                    { label: '城乡居民基本医疗保险', value: '1' },
                    { label: '职工基本医疗保险', value: '2' },
                    { label: '公费医疗', value: '3' },
                    { label: '无', value: '4' }
                ]
            },
            {
                type: "checkbox",
                label: "养老保险",
                field: "pensionBenefits",
                value: "",
                options:[
                    { label: '城乡居民社会养老保险', value: '1' },
                    { label: '职工基本养老保险', value: '2' },
                    { label: '离退休金', value: '3' },
                    { label: '无', value: '4' }
                ]
            },
            {
                type: "input",
                label: "住房公积金",
                field: "housingFunds",
                value: "",
                props: {
                    placeholder: "请输入住房公积金"
                },
            },
            {
                type: "input",
                label: "享受国家抚恤补助金情况",
                field: "statePension",
                value: "",
                props: {
                    placeholder: "请输入享受国家抚恤补助金情况"
                },
            },
            {
                type: "input",
                label: "享受残废人两项补贴",
                field: "disabledWelfare",
                value: "",
                props: {
                    placeholder: "请输入享受残废人两项补贴"
                },
            },
            {
                type: "checkbox",
                label: "住房状况",
                field: "houseType",
                value: "",
                options:[
                    { label: '无', value: '1' },
                    { label: '自建房', value: '2' },
                    { label: '公有住房', value: '3' },
                    { label: '经济适用房', value: '4' },
                    { label: '公租房', value: '5' },
                    { label: '廉租房', value: '6' },
                    { label: '商品房', value: '7' },
                    { label: '还建房', value: '8' },
                    { label: '其它', value: '9' }
                ]
            },
            {
                type: "select",
                label: "社会救助状况",
                field: "socialAssistance",
                value: "",
                options:[
                    { label: '低保', value: '1' },
                    { label: '五保', value: '2' },
                    { label: '建档立卡贫困户', value: '3' },
                    { label: '无', value: '4' }
                ]
            },
            {
                type:"title",
                title:"其它情况"
            },
            {
                type: "checkbox",
                label: "主要困难",
                field: "mainDifficulties",
                value: "",
                options:[
                    { label: '就业', value: '3' },
                    { label: '生活', value: '4' },
                    { label: '住房', value: '5' },
                    { label: '医疗', value: '6' },
                    { label: '养老', value: '7' },
                    { label: '教育', value: '8' },
                    { label: '其它', value: '9' }
                ]
            },
            {
                type: "checkbox",
                label: "主要诉求",
                field: "mainDemands",
                value: "",
                options:[
                    { label: '提高待遇问题', value: '1' },
                    { label: '确认身份问题', value: '2' },
                    { label: '安排工作问题', value: '3' },
                    { label: '解决三难问题', value: '4' },
                    { label: '解决社保问题', value: '5' },
                    { label: '其它', value: '6' }
                ]
            },
            {
                type: "input",
                label: "具体诉求(不超过500字)",
                field: "specificDemands",
                value: "",
                props: {
                    placeholder: "请输入具体诉求"
                },
            },
        //   {
        //     type: "slot",
        //     field: "priority",
        //     render:()=>{
        //         return <span style={{width:'100%', height:'300px'}}>dddd</span>
        //     }
        //   },
        ]
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [validateForm, setValidateForm] = useState(addSchema)

    const [fields, setFields] = useState(null as any)

    useEffect(()=>{
        console.log('modalType=====》', modalType)
        if(resData) setFields(resData.veteransBaseInfo)
    }, [])

    useImperativeHandle(ref, () => ({
        // getfileIds: () => {
        //     return (uploadRef as any).current.getIds() || []
        // },
        ...uploadRef.current,
        ...formRef.current
    }));

    return (
        <>
            <CustSchemaForm ref={formRef} fields={fields} dynamicValidateForm={validateForm} modalType={modalType}/>
        </>
    )
})

export default FormInfoPage