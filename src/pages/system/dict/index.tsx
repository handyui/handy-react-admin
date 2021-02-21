
import React, { FC, useState, useRef, useEffect} from 'react'
import {BasicTable} from '@/components/table'
import {deleteDicts, getDictionaryList, deleteDictionary, addDictionary, updateDictionary, getAllDictionaryList} from '@/api/system'
import { Modal, message as Message, Button } from 'antd'
import { PlusOutlined, DeleteOutlined} from '@ant-design/icons'
import { SchemaForm } from '@/components/form'
import { FormInstance } from 'antd/lib/form'
import { CustSchemaForm } from '@/components/form'
import { useLocation} from 'react-router-dom'

const list2tree = (items:any, parent=null) => {
    return items.filter((item:any) => item.parentCode === parent).map((item:any) => ({
      title: item.dicValue,
      key: item.dicCode,
      children: list2tree(items, item.dicCode),
      value: item.dicCode
    }))
}

const DictPage: FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [refreshTable, setRefresh] = useState(false)
    const formRef = useRef<FormInstance>(null)
    const searchFormRef = useRef<FormInstance>(null)
    const tableRef = useRef(null)
    const location = useLocation()
    const {pathname, state} = location
    const [resData, setResData] = useState({
        pageOption: {},
        searchParam: {}
    })

    const searchSchema = {
        layout : {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        },
        grid: {
            rowGutter: 10,
            colSpan: 5
        },
        formItem: [
            {
                type: "input",
                label: "code",
                field: "dicCode",
                value: "",
                props: {
                    placeholder: "请输入code"
                },
            },
            {
                type: "input",
                label: "字典值",
                field: "dicValue",
                value: "",
                props: {
                    placeholder: "请输入字典值"
                },
            },
            {
                type: "input",
                label: "父级code",
                field: "parentCode",
                value: "",
                grid: {
                    rowGutter: 0,
                    colSpan: 6
                },
                // tailLayout:{
                //     labelCol: { span: 4 },
                //     wrapperCol: { span: 20 },
                // }, 
                props: {
                    placeholder: "请输入父级code"
                },
            }
        ]
    }

    const addSchema = {
        formItem: [
            {
                type: "tree-select",
                label: "父字典项ID",
                field: "parentCode",
                value: "",
                loading: true,
                props: {
                    // disabled: false,
                    placeholder: "请选择类型",
                    treeDefaultExpandAll: false,
                }, 
                asyncOptions: async (curVal:any, formInstance:any) => {
                    const {result}:any = await getAllDictionaryList({}) 
                    return list2tree(result) 
                },
                // asyncValue: async (curVal:any, formInstance:any) => { 
                //     const {parentCode} = formInstance.props.fields as any
                //     return parentCode
                // }
                rules: [
                    {
                        required: false,
                        message: "请输入父字典项ID"
                    }
                ]
            },
            {
                type: "input",
                label: "字典值",
                field: "dicValue",
                value: "",
                props: {
                    placeholder: "请输入字典值"
                },
                rules: [
                    {
                        required: true,
                        message: "请输入字典值"
                    }
                ]
            },
            {
                type: "input",
                label: "字典code",
                field: "dicCode",
                value: "",
                props: {
                    placeholder: "请输入字典code"
                },
                rules: [
                    {
                        required: true,
                        message: "请输入字典键"
                    }
                ]
            },
            {
                type: "input-number",
                label: "排序",
                field: "priority",
                value: "",
                props: {
                    placeholder: "0"
                },
            }
        ]
    }

    const columns=[ 
            {
                title: '字典code',
                dataIndex: 'dicCode',
                key: 'dicCode',
            },
            {
                title: '字典值',
                dataIndex: 'dicValue',
                key: 'dicValue',
            },
            {
                title: '父级code',
                dataIndex: 'parentCode',
                key: 'parentCode',
            },
            {
                title: '排序',
                dataIndex: 'priority',
                key: 'priority',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '操作',
                dataIndex: 'action',
                actions: [
                    {
                        type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                        key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
                        text: '删除',
                        props: {
                            type: 'danger'
                        },
                        func: async ({record}:any, callback:any) => {
                            await deleteDictionary(record.id)
                            callback()
                        },
                    },
                    {
                        type: 'text', // 控制类型，默认为a,可选： select | button | text
                        key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
                        text: '编辑',
                        props: {
                            type: 'warning'
                        },
                        func: ({record}:any, callback:any) => {
                            Modal.confirm({
                                title: '编辑字典',
                                icon: '',
                                content: <SchemaForm ref={formRef} fields={record} dynamicValidateForm={addSchema} />,
                                onOk: (close) => {
                                    // return new Promise((resolve, reject) => {
                                        formRef.current!.validateFields().then(async(values:any)=>{
                                            const params={
                                                ...record,
                                                ...values
                                            }
                                            const {code, message}:any = await updateDictionary(params)
                                            if(code === 200){
                                                 Message.success(`${message}`,1.5,()=>close())
                                                setRefresh(!refreshTable)
                                            }else{
                                                Message.error(`${message}`)
                                            }
                                        }).catch(() => console.log('出错!'))
                                    // }).catch(()=>{})
                                },
                            })
                      }
                    },
                ]
            }
        ]

    const onSelectChange = (keys:any) => {
        setSelectedRowKeys(keys)
    }

    const deleteItems=()=>{
        Modal.confirm({
            title: '提示',
            icon: '',
            content: '您确定要删除所有选中吗？',
            onOk: async () => {
                await deleteDicts(selectedRowKeys.toString());
                (tableRef as any).current.refreshTable()
                setSelectedRowKeys([])
            },
        })
    }

    const addItem =()=>{
        Modal.confirm({
            title: '新增字典',
            icon: '',
            content: <SchemaForm ref={formRef} dynamicValidateForm={addSchema} />,
            onOk: (close) => { 
                // return new Promise((resolve, reject) => {
                    formRef.current!.validateFields().then(async(values:any)=>{
                        const {code, message}:any = await addDictionary(values)
                        if(code === 200){
                             Message.success(`${message}`,1.5,()=>close());
                            (tableRef as any).current.refreshTable()
                        }else{
                            Message.error(`${message}`)
                        }
                    }).catch(() => console.log('出错!'))
                // }).catch(()=>{})
            },
        })
    }

    const handleClick=(val:any)=> {
        setResData({
            pageOption: resData.pageOption,
            searchParam:val
        });
        (tableRef as any).current.refreshTable(val)

    }
    
    useEffect(()=>{
        if(state && (state as any).refresh && pathname === '/system/dict'){
            handleClick(resData.searchParam)
        }
    }, [state])

    const callback=(val:any)=> setResData(val)

    return (
        <div className="content">
            <CustSchemaForm ref={searchFormRef} dynamicValidateForm={searchSchema} callback={handleClick} showBtn>
                <Button type="primary" ghost icon={<PlusOutlined />}  onClick={addItem}> 添加 </Button>
                <Button danger icon={<DeleteOutlined />}  onClick={deleteItems}> 删除 </Button>
            </CustSchemaForm>
            <BasicTable 
                ref={tableRef}
                columns={columns} 
                getListFunc={getDictionaryList} 
                rowKey="id"  
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                }} 
                pageOption={resData.pageOption}
                searchParam={resData.searchParam}
                callback={callback}
            />
        </div>
    )

}

export default DictPage