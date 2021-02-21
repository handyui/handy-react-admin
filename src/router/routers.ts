// import CacheRoute,{ CacheSwitch, clearCache } from 'react-router-cache-route'
import loadable from '@/utils/loadable'

// export const [, Account, Role, Organization, Oper, LoginLog, Access, Dict, Preferential, PreferentialAdd, 
//   PreferentialEdit, PreferentialDetail, PreferentialAudit,  PlaceInfo, PlaceInfoAdd, PlaceInfoEdit, PlaceInfoDetail] = [
//     () => import('@/pages/system/account'),
//     () => import('@/pages/system/role'),
//     () => import('@/pages/system/organization'),
//     () => import('@/pages/system/oper'),
//     () => import('@/pages/system/loginLog'),
//     () => import('@/pages/system/access'),
//     () => import('@/pages/system/dict'),
//     () => import('@/pages/soldierManage/preferential'),
//     () => import('@/pages/soldierManage/preferential/add'),
//     () => import('@/pages/soldierManage/preferential/edit'),
//     () => import('@/pages/soldierManage/preferential/detail'),
//     () => import('@/pages/soldierManage/preferential/audit'),
//     () => import('@/pages/placeInfo'),
//     () => import('@/pages/placeInfo/add'),
//     () => import('@/pages/placeInfo/edit'),
//     () => import('@/pages/placeInfo/detail')
//   ].map((item) => {
//     return loadable(item)
// });

export const menuList = [
  // {
  //   menuId: -2,
  //   "parentId": 0,
  //   "menuType": "menu",
  //   menuPath: "/test",
  //   "component": TestPage,
  //   "redirect": null,
  //   "menuCode": "login",
  //   title: "测试页",
  //   "icon": null,
  //   "priority": 0,
  //   "version": 1,
  //   hidden: 0  // 隐藏 否0 是1
  // },
  {
    menuId: -1,
    parentId: 0,
    menuType: "catalog",
    menuPath: "/dashboard",
    redirect: null,
    menuCode: "dashboard",
    title: "首页",
    icon: null,
    priority: 0,
    version: 1,
    hidden: 0,  // 隐藏 否0 是1
    noCache: true,
    component: loadable(() => import('@/pages/dashboard'))
  },
  { menuId: 2, menuPath: "/system/account", title: "用户管理", hidden: 1, component: loadable(() => import('@/pages/system/account'))},
  { menuId: 3, menuPath: "/system/role", title: "角色管理", hidden: 1, component: loadable(() => import('@/pages/system/role'))},
  { menuId: 4, menuPath: "/system/organization", title: "单位管理", hidden: 1, component: loadable(() => import('@/pages/system/organization'))},
  { menuId: 5, menuPath: "/system/oper", title: "业务日志", hidden: 1, component: loadable(() => import('@/pages/system/oper'))},
  { menuId: 6, menuPath: "/system/loginLog",title: "登录日志",hidden: 1,component: loadable(() => import('@/pages/system/loginLog'))},
  { menuId: 12, menuPath: "/system/access",title: "菜单管理",hidden: 1,component: loadable(() => import('@/pages/system/access'))},
  { menuId: 13, menuPath: "/system/dict",title: "字典管理",hidden: 1,component: loadable(() => import('@/pages/system/dict'))},
]
