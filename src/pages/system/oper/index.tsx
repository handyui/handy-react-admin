
import React, { FC, useRef, useState, useEffect} from 'react'
import { BasicTable } from '@/components/table'
import { getOperationLogPage } from '@/api/system'
import { FormInstance } from 'antd/lib/form'
import { CustSchemaForm } from '@/components/form'
import {formatToDate} from '@/utils/dateUtil'
import {useLocation} from 'react-router-dom'

const OperPage: FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [refreshTable, setRefresh] = useState(false)
    const formRef = useRef<FormInstance>(null)
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
                label: "登录名称",
                field: "userName",
                value: "",
                props: {
                    placeholder: "请输入登陆人姓名"
                },
            },
            {
                type: "input",
                label: "登录账号",
                field: "userAccount",
                value: "",
                props: {
                    placeholder: "请输入登录账号"
                },
            },
            {
                type: "range-pcker",
                label: "时间",
                field: "timeRange",
                value: "",
                grid: {
                    rowGutter: 0,
                    colSpan: 7
                },
                tailLayout:{
                    labelCol: { span: 3 },
                    wrapperCol: { span: 21 },
                }, 
            }
        ]
    }

    const columns=[ 
        {
            title: '操作类型',
            dataIndex: 'operationType',
            key: 'operationType'
        },
        {
            title: '操作内容',
            dataIndex: 'operation',
            key: 'operation'
        },
        {
            title: '操作人',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
        },
        {
            title: '操作时间',
            dataIndex: 'createTime',
            key: 'createTime'
        },
        {
            title: '是否成功',
            dataIndex: 'succeed',
            key: 'succeed'
        },
        {
            title: '备注',
            dataIndex: 'message',
            key: 'message',
            ellipsis: true,
        },
        {
            title: '参数',
            dataIndex: 'args',
            key: 'args',
            ellipsis: true,
        },
        {
            title: '操作系统',
            dataIndex: 'browser',
            ellipsis: true,
        },
        {
            title: '修改内容',
            dataIndex: 'updateContent',
            key: 'updateContent',
            ellipsis: true,
        },
    ]
    
    const handleClick=(val:any)=>{
        const {timeRange, ...rest} = val
        const params={
            ...rest,
            startDate: timeRange && formatToDate(timeRange[0]),
            endDate: timeRange && formatToDate(timeRange[1])
        };
        setResData({
            pageOption: resData.pageOption,
            searchParam: params
        });
        (tableRef as any).current.refreshTable(params)
    }

    useEffect(()=>{
        if(state && (state as any).refresh && pathname === '/system/oper'){
            handleClick(resData.searchParam)
        }
    }, [state])

    const callback=(val:any)=> setResData(val)

    return (
        <div className="content">
            <CustSchemaForm ref={formRef} dynamicValidateForm={searchSchema} callback={handleClick} showBtn/>
            <BasicTable 
                ref={tableRef}
                columns={columns} 
                getListFunc={getOperationLogPage} 
                rowKey="operationLogId"  
                pageOption={resData.pageOption}
                searchParam={resData.searchParam}
                callback={callback}
            />
        </div>
    )

}

export default OperPage