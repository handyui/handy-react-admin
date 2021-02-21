
import React, { FC, useState, useEffect, useRef} from 'react'
import {BasicTable} from '@/components/table'
import {getPlacePage, deletePlaces, deletePlace} from '@/api/placeInfo'
import { Modal, Button } from 'antd'
import { PlusOutlined, DeleteOutlined} from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, useLocation} from 'react-router-dom'
import { RootState } from '@/store/types'
import { setPanes } from '@/store/actions'
import { CustSchemaForm } from '@/components/form'

const PlaceInfoPage: FC = (props) => {
    const { history }:any = props
    const dispatch = useDispatch()
    const panes = useSelector((state:RootState) => state.layoutReducer.panes)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    
    const searchFormRef = useRef<FormInstance>(null)
    const tableRef = useRef(null)

    const location = useLocation()
    const {pathname, state} = location
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
            colSpan: 6
        },
        formItem: [
            {
                type: "input",
                label: "人员姓名",
                field: "name",
                value: "",
                props: {
                    placeholder: "请输入人员姓名"
                },
            },
            {
                type: "input",
                label: "身份证号",
                field: "idCardNo",
                value: "",
                props: {
                    placeholder: "请输入身份证号码"
                },
            }
        ]
    }

    const handleDetail=async(record:any)=>{
        // 先校验，存在就删除，再打开新的编辑页
        checkUrl('/placeInfo/detail/:id')
        history.push({
            pathname:`/placeInfo/detail/${record.placeId}`,
            state:{
                refresh: true   
            }
        })
     }

    const columns=[ 
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text:any, ...[record, index]:any) => {
                    return  <a type="text" onClick={()=>handleDetail(record)}>
                    {text}
                  </a>
                }
            },
            {
                title: '身份证号',
                dataIndex: 'idCardNo',
                key: 'idCardNo',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render: (text:any) => text === 'M' ? '男':'女'
            },
            {
                title: '民族',
                dataIndex: 'nation',
                key: 'nation',
            },
            {
                title: '政治面貌',
                dataIndex: 'politicalIdentity',
                key: 'politicalIdentity',
            },
            {
                title: '文化程度',
                dataIndex: 'educationDegree',
                key: 'educationDegree',
            },
            {
                title: '行政区划',
                dataIndex: 'orgName',
                key: 'orgName',
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
                            await deletePlace(record.placeId)
                            callback()
                        },
                    },
                    {
                        type: 'text', // 控制类型，默认为a,可选： select | button | text
                        key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
                        text: '编辑',
                        props: {
                            type: 'danger'
                        },
                        func: ({record}:any, callback:any) => {
                            checkUrl('/placeInfo/edit/:id')
                            history.push({
                                pathname:`/placeInfo/edit/${record.placeId}`,
                                state:{
                                    refresh: true   
                                }
                            })              
                        },
                    },
                    // {
                    //     type: 'text', // 控制类型，默认为a,可选： select | button | text
                    //     key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
                    //     text: '查看',
                    //     props: {
                    //         type: 'warning'
                    //     },
                    //     func: ({record}:any, callback:any) => {
                    //         checkUrl('/placeInfo/detail/:id')
                    //         history.push({
                    //             pathname:`/placeInfo//${}`,
                    //             state:{
                    //                 preferentialId:record.preferentialId,
                    //                 veteransId: record.veteransId,
                    //                 detailType:'edit'
                    //             }
                    //         }) 
                    //   }
                    // },
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
                await deletePlaces(selectedRowKeys.toString());
                (tableRef as any).current.refreshTable()
                setSelectedRowKeys([])
            }
        })
    }

    const addItem =()=>{
        history.push({
            pathname:'/placeInfo/add',
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
        if(state && (state as any).refresh && pathname === '/placeInfo'){
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
                getListFunc={getPlacePage} 
                rowKey="placeId"  
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

export default PlaceInfoPage