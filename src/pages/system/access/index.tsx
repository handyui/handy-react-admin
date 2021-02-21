
import React, { FC, useState, useRef, useEffect} from 'react'
import {BasicTable} from '@/components/table'
import {deleteMenus, deleteMenu, getMenulist, queryMenuList, queryCatalogList, updateMenu, addMenu} from '@/api/system'
import { Modal, message as Message, Button } from 'antd'
import { PlusOutlined, DeleteOutlined} from '@ant-design/icons'
import { SchemaForm } from '@/components/form'
import { FormInstance } from 'antd/lib/form'
import { CustSchemaForm } from '@/components/form'
import { useDispatch } from 'react-redux'
import { SetUserInfor } from '@/store/actions'
import { useLocation} from 'react-router-dom'

const list2tree = (items:any, parent = 0) => {
  return items.filter((item:any) => item.parentId === parent).map((item:any) => ({
    title: item.title,
    key: item.menuId,
    children: list2tree(items, item.menuId),
    value: item.menuId
  }))
}

const AccessPage: FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [refreshTable, setRefresh] = useState(false)
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({} as any), [])
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
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        },
        grid: {
            rowGutter: 10,
            colSpan: 5
        },
        formItem: [
            {
                type: "select",
                label: "菜单类型",
                field: "menuType",
                value: undefined,
                props: {
                    placeholder: "请选择类型"
                },
                options:[
                  {label:'目录', value:'catalog'},
                  {label:'菜单', value:'menu'},
                  {label:'按钮', value:'button'}
                ]
            },
            {
                type: "input",
                label: "菜单名称",
                field: "title",
                value: "",
                props: {
                    placeholder: "请输入菜单名称"
                },
            },
        ]
    }

    const addSchema = {
        formItem: [
              {
                type: "tree-select",
                label: "上级权限",
                field: "parentId",
                value: "",
                loading: true,
                props: {
                  placeholder: "请选择上级权限",
                  treeDefaultExpandAll: true,
                },
                asyncOptions: async (curValue:any, formInstance:any) => {
                    const menuList = await getMenulist() 
                    return list2tree((menuList as any).result)  // { key: 0, value: '0', title: '无111' }
                },
                // asyncValue: async (curValue:any, fields:any) => { 
                //     const {parentId} = fields
                //     return parentId
                // }
              },
              {
                type: "select",
                label: "菜单类型",
                field: "menuType",
                value: undefined,
                props: {
                    // disabled: false,
                    placeholder: "请选择类型"
                }, /** 菜单类型（catalog:目录，menu:菜单，button:按钮） */
                options:[
                    {label:'目录', value:'catalog'},
                    {label:'菜单', value:'menu'}
                ],
                rules: [
                    {
                        required: true,
                        message: "请选择菜单类型"
                    }
                ]
            },
            {
              type: "input",
              label: "名称",
              field: "title",
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
              label: "路由地址",
              field: "menuPath",
              value: "",
              props: {
                  placeholder: "请输入路由地址"
              },
              rules: [
                  {
                      required: true,
                      message: "请输入路由地址"
                  }
              ]
          },
          {
              type: "input",
              label: "菜单编码",
              field: "menuCode",
              value: "",
              props: {
                  placeholder: "请输入菜单编码"
              },
              rules: [
                  {
                      required: true,
                      message: "请输入菜单编码"
                  }
              ]
          },
          {
              type: "input",
              label: "重定向地址",
              field: "redirect",
              value: "",
              props: {
                  placeholder: "请输入重定向地址"
              },
          }, 
           {
              type: "input-number",
              label: "排序",
              field: "priority",
              value: "",
              props: {
                  placeholder: "0"
              },
          },
          {
              type: 'icon-select',
              label: "图标",
              field: "icon",
              value: "",
              asyncValue: async (currentValue:any, fields:any) => {
                //   const {icon} = formInstance?.props.fields
                //   return icon
              }
          }
        ]
    }

    const columns=[ 
            {
                title: '名称',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'url地址',
                dataIndex: 'menuPath',
                key: 'menuPath',
            },
            {
                title: 'icon',
                dataIndex: 'icon',
                key: 'icon',
            },
            {
                title: '排序',
                dataIndex: 'priority',
                key: 'priority',
            },
            {
                title: '按钮类型',
                dataIndex: 'menuType',
                key: 'menuType',
                render: (text:any) => text === 'catalog' ? '目录':'菜单'
            },
            {
              title: '创建时间',
              dataIndex: 'createTime',
              key: 'createTime',
            },
            {
              title: '更新时间',
              dataIndex: 'updateTime',
              key: 'updateTime',
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
                            await deleteMenu(record.menuId)
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
                                title: '编辑菜单',
                                icon: '',
                                content: <SchemaForm ref={formRef} fields={record} dynamicValidateForm={addSchema} />,
                                onOk: (close) => {
                                    // return new Promise((resolve, reject) => {
                                        formRef.current!.validateFields().then(async(values:any)=>{
                                            const params={
                                                ...record,
                                                ...values
                                            }
                                            const {code, message}:any = await updateMenu(params)
                                            if(code === 200){
                                                Message.success(`${message}`,1.5,()=>close());
                                                (tableRef as any).current.refreshTable()
                                                dispatch(SetUserInfor())
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
                await deleteMenus(selectedRowKeys.toString());
                (tableRef as any).current.refreshTable()
                setSelectedRowKeys([])
            },
        })
    }

    const addItem =()=>{
        Modal.confirm({
            title: '新增菜单',
            icon: '',
            content: <SchemaForm ref={formRef} dynamicValidateForm={addSchema} />,
            onOk: (close) => { 
                // return new Promise((resolve, reject) => {
                    formRef.current!.validateFields().then(async(values:any)=>{
                        const {code, message}:any = await addMenu(values)
                        if(code === 200){
                            Message.success(`${message}`,1.5,()=>close());
                            (tableRef as any).current.refreshTable()
                        }else{
                            Message.error(`${message}`)
                        }
                    }).catch(() => console.log('出错!'))
                // }).catch(()=>{})
            },
            okText:"确认",
            cancelText:"取消"  
        })
    }

    const onExpand=async(expanded: any, record: any)=>{
        console.log('val', expanded, record)
        // 如果是第一次展开
      // if (expanded && record.menuType === 'catalog') {
        const {result}:any = await queryMenuList({menuId: record.menuId, menuType: 'menu'})
        console.log('result', result)
        record['children'] = result
        console.log('record===>', record)
        forceUpdate()
        // setRefresh(!refreshTable)
      // }
    }

    const handleClick=(val:any)=> {
        setResData({
            pageOption: resData.pageOption,
            searchParam:val
        });
        (tableRef as any).current.refreshTable(val)

    }

    useEffect(()=>{
        if(state && (state as any).refresh && pathname === '/system/access'){
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
                getListFunc={queryCatalogList} 
                queryParams={{'menuType': 'catalog'}} 
                rowKey="menuId"  
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                }} 
                refreshTable={refreshTable}
                type="table-tree"
                onExpand={onExpand}
                // expand="expand"
                pageOption={resData.pageOption}
                searchParam={resData.searchParam}
                callback={callback}
            />
  
        </div>
    )

}

export default AccessPage