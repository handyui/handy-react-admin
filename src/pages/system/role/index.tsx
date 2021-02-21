
import React, { FC, useState, useRef, useEffect} from 'react'
import {BasicTable} from '@/components/table'
import {deleteRoles, getRolePage, deleteRole, saveRole, updateRole, resetRoleMenu} from '@/api/system'
import { Modal, message as Message, Button } from 'antd'
import { PlusOutlined, DeleteOutlined} from '@ant-design/icons'
import { SchemaForm } from '@/components/form'
import { FormInstance } from 'antd/lib/form'
import AccessTree from './access-tree'
import { CustSchemaForm } from '@/components/form'
import { useDispatch } from 'react-redux'
import { SetUserInfor } from '@/store/actions'
import { useLocation } from 'react-router-dom'

const RolePage: FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const formRef = useRef<FormInstance>(null)
    const searchFormRef = useRef<FormInstance>(null)
    const tableRef = useRef(null)
    const dispatch = useDispatch()
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
                label: "角色名",
                field: "roleName",
                value: "",
                props: {
                    placeholder: "请输入角色名"
                },
            },
            {
                type: "input",
                label: "角色编码",
                field: "roleCode",
                value: "",
                props: {
                    placeholder: "请输入角色编码"
                },
                tailLayout:{
                    labelCol: { span: 8 },
                    wrapperCol: { span: 16 },
                }, 
            }
        ]
    }


    const validateForm=(modalType:string)=>{
    // const addSchema = {
        return {
            formItem: [
                {
                    type: "input",
                    label: "角色名称",
                    field: "roleName",
                    value: "6666",
                    props: {
                        placeholder: "请输入角色名称"
                    },
                    rules: [
                        {
                            required: true,
                            message: "角色名称不能为空"
                        }
                    ]
                },
                {
                    type: "input",
                    label: "角色编码",
                    field: "roleCode",
                    value: "",
                    props: {
                        placeholder: "角色编码"
                    },
                    rules: [
                        {
                            required: true,
                            message: "角色编码不能为空"
                        }
                    ]
                },
                {
                    type: "input-number",
                    label: "排序",
                    field: "sort",
                    value: "",
                    props: {
                        placeholder: "0",
                        // defaultValue: "0"
                        // min:"0",
                        // max:"10"
                    },
                    rules: [
                        {
                            required: true,
                            message: "角色排序不能为空"
                        }
                    ]
                },
            ],
            modalType
        }
    }
    // const [validateForm, setValidateForm] = useState(addSchema)
    const treeRef = useRef(null)

    const handleDetail=(res?:any)=>{
        Modal.info({
            title: '',
            icon: '',
            content: <SchemaForm ref={formRef} fields={res} dynamicValidateForm={validateForm('detail')} />,
            onOk: (close) => {
                close()
            },
            okText:"关闭"
        })
    }

    const columns=[ 
            {
                title: '角色名',
                dataIndex: 'roleName',
                key: 'roleName',
                render: (text:any, ...[record, index]:any) => {
                    return  <a type="text" onClick={()=>handleDetail(record)}>
                    {text}
                  </a>
                }
            },
            {
                title: '角色编码',
                dataIndex: 'roleCode',
                key: 'roleCode',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            // {
            //     title: '创建者',
            //     dataIndex: 'createUser',
            //     key: 'createUser',
            // },
            {
                title: '操作',
                dataIndex: 'action',
                actions: [
                    {
                        type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                        key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
                        text: '删除',
                        permission: { // 权限
                            action: 'delete',
                            effect: 'disabled'
                        },
                        props: {
                            type: 'danger'
                        },
                        func: async ({record}:any, callback:any) => {
                            await deleteRole(record.roleId)
                            callback()
                        },
                    },
                    {
                        type: 'text', // 控制类型，默认为a,可选： select | button | text
                        key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
                        text: '编辑',
                        // permission: { // 权限
                        //     action: 'update',
                        //     effect: 'disabled'
                        // },
                        props: {
                            type: 'warning'
                        },
                        func: ({record}:any, callback:any) => {
                            Modal.confirm({
                                title: '编辑角色',
                                icon: '',
                                content: <SchemaForm ref={formRef} fields={record} dynamicValidateForm={validateForm('edit')} />,
                                onOk: (close) => {
                                    const {roleId, version} = record
                                    // return new Promise((resolve, reject) => {
                                        formRef.current!.validateFields().then(async(values:any)=>{
                                            const params={
                                                roleId,
                                                version,
                                                ...values
                                            }
                                            console.log('params', params)

                                            const {code, message}:any = await updateRole(params)
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
                    },
                    {
                        type: 'text', // 控制类型，默认为a,可选： select | button | text
                        key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
                        text: '关联权限',
                        // permission: { // 权限
                        //     action: 'update',
                        //     effect: 'disabled'
                        // },
                        props: {
                            type: 'warning'
                        },
                        func: ({record}:any, callback:any) => {
                            console.log('record', record)
                            Modal.confirm({
                                title: '关联权限',
                                icon: '',
                                content: <AccessTree ref={treeRef} fields={record} />,
                                onOk: (close) => {
                                    return new Promise(async(resolve, reject) => {
                                        const params={
                                            roleId: record.roleId,
                                            menuIds: (treeRef as any).current.checkedKeys()
                                        }
                                        const {code, message}:any = await resetRoleMenu(params)
                                        if(code === 200){
                                            Message.success(`${message}`,1.5,()=>close())
                                            resolve(null);
                                            (tableRef as any).current.refreshTable()
                                            dispatch(SetUserInfor())
                                        }else{
                                            Message.error(`${message}`)
                                            reject()
                                        }
                                    }).catch(()=>{})
                                },
                            })
                        }
                    }
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
                await deleteRoles(selectedRowKeys.toString());
                (tableRef as any).current.refreshTable()
                setSelectedRowKeys([])
            },
        })
    }

    const addItem =()=>{
        Modal.confirm({
            title: '新增角色',
            icon: '',
            content: <SchemaForm ref={formRef} dynamicValidateForm={validateForm('add')} />,
            onOk: (close) => { 
                // return new Promise((resolve, reject) => {
                    formRef.current!.validateFields().then(async(values:any)=>{
                        const {code, message}:any = await saveRole(values)
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
        if(state && (state as any).refresh && pathname === '/system/role'){
            console.log('resData', resData)
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
                getListFunc={getRolePage} 
                rowKey="roleId"  
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

export default RolePage