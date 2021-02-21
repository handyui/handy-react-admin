
import React, { FC, useEffect, useRef, useState} from 'react'
import { BasicTable } from '@/components/table'
import { getLogPage } from '@/api/system'
import { FormInstance } from 'antd/lib/form'
import { CustSchemaForm } from '@/components/form'
import {formatToDate} from '@/utils/dateUtil'
import {useLocation} from 'react-router-dom'

const LoginLogPage: FC = () => {
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
                // props: {
                //     placeholder: "请输入登录账号"
                // },
            }
        ]
    }

    const columns=[ 
        {
            title: '登录名称',
            dataIndex: 'userName',
            // slots: {
            //     customRender: 'moduleName'
            // }
        },
        {
            title: '登录账号',
            dataIndex: 'userAccount',
        },
        {
            title: '登录地址',
            dataIndex: 'ipAddress',
        },
        {
            title: '状态',
            dataIndex: 'succeed',
        },
        {
            title: '操作时间',
            dataIndex: 'createTime',
        },
        {
            title: '浏览器版本',
            dataIndex: 'browser',
            ellipsis: true,
        }
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
        if(state && (state as any).refresh && pathname === '/system/loginLog'){
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
                getListFunc={getLogPage} 
                rowKey="loginLogId"  
                pageOption={resData.pageOption}
                searchParam={resData.searchParam}
                callback={callback}
            />
        </div>
    )

}

export default LoginLogPage