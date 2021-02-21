
import React, { FC, useState, useRef, useEffect} from 'react'
import {BasicTable} from '@/components/table'
import {deleteUser, deleteUsers, getUser, updateUser, saveUser, getOrganizationTtree, getRolePage} from '@/api/system'
import { selectProgrammePage } from '@/api/subsidy'
import { Modal, message as Message, Button } from 'antd'
import { PlusOutlined, DeleteOutlined} from '@ant-design/icons'
import { SchemaForm } from '@/components/form'
import { FormInstance } from 'antd/lib/form'
import { mapTree } from '@/utils/index'
import { CustSchemaForm } from '@/components/form'
import { matchPath, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/types'
import { setPanes } from '@/store/actions'

const AccountPage: FC = (props) => {
    const { history }:any = props
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const formRef = useRef<FormInstance>(null)
    const searchFormRef = useRef<FormInstance>(null)
    const tableRef = useRef(null)
    const location = useLocation()
    const {pathname, state} = location

    const panes = useSelector((state:RootState) => state.layoutReducer.panes)
    const dispatch = useDispatch()

    const [resData, setResData] = useState({
        pageOption: {},
        searchParam: {}
    })

    // 检验是否存在页面，是就在点击编辑前删除掉
    const checkUrl=(url:string)=>{
        const index = panes.findIndex((item:any)=> {
            return matchPath(item.menuPath, {path: url, exact: true})
        })
        if(index > 0){
            const arr = panes
            arr.splice(index, 1)
            dispatch(setPanes([...arr]))
        }
    }
    
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
                label: "账号",
                field: "account",
                value: "",
                props: {
                    placeholder: "请输入账号或手机号"
                },
            },
            {
                type: "input",
                label: "用户名",
                field: "name",
                value: "",
                props: {
                    placeholder: "请输入用户姓名"
                },
            },
            {
                type: "select",
                label: "状态",
                field: "status",
                value: "",
                props: {
                    placeholder: "请选择状态"
                },
                options:[
                    {label:'可用', value:'y', key:'y'},
                    {label:'不可用', value:'n', key:'n'}
                ]
            }
        ]
    }     

    const validateForm=(modalType:string)=>{
        return {
            formItem: [
                {
                    type: "input",
                    label: "用户名",
                    field: "account",
                    value: '',
                    props: {
                        placeholder: "请输入用户名",
                        disabled: (modalType === 'edit'||modalType === 'detail') ? true : false

                    },
                    rules: [
                        {
                            required: (modalType === 'edit'||modalType === 'detail') ? false : true,
                            message: "用户名不能为空"
                        }
                    ]
                },
                {
                    type: "input",
                    label: "密码",
                    field: "password",
                    value: "",
                    props: {
                        type: 'password',
                        placeholder: "请输入密码",
                        disabled:  modalType === 'add' ? false : true,

                    },
                    rules: [
                        {
                            required:  modalType === 'detail' ? false : true,
                            message: "密码不能为空"
                        }
                    ]
                },
                {
                    type: "input",
                    label: "姓名",
                    field: "name",
                    value: '',
                    props: {
                        placeholder: "请输入姓名"
                    },
                    rules: [
                        {
                            required: true,
                            message: "姓名不能为空"
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
                    label: "手机号",
                    field: "phone",
                    value: '',
                    props: {
                        placeholder: "请输入手机号"
                    },
                    rules: [
                        {
                            required: true,
                            message: "手机号不能为空"
                        }
                    ]
                },
                {
                    type: "input",
                    label: "邮箱",
                    field: "email",
                    value: '',
                    props: {
                        placeholder: "请输入邮箱"
                    },
                    rules: [
                        {
                            required: true,
                            message: "邮箱不能为空"
                        }
                    ]
                },
                {
                    type: "tree-select",
                    label: "单位",
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
                    type: "multiple-select",
                    label: "角色",
                    field: "roleId",
                    value: undefined,
                    loading: true,
                    props: {
                        placeholder: "请选择角色",
                    },
                    asyncOptions: async () => {
                        // 获取角色列表
                        const {result}:any = await getRolePage({"current": 1, "size": 50})
                        return result.records.map((item:any) => ({
                            label: item.roleName,
                            value: item.roleId,
                            key: item.roleId
                        }))
                    },
                    asyncValue: async (curValue:any, fields:any) => {
                        const {roleId} = fields
                        return roleId ? roleId.toString().split(',') : []
                    }
                },
                {
                    type: "switch",
                    label: "状态",
                    field: "status",
                    value: undefined,
                    props: {
                        // placeholder: "请输入手机号",
                        // checkedChildren: "y",
                        // unCheckedChildren: "n"
                    },
                    asyncValue: async (curValue:any, fields:any) => {
                        return fields.status === 'n'? false: true
                    }
                },
            ],
            modalType
        }
    }

    const handleDetail=async(record?:any)=>{
        let fields={}
        const {code, result}:any = await getUser(record.userId)
        if(code===200){
            fields = result
        }
        Modal.info({
            title: '',
            icon: '',
            content: <SchemaForm ref={formRef} fields={fields} dynamicValidateForm={validateForm('detail')} />,
            // okButtonProps:{ disabled: true },
            onOk: (close) => {
                close()
            },
            okText:"关闭",
        })
    }

    const columns=[ 
            {
                title: '方案类型',
                dataIndex: 'programmeType',
                key: 'programmeType'
            },
            {
                title: '方案名称',
                dataIndex: 'programmeName',
                key: 'programmeName',
            },
            {
                title: '方案月份',
                dataIndex: 'programmeMonth',
                key: 'programmeMonth',
            },
            {
                title: '操作人',
                dataIndex: 'createUser',
                key: 'createUser',
            },
            {
                title: '操作时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title:'备注',
                dataIndex: 'remark',
                key: 'remark',
            },
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
                            await deleteUser({userId:record.userId})
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
                        func: async({record}:any, callback:any) => {
                            // 先校验，存在就删除，再打开新的编辑页
                            checkUrl('/financeManage/subsidy/edit/:id')
                            history.push({
                                pathname:`/financeManage/subsidy/edit/${record.subsidyProgrammeId}`,
                                state:{
                                    refresh: true   
                                }
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
                await deleteUsers(selectedRowKeys.toString());
                (tableRef as any).current.refreshTable()
                setSelectedRowKeys([])
            }
        })
    }

    const addItem =()=>{
        history.push({
            pathname:'/financeManage/subsidy/add'
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
        if(state && (state as any).refresh && pathname === '/system/account'){
            console.log('resData', resData)
            handleClick(resData.searchParam)
        }
    }, [state])

    const callback=(val:any)=> setResData(val)

    return (
        <div className="content">
            <CustSchemaForm ref={searchFormRef} dynamicValidateForm={searchSchema} callback={handleClick} showBtn >
                <Button type="primary" ghost icon={<PlusOutlined />}  onClick={addItem}> 添加 </Button>
                <Button danger icon={<DeleteOutlined />}  onClick={deleteItems}> 删除 </Button>
            </CustSchemaForm>
            <BasicTable 
                ref={tableRef}
                columns={columns} 
                getListFunc={selectProgrammePage} 
                rowKey="subsidyProgrammeId"  
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

export default AccountPage