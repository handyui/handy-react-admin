import React, { FC, useEffect } from 'react'
import { Route, Redirect, useLocation} from 'react-router-dom'
import {ACCESS_TOKEN} from '@/store/mutation-types'
import {createStorage} from '@/utils/storage'
import { useDispatch, useStore } from 'react-redux'
import { SetMenu } from '@/store/actions'
import LoginPage from '@/pages/login/index'
import NotFoundPage from '@/pages/error/404'
import Layout from '@/layout/index'
import CacheRoute,{ CacheSwitch } from 'react-router-cache-route'

import {menuList} from './routers'

const Storage = createStorage()

const RouterAuth:FC = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const token = Storage.get(ACCESS_TOKEN)
    const store = useStore()
    const  {pathname} = location
    useEffect(() => {
      console.log('pathname', pathname)
      const menu = store.getState().userReducer.menu
      if(pathname !== '/login'&& menu.length===0){
        dispatch(SetMenu())
      }
   },[])

    // 动态生成路由
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const generateRoute = (list:any) =>{
      return list.map((item:any, index:number)=>{
        // if(item.menuPath.indexOf("add")!==-1 ||item.menuPath.indexOf("edit")!==-1){
        //   return  <CacheRoute exact key={`${index}_${item.menuId}`} path={item.menuPath} component={item.component} />
        // } 
        // if(item.menuPath.indexOf(":") > 0){
        //   let url = item.menuPath.split("/:")[0]
        //   console.log('url', url)
        //   return <CacheRoute exact key={`${index}_${item.menuId}`} path={item.menuPath} component={ loadable(() => import(`@/pages${url}`))}/>
        // }
        // else{
          // return getCacheRouter()
          // if(item.component) {
          //   return <CacheRoute exact key={`${index}_${item.menuId}`} path={item.menuPath} component={loadPageByRoutes(item.menuPath)}/>
          // }
          // // const aa = loadable(() => import(`@/pages${item.menuPath}`))
          // return ''
          // return <Route exact key={`${index}_${item.menuId}`} path={item.menuPath} component={ loadable(() => import(`@/pages${item.menuPath}`))}/>
        // }
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
          // return <Layout>{generateRoute(routerList)}</Layout>
          return  <Layout>
            {/* {generateRoute(routerList)} */}
            {/* <CacheRoute exact key='/dashboard' path='/dashboard' component={Dashboard}/>
            <CacheRoute exact key='/system/account' path='/system/account' component={Account}/>
            <CacheRoute exact key='/system/role' path='/system/role' component={Role}/>
            <CacheRoute exact key='/system/organization' path='/system/organization' component={Organization}/>
            <CacheRoute exact key='/system/oper' path='/system/oper' component={Oper}/>,
            <CacheRoute exact key='/system/loginLog' path='/system/loginLog' component={LoginLog}/>
            <CacheRoute exact key='/system/access' path='/system/access' component={Access}/>
            <CacheRoute exact key='/system/dict' path='/system/dict' component={Dict}/>
            <CacheRoute exact key='/soldierManage/preferential' path='/soldierManage/preferential' component={Preferential}/>
            <CacheRoute exact key='/soldierManage/preferential/add' path='/soldierManage/preferential/add' component={PreferentialAdd}/>
            <CacheRoute exact key='/soldierManage/preferential/edit' path='/soldierManage/preferential/edit/:id' component={PreferentialEdit}/>
            <Route exact key='/soldierManage/preferential/detail' path='/soldierManage/preferential/detail/:id' component={PreferentialDetail}/>
            <Route exact key='/soldierManage/preferential/audit' path='/soldierManage/preferential/audit/:id' component={PreferentialAudit}/>
            <CacheRoute exact key='/placeInfo' path='/placeInfo' component={PlaceInfo}/>
            <CacheRoute exact key='/placeInfo/add' path='/placeInfo/add' component={PlaceInfoAdd}/>
            <CacheRoute exact key='/placeInfo/edit' path='/placeInfo/edit/:id' component={PlaceInfoEdit}/>
            <Route exact key='/placeInfo/detail' path='/placeInfo/detail/:id' component={PlaceInfoDetail}/> */}
            {
              menuList.map((item:any)=>{
                return item.noCache? <Route exact key={item.menuPath} path={item.menuPath} component={item.component}/> : 
                  <CacheRoute exact key={item.menuPath} path={item.menuPath} component={item.component}/>
              })
            }
          </Layout>
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
            <Route path="/" render={()=> renderRouter()}/> 
        </CacheSwitch>
       </>
    )
}

export default RouterAuth