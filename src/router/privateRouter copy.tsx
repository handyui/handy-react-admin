import React, { FC, useEffect, useState } from 'react'
import { Switch, Route, Redirect, useLocation, matchPath} from 'react-router-dom'
import {ACCESS_TOKEN} from '@/store/mutation-types'
import {createStorage} from '@/utils/storage'
import loadable from '@/utils/loadable'
import { useDispatch, useStore, useSelector } from 'react-redux'
import { RootState } from '@/store/types'
import { SetMenu } from '@/store/actions'
import LoginPage from '@/pages/login/index'
import NotFoundPage from '@/pages/error/404'
import Layout from '@/layout/index'
import CacheRoute,{ CacheSwitch } from 'react-router-cache-route'
// import TestPage from '../pages/test'
import preAddPage from '../pages/soldierManage/preferential/add'
import plaAddPage from '../pages/placeInfo/add'
import preEditPage from '../pages/soldierManage/preferential/edit'
import plaEditPage from '../pages/placeInfo/edit'


const Storage = createStorage()

// interface RouterAuthProps{
//   config:any
// }

// const allowList = ['/login', '/404']

export const menuList = [
  // {
  //   "menuId": -2,
  //   "parentId": 0,
  //   "menuType": "menu",
  //   "menuPath": "/test",
  //   "component": TestPage,
  //   "redirect": null,
  //   "menuCode": "login",
  //   "title": "测试页",
  //   "icon": null,
  //   "priority": 0,
  //   "version": 1,
  //   "hidden": 0  // 隐藏 否0 是1
  // },
  {
    "menuId": -1,
    "parentId": 0,
    "menuType": "catalog",
    "menuPath": "/dashboard",
    "component": null,
    "redirect": null,
    "menuCode": "dashboard",
    "title": "首页",
    "icon": null,
    "priority": 0,
    "version": 1
  },
  {
    "menuId": 155,
    "parentId": 0,
    "menuType": "menu",
    "menuPath": "/soldierManage/preferential/add",
    "component": preAddPage,
    "redirect": null,
    "menuCode": "login",
    "title": "新增优抚",
    "icon": null,
    "priority": 0,
    "version": 1,
    "hidden": 1
  },
  {
    "menuId": 156,
    "parentId": 0,
    "menuType": "menu",
    "menuPath": "/soldierManage/preferential/edit/:id",
    "component": preEditPage,
    "redirect": null,
    "menuCode": "login",
    "title": "优抚编辑页",
    "icon": null,
    "priority": 0,
    "version": 1,
    "hidden": 1
  },
  {
    "menuId": 157,
    "parentId": 0,
    "menuType": "menu",
    "menuPath": "/soldierManage/preferential/detail/:id",
    "component": null,
    "redirect": null,
    "menuCode": "login",
    "title": "优抚详情页",
    "icon": null,
    "priority": 0,
    "version": 1,
    "hidden": 1  // 隐藏 否0 是1
  },
  {
    "menuId": 158,
    "parentId": 0,
    "menuType": "menu",
    "menuPath": "/soldierManage/preferential/audit/:id",
    "component": null,
    "redirect": null,
    "menuCode": "login",
    "title": "优抚审核页",
    "icon": null,
    "priority": 0,
    "version": 1,
    "hidden": 1  // 隐藏 否0 是1
  },
  {
    "menuId": 159,
    "parentId": 0,
    "menuType": "menu",
    "menuPath": "/soldierManage/placeInfo/add",
    "component": plaAddPage,
    "redirect": null,
    "menuCode": "login",
    "title": "新增安置",
    "icon": null,
    "priority": 0,
    "version": 1,
    "hidden": 1  // 隐藏 否0 是1
  },
  {
    "menuId": 160,
    "parentId": 0,
    "menuType": "menu",
    "menuPath": "/soldierManage/placeInfo/edit/:id",
    "component": plaEditPage,
    "redirect": null,
    "menuCode": "login",
    "title": "安置编辑页",
    "icon": null,
    "priority": 0,
    "version": 1,
    "hidden": 1  // 隐藏 否0 是1
  },
  {
    "menuId": 161,
    "parentId": 0,
    "menuType": "menu",
    "menuPath": "/soldierManage/placeInfo/detail/:id",
    "component": null,
    "redirect": null,
    "menuCode": "login",
    "title": "安置详情页",
    "icon": null,
    "priority": 0,
    "version": 1,
    "hidden": 1  // 隐藏 否0 是1
  },
]

const RouterAuth:FC = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    // const [routerList, setRouterList] = useState(menuList)
    const token = Storage.get(ACCESS_TOKEN)
    const store = useStore()
    const routerList = useSelector((state:RootState) => [...(state.userReducer.menu ?state.userReducer.menu:[]), ...menuList])
    const  {pathname} = location
    useEffect(() => {
      const menu = store.getState().userReducer.menu
      if(menu.length===0){
        dispatch(SetMenu())
      }
   },[])

    // 动态生成路由
    const generateRoute = (list:any) =>{
      return list.map((item:any, index:number)=>{
        if(item.menuPath.indexOf("add")!==-1 ||item.menuPath.indexOf("edit")!==-1){
          return  <CacheRoute exact key={`${index}_${item.menuId}`} path={item.menuPath} component={item.component} />
        } 
        if(item.menuPath.indexOf(":") > 0){
          let url = item.menuPath.split("/:")[0]
          return <CacheRoute exact key={`${index}_${item.menuId}`} path={item.menuPath} component={ loadable(() => import(`@/pages${url}`))}/>
        }else{
          return <CacheRoute exact key={`${index}_${item.menuId}`} path={item.menuPath} component={ loadable(() => import(`@/pages${item.menuPath}`))}/>
        }
      })
    }

    const renderRouter=()=>{
      // const a = matchPath(location.pathname, {path: '/soldierManage/placeInfo/test', exact: true})
      // console.log(a)
      // 如果是登录状态
      if(!!token){
        // 如果进入登录页面，则直接重定向至首页
        if(pathname === '/login' || pathname === '/'){
          return <Redirect to='/dashboard' />
        }else{ 
          // 请求路由，且动态生成路由表，跳到目标路由
          return <Layout>{generateRoute(routerList)}</Layout>
        }
      }else{ //非登录状态，如果是白名单直接进入，否则跳转到登录页
        // if(allowList.includes(pathname as string)){
        //   return <Redirect to={pathname} />
        // }else{
          return  <Redirect to="/login"/>
        // }
      }
    }

    return (
      <>
        <CacheSwitch>
            <Route path="/" exact render={()=><Redirect to="/login"/>} />
            <Route path="/404" component={NotFoundPage}/>
            {!token?<Route path="/login" component={LoginPage}/>:''}  
            {/* <Route path="/" render={()=> renderRouter()}/>  */}
            <Route path="/" render={()=> {
              return <Layout>
                <CacheRoute exact path="/soldierManage/preferential" component={ loadable(() => import(`@/pages/soldierManage/preferential/index`))}/>
              </Layout> 
            }}/> 

        </CacheSwitch>
       </>
    )
}

export default RouterAuth