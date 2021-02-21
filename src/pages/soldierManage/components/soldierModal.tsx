import React,{forwardRef, useState, useRef, useImperativeHandle} from 'react'
import { getVeteransPage } from '@/api/preferential'
import {BasicTable} from '@/components/table'
import { FormInstance } from 'antd/lib/form'
import { CustSchemaForm } from '@/components/form'
import { Modal } from 'antd'

interface soldierModalProps{
    callback?:(id:string)=>void
}

const SoldierModal = forwardRef<any, soldierModalProps>((props, ref) => {
    const {callback} = props
    const [isModalVisible, setIsModalVisible] = useState(false)
    const tableRef = useRef(null)
    const searchFormRef = useRef<FormInstance>(null)
    const [selectedKeys, setSelectedRowKeys] = useState(null)
    const [veteransId, setveteransId] = useState([''])

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
                label: "用户名",
                field: "name",
                value: "",
                props: {
                    placeholder: "请输入用户姓名"
                },
            },
            {
                type: "input",
                label: "身份证",
                field: "idCardNo",
                value: "",
                props: {
                    placeholder: "请输入身份证号"
                },
            },
        ]
    }     

    const columns=[ 
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: (text:any) => text === 'M' ? '男':'女'
        },
        {
            title: '身份证号',
            dataIndex: 'idCardNo',
            key: 'idCardNo',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '行政区域',
            dataIndex: 'orgName',
            key: 'orgName',
        },
        // {
        //     title: '操作',
        //     dataIndex: 'action',
        //     actions: [
        //         {
        //             type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
        //             key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
        //             text: '删除',
        //             permission: { // 权限
        //                 action: 'delete',
        //                 effect: 'disabled'
        //             },
        //             props: {
        //                 type: 'danger'
        //             },
        //             func: async ({record}:any, callback:any) => {
                      
        //             },
        //         },
        //         {
        //             type: 'text', // 控制类型，默认为a,可选： select | button | text
        //             key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
        //             text: '编辑',
        //             props: {
        //                 type: 'warning'
        //             },
        //             func: async({record}:any, callback:any) => {
                        
        //             }
        //         },
        //     ]
        // }
    ]

    const onCancel = () =>{
        setIsModalVisible(false)
    }

    const onOk = () =>{
        console.log('selectedKeys', selectedKeys)
        callback && callback(selectedKeys as any)
        setIsModalVisible(false)
    }

    const showModal = async(veteransId: string) =>{
        setIsModalVisible(true)
        setveteransId([veteransId])
    }

    const handleClick=(val:any)=> (tableRef as any).current.refreshTable(val)

    useImperativeHandle(ref, () => ({
        showModal
        // ...formRef.current,
        // getfileIds(){
        //     return (uploadRef as any).current.getfileIds()
        // }
    }))

    const onChange = (selectedRowKeys: React.Key[], selectedRows: any[]) => {
        setveteransId(selectedRowKeys as any)
        setSelectedRowKeys(selectedRowKeys[0] as any)
        console.log('selectedRowKeys', selectedRowKeys)
        
    }

    return (
        <>
            <Modal title="军人列表" visible={isModalVisible} onOk={onOk} onCancel={onCancel} width={1000}>
                <CustSchemaForm ref={searchFormRef} dynamicValidateForm={searchSchema} callback={handleClick} showBtn />
                <BasicTable 
                    ref={tableRef}
                    columns={columns} 
                    getListFunc={getVeteransPage} 
                    rowKey="veteransId"  
                    // rowSelection={{
                    //     selectedRowKeys,
                    //     onChange: onSelectChange,
                    // }} 
                    // refreshTable={refreshTable}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: veteransId,
                        onChange,
                    }}
                />
            </Modal>
        </>
    )
})

export default SoldierModal