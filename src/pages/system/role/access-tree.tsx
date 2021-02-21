import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Tree, Spin } from 'antd'
import { getMenulist, getRoleAccess } from '@/api/system'

interface AccessTreePorps{
    fields:any[]
}

const AccessTree = forwardRef<any, AccessTreePorps>((props, ref) => {
    const {fields} = props
    const [isLoading, setIsLoading] = useState(false)
    const [treeData, setTreeData] = useState([])
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

    // 列表转树
    const list2tree = (items:any, parent = 0) => {
    return items.filter((item:any) => item.parentId === parent).map((item:any) => ({
        // ...item,
        title: item.title,
        key: item.menuId,
        children: list2tree(items, item.menuId) 
    }))
    }

    const getTreeData = async ()=> {
        setIsLoading(true)
        const {result}:any = await getMenulist().finally(() => setIsLoading(false))
        setTreeData(list2tree(result))
    }

    const getData = async ()=> {
        const params = {
            "exceptMenuType": null,
            "roleIds": [(fields as any).roleId]
        }
        // 获取角色列表
        const {result}:any = await getRoleAccess(params)
        setCheckedKeys(result.map((item:any)=> item.menuId))
        // 设置默认选中时，过滤掉parentId为一级的
        setDefaultSelectedKeys(result.filter((item:any) =>item.parentId !==0).map((item:any)=> item.menuId))
    }

    useEffect(()=> {
        getTreeData()
        getData()
        // setCheckedKeys(fields)
        // console.log('fields', fields)
        // callback(checkedKeys)
        
    },[])

    const onCheck = (checkedKeys:any) => {
        console.log('checkedKeys222===>', checkedKeys)
      setCheckedKeys(checkedKeys)
    //   callback(checkedKeys)
    }

    useImperativeHandle(ref, () => ({
        checkedKeys: () => {
            // treeRef.current.focus()
            console.log('checkedKeys333', checkedKeys)
            return checkedKeys
        }
    }));

    return (
        <Spin spinning={isLoading}>
            <Tree
                ref={ref}
                checkable
                // onExpand={onExpand}
                // expandedKeys={expandedKeys}
                defaultSelectedKeys={defaultSelectedKeys}
                autoExpandParent={true}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                // onSelect={onSelect}
                // selectedKeys={selectedKeys}
                treeData={treeData}
            />
        </Spin>
    )
})

export default AccessTree