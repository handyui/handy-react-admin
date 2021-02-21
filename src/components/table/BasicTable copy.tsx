import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import {TableColumn} from "./tableColumn.d"
import { Table, Space, Popconfirm } from 'antd'
// import {debounce} from '@/utils/index'

interface Columns {
    actions?: any;
    [key: string]: any;
}

// 分页查询参数
interface PagePrams {
    current?: string | number // 当前页数
    size?: string | number // 每页条数
    [key: string]: any
}

export interface BasicTableProps {
    columns?: TableColumn
    rowSelection?: any
    rowKey?: any
    queryParams?: object
    pageOption?: any
    getListFunc?: (val: any) => Promise<unknown> 
    refreshTable?: boolean
    style?: React.CSSProperties
    type?: any
    onExpand?:(expanded:any, record:any) => void
}

export interface MenuItemProps {
    index?: string;
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
}

const BasicTable = forwardRef<any, BasicTableProps>((props, ref) => {
    const {columns, rowKey, rowSelection, queryParams, pageOption, getListFunc, type, onExpand,} = props
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageOptions, setPageOptions] = useState(pageOption)
    const flag = columns.find((item:any) => (item.dataIndex || item.key) === 'action')
    const actions = flag ? flag.actions : []
    const _isCancelled = React.useRef(false)
    const [searchParam, setSearchParam] = useState({}) // 存储搜索记录，销毁时清除

    // 获取表格数据
    const refreshTableData =  (param?:any) => {
        setLoading(true)
        const params =  {
            current:pageOptions.current, 
            size:pageOptions.pageSize, 
            ...queryParams, 
            ...searchParam,
            ...param
        }
        getListFunc &&  getListFunc(params).then((result:any)=>{
            if(result.code === 200){
                if (!_isCancelled.current) { 
                const {records, current, size, total} = result.result
                    setPageOptions(Object.assign(pageOptions, {current, pageSize:size, total}))
                    // 因为没有传回children字段，要自行添加，table tree 需要children
                    if(type && type ==='table-tree'){
                        records.forEach((item:any) => {
                            item['children'] = []
                        })
                    }
                    setData(records)
                }
            }
        }).finally(() => {if(!_isCancelled.current){setLoading(false)} })
        
    }

    // 操作事件
    const actionEvent = (record:any, func:any) => func({record, props}, refreshTableData)

    const genColumn = (column:any)=>{
        let arr=[]
        arr.push(...column.filter((item:any) => {
           return item.dataIndex !== 'action'
        }))
        if(actions.length>0){
            arr.push({
                title: '操作',
                key: 'action',
                render: (text:any, record:any) => (
                    <Space size="middle">
                    { actions.map((action:any, index:number) => (
                         [ action.type==='popconfirm'? ( 
                            <Popconfirm key={index} title="您确定要删除吗？" onConfirm={()=>actionEvent(record, action.func)}
                    ><a>删除</a></Popconfirm>):'' ,
                        action.type ===  'text'? (<a key={index} onClick={()=>actionEvent(record, action.func)}>{action.text}</a>):'']
                    ))}
                        
                {/* //     <a>编辑</a>
                //     <a>关联权限</a> */}
                </Space>
                ),
            })
        }
        return arr
    }

    useEffect(()=>{
        refreshTableData()
        return () => {
            setSearchParam({})
            _isCancelled.current = true
        }
    }, [])

    useImperativeHandle(ref, () => ({
        refreshTable: (val:any) => {
            setSearchParam(val)
            refreshTableData(val)
        }
    }))

    // 分页改变
    const paginationChange = (page:number, pageSize:number) => {
        let params = {
            size:pageSize?pageSize:pageOptions.pageSize,
            current: page
        }
        setPageOptions({current: page, size:pageSize?pageSize:pageOptions.pageSize })
        refreshTableData(params)
    }


    return (
        <Table rowKey={rowKey}
            rowSelection={rowSelection} 
            columns={genColumn(columns)} 
            dataSource={data} 
            loading={loading}
            pagination={{...pageOptions, 
                onChange:paginationChange, 
                pageSizeOptions: ['5', '10', '20', '50'],
                showSizeChanger: true,
            }}
            onExpand={onExpand}
        >
            {/* {
                columns.map((item:any) => (
                <Column title={item.title} dataIndex={item.dataIndex} key={item.dataIndex}></Column>   
                //   {item.dataIndex!=='action'?
                //     <Column title={item.title} dataIndex={item.dataIndex} key={item.dataIndex} />
                //     :''}
                ))
            } */}
            {/* <Column title="roleName" dataIndex="roleName" key="roleName" />
        
                actions.map((action:any, index:number) => (
                    <div key={index}>88</div>
                    {action.type == 'text'? <button>dddd</button>:''}  

                ))
            }
            
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        
            <Column
                title="Action"
                key="action"
                render={(text, record) => (
                    <Space size="middle">
                        <a>Invite {record.lastName}</a>
                        <a>Delete</a>
                    </Space>
                )}
                />  */}
        </Table>
    )
})

BasicTable.defaultProps = {
    pageOption:{
        current:1, pageSize:10
    },
    refreshTable:false
}

export default BasicTable
