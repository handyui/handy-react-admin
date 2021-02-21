
import React, { FC, useState, useRef, useEffect} from 'react'
import {BasicTable} from '@/components/table'
import {deleteOrgList, getOrganizationList, deleteDictionary, addOrganization, updateOrganization, getOrganizationTtree} from '@/api/system'
import { Modal, message as Message, Button } from 'antd'
import { PlusOutlined, DeleteOutlined} from '@ant-design/icons'
import { SchemaForm } from '@/components/form'
import { FormInstance } from 'antd/lib/form'
import { mapTree } from '@/utils/index'
import { CustSchemaForm } from '@/components/form'
import { useLocation } from 'react-router-dom'

const DictPage: FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
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
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        },
        grid: {
            rowGutter: 10,
            colSpan: 5
        },
        formItem: [
            {
                type: "input",
                label: "单位名称",
                field: "orgName",
                value: "",
                props: {
                    placeholder: "请输入单位名称"
                },
            },
            {
                type: "tree-select",
                label: "上级单位",
                field: "parentId",
                value: "",
                loading: true,
                props: {
                    placeholder: "请选择类型",
                    treeDefaultExpandAll: true,
                }, 
                asyncOptions: async (curValue:any, formInstance:any) => {
                    const {result}:any = await getOrganizationTtree() 
                    console.log('result', result)
                    let arr = mapTree(result[0])
                    return arr? [arr]:[]
                },
                // asyncValue: async (curValue:any, formInstance:any) => { 
                //     const {parentId} = formInstance.props.fields as any
                //     return parentId
                // }
            },
            // {
            //     type: "input",
            //     label: "上级单位",
            //     field: "parentId",
            //     value: "",
            //     props: {
            //         placeholder: "请选择上级单位名称"
            //     },
            // }
        ]
    }

    const addSchema = {
        formItem: [
            {
                type: "tree-select",
                label: "上级单位",
                field: "parentId",
                value: "",
                loading: true,
                props: {
                    placeholder: "请选择类型",
                    treeDefaultExpandAll: true,
                }, 
                asyncOptions: async (curValue:any, formInstance:any) => {
                    const {result}:any = await getOrganizationTtree() 
                    let arr = mapTree(result[0])
                    return arr? [arr]:[]
                },
                // asyncValue: async (curValue:any, formInstance:any) => { 
                //     const {parentId} = formInstance.props.fields as any
                //     return parentId
                // }
                rules: [
                    {
                        required: true,
                        message: "请选择上级单位"
                    }
                ]
            },
            {
                type: "input",
                label: "单位名称",
                field: "orgName",
                value: "",
                props: {
                    placeholder: "请输入单位名称"
                },
                rules: [
                    {
                        required: true,
                        message: "请输入单位名称"
                    }
                ]
            },
            {
                type: "input",
                label: "单位编码",
                field: "orgCode",
                value: "",
                props: {
                    placeholder: "请输入单位编码"
                },
                rules: [
                    {
                        required: true,
                        message: "请输入单位编码"
                    }
                ]
            },
            {
                type: "input-number",
                label: "排序",
                field: "priority",
                value: 0,
                props: {
                    placeholder: 0
                },
            }
        ]
    }

    const columns=[ 
            {
                title: '单位名称',
                dataIndex: 'orgName',
                key: 'orgName'
            },
            {
                title: '单位编码',
                dataIndex: 'orgCode',
                key: 'orgCode'
            },
            {
                title: '上级单位',
                dataIndex: 'parentName',
                key: 'parentName'
            },
            {
                title: '排序',
                dataIndex: 'priority',
                key: 'priority'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            },
            // {
            //     title: '创建人',
            //     dataIndex: 'createUser',
            //     key: 'createUser'
            // },
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
                                title: '编辑单位',
                                icon: '',
                                content: <SchemaForm ref={formRef} fields={record} dynamicValidateForm={addSchema} />,
                                onOk: (close) => {
                                    // return new Promise((resolve, reject) => {
                                        formRef.current!.validateFields().then(async(values:any)=>{
                                            const params={
                                                ...record,
                                                ...values
                                            }
                                            const {code, message}:any = await updateOrganization(params)
                                            if(code === 200){
                                                 Message.success(`${message}`,1.5,()=>close());
                                                // setRefresh(!refreshTable)
                                                (tableRef as any).current.refreshTable()
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
                await deleteOrgList({ids: selectedRowKeys.toString()});
                (tableRef as any).current.refreshTable()
                setSelectedRowKeys([])
            },
        })
    }

    const addItem =()=>{
        Modal.confirm({
            title: '新增单位',
            icon: '',
            content: <SchemaForm ref={formRef} dynamicValidateForm={addSchema} />,
            onOk: (close) => { 
                formRef.current!.validateFields().then(async(values:any)=>{
                    const {code, message}:any = await addOrganization(values)
                    if(code === 200){
                        Message.success(`${message}`,1.5,()=>close());
                        (tableRef as any).current.refreshTable()
                    }else{
                        Message.error(`${message}`)
                    }
                }).catch(() => console.log('出错!'))
            }
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [validateForm, setValidateForm] = useState(searchSchema)

    const handleClick=(val:any)=> {
        setResData({
            pageOption: resData.pageOption,
            searchParam:val
        });
        (tableRef as any).current.refreshTable(val)

    }

    useEffect(()=>{
        if(state && (state as any).refresh && pathname === '/system/organization'){
            handleClick(resData.searchParam)
        }
    }, [state])

    const callback=(val:any)=> setResData(val)

    return (
        <div className="content">
           <CustSchemaForm ref={searchFormRef} dynamicValidateForm={validateForm} callback={handleClick} showBtn>
                <Button type="primary" ghost icon={<PlusOutlined />}  onClick={addItem}> 添加 </Button>
                <Button danger icon={<DeleteOutlined />}  onClick={deleteItems}> 删除 </Button>
            </CustSchemaForm>
            <BasicTable 
                ref={tableRef}
                columns={columns} 
                getListFunc={getOrganizationList} 
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