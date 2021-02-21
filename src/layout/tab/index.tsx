/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {FC, Component, useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { useDispatch, useStore, useSelector } from 'react-redux'
import { Switch, Route, Redirect, useHistory, useLocation, matchPath} from 'react-router-dom'
import { RootState } from '@/store/types'
import { Tabs, Dropdown, Menu, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { setPanes } from '@/store/actions'
import { menuList } from '@/router/routers'

const { TabPane } = Tabs;

interface TabPage{
  toggle?: ()=>void
}

interface PaneProps {
    title: string
    menuId: string
    closable?: string
    [key:string]:any
}

const TabPage:FC<TabPage> =(props)=>{

    const { toggle } = props
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const store = useStore()
    const [collapsed, setCollapsed] = useState(false)

    const panes = useSelector((state:RootState) => state.layoutReducer.panes)

    const  {pathname} = location
    const routerList = useSelector((state:RootState) => [...(state.userReducer.menu ?state.userReducer.menu:[]), ...menuList])

    const [activeKey, setActiveKey] = useState('')

    const onChange=(val:any)=>{}

    const onEdit = (targetKey:any, action:any) => {
        const index = panes.findIndex((item:any)=>item.menuId == targetKey)
        const currentIndex = panes.findIndex((item:any) => {
            return item.menuPath === pathname
        })
        const arr = panes
        arr.splice(index, 1)
        if(arr.length === 1){
            setActiveKey(arr[0].menuId.toString())
        }
        // setPanes([...arr])
        dispatch(setPanes([...arr]))
        // 如果当前删除的是最后一个，则要跳转路由到剩余数组的最后一个
        if(index === currentIndex){
            history.push(panes[panes.length-1].menuPath)
        }
        // this[action](targetKey)
    }

    const onTabClick=(key: string, event: any)=>{
        if(key == 'dashboard'){
            history.push('/dashboard')
            return
        }
        const targetItem = panes.filter((item:any)=> item.menuId == key)
        let mItem:any = matchPath(pathname, {path: targetItem ? targetItem[0].menuPath :'', exact: true})
         // 判断是否已经存在
        if((mItem && mItem.path ==pathname) || (targetItem[0].menuPath == pathname)) return
        history.push({
            pathname: targetItem[0].menuPath,
            state:{
                refresh: true   
            }
        })
    } 
    
    useEffect(()=>{
        // const a:any = matchPath(location.pathname, {path: '/soldierManage/preferential/detail/:id', exact: true})
        if(pathname ==='/dashboard'){
            setActiveKey(panes[0].menuId.toString())
            return
        }
        let timer = setTimeout(()=>{
            const menu = store.getState().userReducer.menu
            const target = menu.filter((item:any)=> item.menuPath === pathname )
            if(target.length>0){
                // setPanes([...panes, ...target])
                dispatch(setPanes([...panes, ...target]))
                setActiveKey(target[0].menuId.toString())
            }
        }, 200)
        return ()=>  clearTimeout(timer)
    }, [])

    useEffect(()=>{
        // console.log('pathname', pathname)
        // console.log('panes', panes)
        // console.log('routerList', routerList)
        // 判断是否已经存在panes里面，是就不添加
        const item = panes.findIndex((item:any) => {
            return item.menuPath === pathname
        })
        const target:any[] = routerList.filter((item:any)=> {
            return matchPath(pathname, {path: item.menuPath, exact: true}) || (item.menuPath === pathname)
        })

        // console.log('target', target.length>0 ?target[0].menuPath:'')

        if(target.length>0){
            // 是否动态参数
            let mItem:any = matchPath(pathname, {path: target ? target[0].menuPath :'', exact: true})
            let obj = {
                menuId: target[0].menuId,
                menuPath: pathname,
                title: target[0].title
            }
            // 不存在panes里，则添加
            if(item == -1){
                // setPanes([...panes, mItem? obj: target[0]])
                dispatch(setPanes([...panes, mItem? obj: target[0]]))
            }
            setActiveKey(target[0].menuId.toString())
        }
    }, [pathname])
      
    const onClickHover=(val:any)=>{
        let panesArr = panes
        if(pathname == '/dashboard') return
        if(val.key==='1'){
            // 找出当前的索引，删除
            const index = panes.findIndex((item:any)=> item.menuPath === pathname )
            const arr = panes
            arr.splice(index, 1)
            // setPanes([...arr])
            dispatch(setPanes([...arr]))
        }else if(val.key==='2'){
            // 找到当前的item，拼接首页
            const target = panes.filter((item:any)=> item.menuPath === pathname )
            const arr=[panes[0], target[0]]
            // setPanes([...arr])
            dispatch(setPanes([...arr]))
        }else{
            // setPanes([panesArr[0]]) 
            dispatch(setPanes([panesArr[0]]))
            setActiveKey(panesArr[0].menuId.toString())
            history.push(panesArr[0].menuPath)
        }

    }

    const menu = (
        <Menu onClick={onClickHover}>
            <Menu.Item key="1">关闭当前标签页</Menu.Item>
            <Menu.Item key="2">关闭其他标签页</Menu.Item>
            <Menu.Item key="3">关闭全部标签页</Menu.Item>
        </Menu>
    )

    const operations = (
        <Dropdown overlay={menu} arrow>
          <Button type="link">
            <DownOutlined />
          </Button>
        </Dropdown>
    )
    
    return (
        <div className="tabs">
           <Tabs
                type="editable-card"
                onEdit={onEdit}
                hideAdd
                onChange={onChange}
                onTabClick={onTabClick}
                activeKey={activeKey}
                tabBarExtraContent={operations}
                tabBarStyle={{background:'#fff'}}
                tabPosition="top"
                tabBarGutter={-1}
            >
                {panes.map((pane:PaneProps) => (
                  pane.title? <TabPane tab={pane.title ? pane.title : ''} key={pane.menuId} closable={(pane.closable && pane.closable === '0')? false : true }>
                    </TabPane>:''
                ))}
            </Tabs>
        </div>
    )
}

export default TabPage
