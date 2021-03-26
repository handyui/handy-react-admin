const router = require('@koa/router')()
const send = require('koa-send')
const path = require('path')
const fs = require('fs')
router.prefix('/api')

// test
router.get('/sys/test', async (ctx, next) => {
    // let response = ctx.request.body
    ctx.body = { 'success': 'true', 'data': {name:"111",age:"222"} }
})

// 登录
router.post('/sys/login',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "成功",
        "result": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6IjAwMSIsInJvbGVJZCI6IjEsMiIsInVzZXJOYW1lIjoic3R5bGVmZW5nIiwiZXhwIjoxNjA3MDI5NDU1LCJ1c2VySWQiOiIxIiwiYWNjb3VudCI6ImFkbWluIn0.QtDlKY41qfw74xhOF8HvVEs-f98uzwvn380XgCNjsVA",
        "total": null
    }
})

// 退出
router.post('/sys/loginOut',async(ctx, next)=>{
    ctx.body = {
        "data": null, 
        "code": 200, 
        "message": "请求成功"
    }
})


// 查询所有菜单
router.post('/menu/getMenulist',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "操作成功",
    "result": [
      {
        "createTime": "2020-12-03 14:00:54",
        "createUser": "1",
        "updateTime": "2020-12-15 11:22:50",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 1,
        "parentId": 0,
        "menuType": "catalog",
        "menuPath": "system",
        "component": null,
        "redirect": null,
        "menuCode": "sys",
        "title": "系统管理",
        "icon": null,
        "priority": 0
      },
      {
        "createTime": "2020-12-03 14:04:37",
        "createUser": "1",
        "updateTime": "2020-12-15 11:23:12",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 2,
        "parentId": 1,
        "menuType": "menu",
        "menuPath": "system/account",
        "component": null,
        "redirect": null,
        "menuCode": "userManage",
        "title": "用户管理",
        "icon": null,
        "priority": 1
      },
      {
        "createTime": "2020-12-03 14:05:09",
        "createUser": "1",
        "updateTime": "2020-12-15 11:26:14",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 3,
        "parentId": 1,
        "menuType": "menu",
        "menuPath": "system/role",
        "component": null,
        "redirect": null,
        "menuCode": "roleManage",
        "title": "角色管理",
        "icon": null,
        "priority": 2
      },
      {
        "createTime": "2020-12-03 14:05:58",
        "createUser": "1",
        "updateTime": "2020-12-15 11:27:25",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 4,
        "parentId": 1,
        "menuType": "menu",
        "menuPath": "system/organization",
        "component": null,
        "redirect": null,
        "menuCode": "organizationManage",
        "title": "单位管理",
        "icon": null,
        "priority": 3
      },
      {
        "createTime": "2020-12-03 14:06:38",
        "createUser": "1",
        "updateTime": "2020-12-15 11:21:47",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 5,
        "parentId": 1,
        "menuType": "menu",
        "menuPath": "monitor/oper",
        "component": null,
        "redirect": null,
        "menuCode": "logBusiness",
        "title": "业务日志",
        "icon": null,
        "priority": 4
      },
      {
        "createTime": "2020-12-03 14:06:55",
        "createUser": "1",
        "updateTime": "2020-12-15 11:26:29",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 6,
        "parentId": 1,
        "menuType": "menu",
        "menuPath": "monitor/loginLog",
        "component": null,
        "redirect": null,
        "menuCode": "logLogin",
        "title": "登录日志",
        "icon": null,
        "priority": 5
      },
      {
        "createTime": "2020-12-03 14:22:28",
        "createUser": "1",
        "updateTime": null,
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 7,
        "parentId": 0,
        "menuType": "catalog",
        "menuPath": "/todoBusiness",
        "component": "",
        "redirect": "",
        "menuCode": "todoBusiness",
        "title": "待办业务",
        "icon": "",
        "priority": 1
      },
      {
        "createTime": "2020-12-03 14:27:21",
        "createUser": "1",
        "updateTime": null,
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 8,
        "parentId": 7,
        "menuType": "menu",
        "menuPath": "/toApproveDistrict",
        "component": "",
        "redirect": "",
        "menuCode": "districtApprove",
        "title": "待审核业务",
        "icon": "",
        "priority": 1
      },
      {
        "createTime": "2020-12-03 14:28:17",
        "createUser": "1",
        "updateTime": null,
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 9,
        "parentId": 7,
        "menuType": "menu",
        "menuPath": "/toApproveStreet",
        "component": "",
        "redirect": "",
        "menuCode": "streetApprove",
        "title": "待审批业务",
        "icon": "",
        "priority": 2
      },
      {
        "createTime": "2020-12-03 14:28:57",
        "createUser": "1",
        "updateTime": "2020-12-10 10:16:44",
        "updateUser": "1",
        "isDisable": "0",
        "version": 1,
        "menuId": 10,
        "parentId": 7,
        "menuType": "menu",
        "menuPath": "/dealedBusiness",
        "component": "",
        "redirect": "",
        "menuCode": "dealedBusiness",
        "title": "已处理记录",
        "icon": "",
        "priority": 3
      },
      {
        "createTime": "2020-12-10 10:18:17",
        "createUser": "1",
        "updateTime": "2020-12-10 10:19:03",
        "updateUser": "1",
        "isDisable": "0",
        "version": 1,
        "menuId": 11,
        "parentId": 0,
        "menuType": "catalog",
        "menuPath": "/soldierManage",
        "component": null,
        "redirect": null,
        "menuCode": "soldierManage",
        "title": "军人信息管理",
        "icon": null,
        "priority": 3
      },
      {
        "createTime": "2020-12-03 14:05:58",
        "createUser": "1",
        "updateTime": "2020-12-15 11:25:54",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 12,
        "parentId": 1,
        "menuType": "menu",
        "menuPath": "system/access",
        "component": null,
        "redirect": null,
        "menuCode": "menu",
        "title": "菜单管理",
        "icon": null,
        "priority": 6
      }
    ],
    "total": null
  }
    // ctx.body ={
    //     "result": [
    //       {
    //           "menuId": 1, 
    //           "title": "测试模块", 
    //           "menuType": "catalog",
    //           "parentId": -1, 
    //           "priority": 1
    //       }, 
    //       {
    //         "menuId": 2, 
    //         "title": "测试1", 
    //         "menuType": "menu",
    //         "parentId": 1, 
    //         "priority": 1
    //       }, 
    //       {
    //         "menuId": 3, 
    //         "title": "测试02", 
    //         "menuType": "menu",
    //         "parentId": 1, 
    //         "priority": 2
    //       }, 
    //       {
    //         "menuId": 4, 
    //         "title": "系统管理", 
    //         "menuType": "catalog",
    //         "parentId": -1, 
    //         "priority": 1
    //        }, 
    //       {
    //         "menuId": 5, 
    //         "title": "账号管理", 
    //         "menuType": "menu",
    //         "parentId": 4, 
    //         "priority": 2
    //       }, 
    //       {
    //         "menuId": 6, 
    //         "title": "角色管理", 
    //         "menuType": "menu",
    //         "parentId": 4, 
    //         "priority": 2
    //       }, 
    //       {
    //         "menuId": 7, 
    //         "title": "菜单管理", 
    //         "menuType": "menu",
    //         "parentId": 4, 
    //         "priority": 3
    //       }, 
    //         // {
    //         //     "id": 18, 
    //         //     "createdAt": "2020-11-16T03:24:06.558Z", 
    //         //     "moduleName": "测试模块", 
    //         //     "actionName": "", 
    //         //     "moduleId": -1, 
    //         //     "sort": 1
    //         // }, 
    //         // {
    //         //     "id": 19, 
    //         //     "createdAt": "2020-11-16T03:25:08.617Z", 
    //         //     "moduleName": "", 
    //         //     "actionName": "测试1", 
    //         //     "moduleId": 18, 
    //         //     "sort": 1
    //         // }, 
    //         // {
    //         //     "id": 20, 
    //         //     "createdAt": "2020-11-16T03:28:40.795Z", 
    //         //     "moduleName": "", 
    //         //     "actionName": "测试02", 
    //         //     "moduleId": 18, 
    //         //     "sort": 1
    //         // }, 
    //         // {
    //         //     "id": 31, 
    //         //     "createdAt": "2020-12-02T08:42:39.980Z", 
    //         //     "moduleName": "", 
    //         //     "actionName": "123", 
    //         //     "moduleId": 1, 
    //         //     "sort": 1
    //         // }, 
    //         // {
    //         //     "id": 30, 
    //         //     "createdAt": "2020-12-02T03:24:16.341Z", 
    //         //     "moduleName": "", 
    //         //     "actionName": "牛皮", 
    //         //     "moduleId": 18, 
    //         //     "sort": 2
    //         // }, 
    //         // {
    //         //     "id": 2, 
    //         //     "createdAt": "2020-11-02T15:16:08.907Z", 
    //         //     "moduleName": "", 
    //         //     "actionName": "账号管理", 
    //         //     "moduleId": 1, 
    //         //     "sort": 3
    //         // }, 
    //         // {
    //         //     "id": 3, 
    //         //     "createdAt": "2020-11-02T15:16:08.915Z", 
    //         //     "moduleName": "", 
    //         //     "actionName": "角色管理", 
    //         //     "moduleId": 1, 
    //         //     "sort": 3
    //         // }, 
    //         // {
    //         //     "id": 4, 
    //         //     "createdAt": "2020-11-02T15:16:08.923Z", 
    //         //     "moduleName": "", 
    //         //     "actionName": "资源管理", 
    //         //     "moduleId": 1, 
    //         //     "sort": 5
    //         // }, 
    //         // {
    //         //     "id": 1, 
    //         //     "createdAt": "2020-11-02T15:16:08.891Z", 
    //         //     "moduleName": "系统管理", 
    //         //     "actionName": "", 
    //         //     "moduleId": -1, 
    //         //     "sort": 6
    //         // }, 
    //         // {
    //         //     "id": 5, 
    //         //     "createdAt": "2020-11-02T15:16:08.933Z", 
    //         //     "moduleName": "", 
    //         //     "actionName": "字典管理", 
    //         //     "moduleId": 1, 
    //         //     "sort": 6
    //         // }
    //     ], 
    //     "code": 200, 
    //     "message": "请求成功"
    // }
})


// 获取权限
router.post('/menu/queryByRoleIds',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "操作成功",
    "result": [
      {
        "createTime": "2020-12-03 14:00:54",
        "createUser": "1",
        "updateTime": "2020-12-15 11:22:50",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 1,
        "parentId": 0,
        "menuType": "catalog",
        "menuPath": "system",
        "component": null,
        "redirect": null,
        "menuCode": "sys",
        "title": "系统管理",
        "icon": null,
        "priority": 0
      },
      {
        "createTime": "2020-12-03 14:04:37",
        "createUser": "1",
        "updateTime": "2020-12-15 11:23:12",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 2,
        "parentId": 1,
        "menuType": "menu",
        "menuPath": "system/account",
        "component": null,
        "redirect": null,
        "menuCode": "userManage",
        "title": "用户管理",
        "icon": null,
        "priority": 1
      },
      {
        "createTime": "2020-12-03 14:05:09",
        "createUser": "1",
        "updateTime": "2020-12-15 11:26:14",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 3,
        "parentId": 1,
        "menuType": "menu",
        "menuPath": "system/role",
        "component": null,
        "redirect": null,
        "menuCode": "roleManage",
        "title": "角色管理",
        "icon": null,
        "priority": 2
      },
      {
        "createTime": "2020-12-03 14:05:58",
        "createUser": "1",
        "updateTime": "2020-12-15 11:27:25",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 4,
        "parentId": 1,
        "menuType": "menu",
        "menuPath": "system/organization",
        "component": null,
        "redirect": null,
        "menuCode": "organizationManage",
        "title": "单位管理",
        "icon": null,
        "priority": 3
      },
      {
        "createTime": "2020-12-03 14:06:38",
        "createUser": "1",
        "updateTime": "2020-12-15 11:21:47",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 5,
        "parentId": 1,
        "menuType": "menu",
        "menuPath": "monitor/oper",
        "component": null,
        "redirect": null,
        "menuCode": "logBusiness",
        "title": "业务日志",
        "icon": null,
        "priority": 4
      },
      {
        "createTime": "2020-12-03 14:06:55",
        "createUser": "1",
        "updateTime": "2020-12-15 11:26:29",
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 6,
        "parentId": 1,
        "menuType": "menu",
        "menuPath": "monitor/loginLog",
        "component": null,
        "redirect": null,
        "menuCode": "logLogin",
        "title": "登录日志",
        "icon": null,
        "priority": 5
      },
      {
        "createTime": "2020-12-03 14:22:28",
        "createUser": "1",
        "updateTime": null,
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 7,
        "parentId": 0,
        "menuType": "catalog",
        "menuPath": "/todoBusiness",
        "component": "",
        "redirect": "",
        "menuCode": "todoBusiness",
        "title": "待办业务",
        "icon": "",
        "priority": 1
      },
      {
        "createTime": "2020-12-03 14:27:21",
        "createUser": "1",
        "updateTime": null,
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 8,
        "parentId": 7,
        "menuType": "menu",
        "menuPath": "/toApproveDistrict",
        "component": "",
        "redirect": "",
        "menuCode": "districtApprove",
        "title": "待审核业务",
        "icon": "",
        "priority": 1
      },
      {
        "createTime": "2020-12-03 14:28:17",
        "createUser": "1",
        "updateTime": null,
        "updateUser": null,
        "isDisable": "0",
        "version": 1,
        "menuId": 9,
        "parentId": 7,
        "menuType": "menu",
        "menuPath": "/toApproveStreet",
        "component": "",
        "redirect": "",
        "menuCode": "streetApprove",
        "title": "待审批业务",
        "icon": "",
        "priority": 2
      },
      {
        "createTime": "2020-12-03 14:28:57",
        "createUser": "1",
        "updateTime": "2020-12-10 10:16:44",
        "updateUser": "1",
        "isDisable": "0",
        "version": 1,
        "menuId": 10,
        "parentId": 7,
        "menuType": "menu",
        "menuPath": "/dealedBusiness",
        "component": "",
        "redirect": "",
        "menuCode": "dealedBusiness",
        "title": "已处理记录",
        "icon": "",
        "priority": 3
      }
    ],
    "total": null
  }
    // ctx.body = {
    //     "result": [
    //         {
    //             "id": 147, 
    //             "accessId": 18
    //         }, 
    //         {
    //             "id": 148, 
    //             "accessId": 19
    //         }, 
    //         {
    //             "id": 149, 
    //             "accessId": 20
    //         }
    //     ], 
    //     "code": 200, 
    //     "message": "请求成功"
    // }
})



/**-------------菜单------------ */

// 新增菜单
router.post('/menu/add',async(ctx, next)=>{
    ctx.body ={
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 修改菜单
router.post('/menu/update',async(ctx, next)=>{
    ctx.body ={
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 删除菜单
router.get('/menu/delete/:menuId',async(ctx, next)=>{
    ctx.body ={
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 查询菜单详情
router.get('/menu/detail/:menuId',async(ctx, next)=>{
    ctx.body ={
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 菜单列表
router.post('/menu/queryPage', async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "操作成功",
        "result": {
          "records": [
            {
              "createTime": "2020-12-03 14:00:54",
              "createUser": "1",
              "updateTime": null,
              "updateUser": null,
              "isDisable": "0",
              "version": 1,
              "menuId": 1,
              "parentId": 0,
              "menuLevel": 1,
              "menuType": "catalog",
              "menuPath": "/sys",
              "component": null,
              "redirect": null,
              "name": "sys",
              "title": "系统管理",
              "icon": 'icon-shezhi',
              "noCache": "0",
              "hidden": "0",
              "status": "Y",
              "priority": 0,
            //   "children":true
            },
          ],
          "total": 2,
          "size": 5,
          "current": 1,
          "orders": [],
          "optimizeCountSql": true,
          "hitCount": false,
          "countId": null,
          "maxLimit": null,
          "searchCount": true,
          "pages": 1
        },
        "total": null
    }
})

// 查询子菜单列表
router.get('/menu/queryMenu', async(ctx, next)=>{
  ctx.body = {
    "code": 200, 
    "message": "操作成功", 
    "result": [
        {
            "createTime": "2020-12-03 14:04:37", 
            "createUser": "1", 
            "updateTime": "2020-12-21 15:45:09", 
            "updateUser": null, 
            "isDisable": "0", 
            "version": 1, 
            "menuId": 2, 
            "parentId": 1, 
            "menuType": "menu", 
            "menuPath": "/system/account", 
            "component": null, 
            "redirect": null, 
            "menuCode": "userManage", 
            "title": "用户管理", 
            "icon": null, 
            "priority": 1
        }, 
        {
            "createTime": "2020-12-03 14:05:09", 
            "createUser": "1", 
            "updateTime": "2020-12-21 15:45:13", 
            "updateUser": null, 
            "isDisable": "0", 
            "version": 1, 
            "menuId": 3, 
            "parentId": 1, 
            "menuType": "menu", 
            "menuPath": "/system/role", 
            "component": null, 
            "redirect": null, 
            "menuCode": "roleManage", 
            "title": "角色管理", 
            "icon": null, 
            "priority": 2
        }, 
        {
            "createTime": "2020-12-03 14:05:58", 
            "createUser": "1", 
            "updateTime": "2020-12-21 15:45:18", 
            "updateUser": null, 
            "isDisable": "0", 
            "version": 1, 
            "menuId": 4, 
            "parentId": 1, 
            "menuType": "menu", 
            "menuPath": "/system/organization", 
            "component": null, 
            "redirect": null, 
            "menuCode": "organizationManage", 
            "title": "单位管理", 
            "icon": null, 
            "priority": 3
        }, 
        {
            "createTime": "2020-12-03 14:06:38", 
            "createUser": "1", 
            "updateTime": "2020-12-21 15:45:28", 
            "updateUser": null, 
            "isDisable": "0", 
            "version": 1, 
            "menuId": 5, 
            "parentId": 1, 
            "menuType": "menu", 
            "menuPath": "/monitor/oper", 
            "component": null, 
            "redirect": null, 
            "menuCode": "logBusiness", 
            "title": "业务日志", 
            "icon": null, 
            "priority": 4
        }, 
        {
            "createTime": "2020-12-03 14:06:55", 
            "createUser": "1", 
            "updateTime": "2020-12-21 15:45:34", 
            "updateUser": null, 
            "isDisable": "0", 
            "version": 1, 
            "menuId": 6, 
            "parentId": 1, 
            "menuType": "menu", 
            "menuPath": "/monitor/loginLog", 
            "component": null, 
            "redirect": null, 
            "menuCode": "logLogin", 
            "title": "登录日志", 
            "icon": null, 
            "priority": 5
        }, 
        {
            "createTime": "2020-12-03 14:05:58", 
            "createUser": "1", 
            "updateTime": "2020-12-21 15:45:37", 
            "updateUser": "1", 
            "isDisable": "0", 
            "version": 1, 
            "menuId": 12, 
            "parentId": 1, 
            "menuType": "menu", 
            "menuPath": "/system/access", 
            "component": null, 
            "redirect": null, 
            "menuCode": "menu", 
            "title": "菜单管理", 
            "icon": null, 
            "priority": 6
        }, 
        {
            "createTime": "2020-12-03 14:05:58", 
            "createUser": "1", 
            "updateTime": "2020-12-21 15:45:40", 
            "updateUser": null, 
            "isDisable": "0", 
            "version": 1, 
            "menuId": 13, 
            "parentId": 1, 
            "menuType": "menu", 
            "menuPath": "/system/dict", 
            "component": null, 
            "redirect": null, 
            "menuCode": "dict", 
            "title": "字典管理", 
            "icon": null, 
            "priority": 6
        }
    ], 
    "total": null
}
})

// 根据token查询用户菜单
router.get('/menu/query', async(ctx, next)=>{
    ctx.body={
        "code": 200,
        "message": "操作成功",
        "result": [
          {
            "menuId": 111,
            "parentId": 0,
            "menuType": "catalog",
            "menuPath": "/soldierManage/preferential",
            "component": null,
            "redirect": null,
            "menuCode": "sys",
            "title": "优抚管理2",
            "icon": "icon-zhuzhuangtu",
            "priority": 0,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 112,
            "parentId": 0,
            "menuType": "catalog",
            "menuPath": "/soldierManage/placeInfo",
            "component": null,
            "redirect": null,
            "menuCode": "sys",
            "title": "优抚管理",
            "icon": "icon-zhuzhuangtu",
            "priority": 0,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 1,
            "parentId": 0,
            "menuType": "catalog",
            "menuPath": "/system",
            "component": null,
            "redirect": null,
            "menuCode": "sys",
            "title": "系统管理",
            "icon": "icon-zhuzhuangtu",
            "priority": 0,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 2,
            "parentId": 1,
            "menuType": "menu",
            "menuPath": "/system/account",
            "component": null,
            "redirect": null,
            "menuCode": "userManage",
            "title": "用户管理",
            "icon": null,
            "priority": 1,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 3,
            "parentId": 1,
            "menuType": "menu",
            "menuPath": "/system/role",
            "component": null,
            "redirect": null,
            "menuCode": "roleManage",
            "title": "角色管理",
            "icon": null,
            "priority": 2,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 11,
            "parentId": 1,
            "menuType": "menu",
            "menuPath": "/system/access",
            "component": null,
            "redirect": null,
            "menuCode": "sys",
            "title": "菜单管理",
            "icon": null,
            "priority": 6,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 4,
            "parentId": 1,
            "menuType": "menu",
            "menuPath": "/system/organization",
            "component": null,
            "redirect": null,
            "menuCode": "organizationManage",
            "title": "单位管理",
            "icon": null,
            "priority": 3,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 5,
            "parentId": 1,
            "menuType": "menu",
            "menuPath": "/system/oper",
            "component": null,
            "redirect": null,
            "menuCode": "logBusiness",
            "title": "业务日志",
            "icon": null,
            "priority": 4,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 6,
            "parentId": 1,
            "menuType": "menu",
            "menuPath": "/system/loginLog",
            "component": null,
            "redirect": null,
            "menuCode": "logLogin",
            "title": "登录日志",
            "icon": null,
            "priority": 5,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 7,
            "parentId": 0,
            "menuType": "catalog",
            "menuPath": "/todoBusiness",
            "component": "",
            "redirect": "",
            "menuCode": "todoBusiness",
            "title": "待办业务",
            "icon": "icon-jisuan",
            "priority": 1,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 8,
            "parentId": 7,
            "menuType": "menu",
            "menuPath": "/toApproveDistrict",
            "component": "",
            "redirect": "",
            "menuCode": "districtApprove",
            "title": "待审核业务",
            "icon": "",
            "priority": 1,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 9,
            "parentId": 7,
            "menuType": "menu",
            "menuPath": "/toApproveStreet",
            "component": "",
            "redirect": "",
            "menuCode": "streetApprove",
            "title": "待审批业务",
            "icon": "",
            "priority": 2,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 10,
            "parentId": 7,
            "menuType": "menu",
            "menuPath": "/dealedBusiness",
            "component": "",
            "redirect": "",
            "menuCode": "dealedBusiness",
            "title": "",
            "icon": "",
            "priority": 3,
            "version": 1,
            "visible": 1
          },
          {
            "menuId": 12,
            "parentId": 1,
            "menuType": "menu",
            "menuPath": "/system/dict",
            "component": "",
            "redirect": "",
            "menuCode": "dict",
            "title": "字典管理",
            "icon": "",
            "priority": 3,
            "version": 1,
            "visible": 1
          }
        ],
        "total": null
      }
})


// 重置角色关联的菜单列表 
router.post('/roleMenu/reset', async(ctx, next)=>{
    ctx.body={
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})







/**-------------用户------------ */

// 请求菜单---(自己的)
router.post('/sys/menus',async(ctx, next)=>{
    ctx.body = {
        "data": [
            {
                "id": 18, 
                "url": "test", 
                "sort": 1, 
                "icon": "icon-BUG", 
                "parentId": -1, 
                "name": "测试模块"
            }, 
            {
                "id": 19, 
                "url": "test/01", 
                "sort": 1, 
                "icon": "icon-zujianshiyong", 
                "parentId": 18, 
                "name": "测试3"
            }, 
            {
                "id": 29, 
                "url": "test/03", 
                "sort": 1, 
                "icon": "icon-zujianshiyong", 
                "parentId": 19, 
                "name": "测试3----1"
            },
            {
                "id": 30, 
                "url": "test/04", 
                "sort": 1, 
                "icon": "icon-zujianshiyong", 
                "parentId": 19, 
                "name": "测试3----2"
            }, 
            {
                "id": 20, 
                "url": "test/02", 
                "sort": 1, 
                "icon": "icon-zujianshiyong", 
                "parentId": 18, 
                "name": "测试02"
            }, 
            {
                "id": 31, 
                "url": "test/05", 
                "sort": 1, 
                "icon": "icon-zujianshiyong", 
                "parentId": 20, 
                "name": "测试2----1"
            }, 
            {
                "id": 2, 
                "url": "system/account", 
                "sort": 3, 
                "icon": "icon-kehuguanli", 
                "parentId": 1, 
                "name": "账号管理"
            }, 
            {
                "id": 3, 
                "url": "/system/role", 
                "sort": 3, 
                "icon": "icon-yonghu", 
                "parentId": 1, 
                "name": "角色管理"
            }, 
            {
                "id": 4, 
                "url": "system/access", 
                "sort": 5, 
                "icon": "icon-ziyuan", 
                "parentId": 1, 
                "name": "菜单管理"
            }, 
            {
                "id": 1, 
                "url": "system", 
                "sort": 6, 
                "icon": "icon-shezhi", 
                "parentId": -1, 
                "name": "系统管理"
            }, 
            {
                "id": 5, 
                "url": "system/dict", 
                "sort": 6, 
                "icon": "icon-ziduanguanli", 
                "parentId": 1, 
                "name": "字典管理"
            }
        ], 
        "code": 200, 
        "message": "请求成功"
    }
})


// 根据token查询用户信息
router.get('/sysUser/getUserAndRole', async(ctx, next)=>{
  ctx.body = {
    "code": 200,
    "message": "成功",
    "result": {
      "userId": "1",
      "avatar": "1124606971782160385",
      "account": "admin",
      "name": "admin",
      "birthday": "2018-11-16 00:00:00",
      "sex": "M",
      "email": "sn93@qq.com",
      "phone": "18200000000",
      "organizationId": "001",
      "status": "y",
      "roleId": "1,2",
      "roles": [
        {
          "roleId": "1",
          "roleName": "超级管理员",
          "roleCode": "admin",
          "sort": 1,
          "version": 1,
          "createTime": "2020-12-16 11:30:36",
          "createUserName": null
        },
        {
          "roleId": "2",
          "roleName": "测试查看",
          "roleCode": "select",
          "sort": 2,
          "version": 1,
          "createTime": "2020-12-16 11:30:40",
          "createUserName": null
        }
      ],
      "menuList": [
        {
          "menuId": 2,
          "parentId": 1,
          "menuType": "menu",
          "menuPath": "/system/account",
          "component": "placeInfo",
          "redirect": null,
          "menuCode": "userManage",
          "title": "用户管理",
          "icon": null,
          "priority": 1,
          "version": 1
        },
        {
          "menuId": 3,
          "parentId": 1,
          "menuType": "menu",
          "menuPath": "/system/role",
          "component": "placeInfo",
          "redirect": null,
          "menuCode": "roleManage",
          "title": "角色管理",
          "icon": null,
          "priority": 2,
          "version": 1
        },
        {
          "menuId": 4,
          "parentId": 1,
          "menuType": "menu",
          "menuPath": "/system/organization",
          "component": "placeInfo",
          "redirect": null,
          "menuCode": "organizationManage",
          "title": "单位管理",
          "icon": null,
          "priority": 3,
          "version": 1
        },
        {
          "menuId": 5,
          "parentId": 1,
          "menuType": "menu",
          "menuPath": "/system/oper",
          "component": "placeInfo",
          "redirect": null,
          "menuCode": "logBusiness",
          "title": "业务日志",
          "icon": null,
          "priority": 4,
          "version": 1
        },
        {
          "menuId": 6,
          "parentId": 1,
          "menuType": "menu",
          "menuPath": "/system/loginLog",
          "component": "placeInfo",
          "redirect": null,
          "menuCode": "logLogin",
          "title": "登录日志",
          "icon": null,
          "priority": 5,
          "version": 1
        },
        {
          "menuId": 13,
          "parentId": 1,
          "menuType": "menu",
          "menuPath": "/system/dict",
          "component": "placeInfo",
          "redirect": null,
          "menuCode": "dict",
          "title": "字典管理",
          "icon": null,
          "priority": 6,
          "version": 1
        },
        {
          "menuId": 12,
          "parentId": 1,
          "menuType": "menu",
          "menuPath": "/system/access",
          "component": "placeInfo",
          "redirect": null,
          "menuCode": "menu",
          "title": "菜单管理",
          "icon": null,
          "priority": 7,
          "version": 1
        },
        {
          "menuId": 1,
          "parentId": 0,
          "menuType": "catalog",
          "menuPath": "/system",
          "component": "placeInfo",
          "redirect": null,
          "menuCode": "sys",
          "title": "系统管理",
          "icon": "icon-shezhi",
          "priority": 15,
          "version": 1
        }
      ],
      "organizationName": null,
      "version": 30
    },
    "total": null
  }
})


// 用户列表
router.post('/sysUser/getUserPage',async(ctx, next)=>{
    ctx.body ={
        "code": 200,
        "message": "成功",
        "result": {
          "records": [
            {
              "createTime": "2016-01-29 08:49:53",
              "createUser": null,
              "updateTime": "2020-12-03 17:12:41",
              "updateUser": "1",
              "isDisable": "0",
              "version": 25,
              "userId": "1",
              "avatar": "1124606971782160385",
              "account": "admin",
              "password": "96e79218965eb72c92a549dd5a330112",
              "salt": "abcdef",
              "name": "xiaoming",
              "birthday": "2018-11-16 00:00:00",
              "sex": "M",
              "email": "xiaoming@qq.com",
              "phone": "18200000000",
              "organizationId": "001",
              "status": "y",
              "roleId": "1,2",
              "roles": null,
              "menuList": null,
              "organizationName": "天河区飞猪"
            },
            {
              "createTime": "2020-12-02 08:22:14",
              "createUser": "1",
              "updateTime": "2020-12-03 17:12:43",
              "updateUser": null,
              "isDisable": "0",
              "version": 1,
              "userId": "2",
              "avatar": null,
              "account": "lisi",
              "password": "e10adc3949ba59abbe56e057f20f883e",
              "salt": null,
              "name": "李四",
              "birthday": null,
              "sex": "M",
              "email": null,
              "phone": "18888888",
              "organizationId": "001001001",
              "status": "y",
              "roleId": "2",
              "roles": null,
              "menuList": null,
              "organizationName": "越秀区飞猪"
            },
            {
              "createTime": "2020-12-02 07:16:06",
              "createUser": "1",
              "updateTime": "2020-12-03 17:12:45",
              "updateUser": "1",
              "isDisable": "0",
              "version": 4,
              "userId": "37394e469d93471894b88720670dea20",
              "avatar": null,
              "account": "zhangsan",
              "password": "e10adc3949ba59abbe56e057f20f883e",
              "salt": null,
              "name": "zhangsan",
              "birthday": "2020-12-02 07:00:39",
              "sex": "M",
              "email": null,
              "phone": "18888888888",
              "organizationId": "001001001",
              "status": "y",
              "roleId": "1,2",
              "roles": null,
              "menuList": null,
              "organizationName": "荔湾区飞猪"
            }
          ],
          "total": 25,
          "size": 5,
          "current": 1,
          "orders": [],
          "optimizeCountSql": true,
          "hitCount": false,
          "countId": null,
          "maxLimit": null,
          "searchCount": true,
          "pages": 2
        },
        "total": null
    }
})

// 新增用户
router.post('/sysUser/saveUser',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 修改用户信息
router.post('/sysUser/updateUser',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 根据id查询用户信息
router.get('/sysUser/getUser',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "成功",
        "result": {
          "createTime": "2016-01-29 08:49:53",
          "createUser": null,
          "updateTime": "2020-12-03 17:12:41",
          "updateUser": "1",
          "isDisable": "0",
          "version": 25,
          "userId": "1",
          "avatar": "1124606971782160385",
          "account": "admin",
          "password": "96e79218965eb72c92a549dd5a330112",
          "salt": "abcdef",
          "name": "xiaoming",
          "birthday": "2018-11-16 00:00:00",
          "sex": "M",
          "email": "xiaoming@qq.com",
          "phone": "18200000000",
          "organizationId": "001",
          "status": "y",
          "roleId": "1,2",
          "roles": null,
          "menuList": null,
          "organizationName": null
        },
        "total": null
      }
})

// 删除用户信息
router.post('/sysUser/deleteUser',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 批量删除用户信息
router.post('/sysUser/deleteUsers',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})



/**-------------角色管理------------ */
// 查询角色列表
router.post('/sysRole/getRolePage',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "成功",
        "result": {
          "records": [
            {
              "createTime": "2020-12-03 17:40:21",
              "createUser": null,
              "updateTime": null,
              "updateUser": null,
              "isDisable": "0",
              "version": 1,
              "roleId": "1",
              "roleName": "超级管理员",
              "roleCode": "admin",
              "sort": 1
            },
            {
              "createTime": "2020-12-03 17:40:21",
              "createUser": null,
              "updateTime": null,
              "updateUser": null,
              "isDisable": "0",
              "version": 1,
              "roleId": "2",
              "roleName": "测试人员",
              "roleCode": "tester",
              "sort": 2
            },
            {
              "createTime": "2020-12-03 17:40:21",
              "createUser": "1",
              "updateTime": null,
              "updateUser": null,
              "isDisable": "0",
              "version": 1,
              "roleId": "7ac75add9897492c8c7ad504638ff464",
              "roleName": "审核员",
              "roleCode": "checker",
              "sort": 2
            }
          ],
          "total": 25,
          "size": 5,
          "current": 1,
          "orders": [],
          "optimizeCountSql": true,
          "hitCount": false,
          "countId": null,
          "maxLimit": null,
          "searchCount": true,
          "pages": 1
        },
        "total": null
      }
})

// 新增角色
router.post('/sysRole/saveRole',async(ctx, next)=>{
    ctx.body = {
    "code": 200,
    "message": "操作成功",
    "result": [],
    "total": null
}
})

// 根据id查询角色信息
router.get('/sysRole/getRole',async(ctx, next)=>{
    ctx.body = {
    "code": 200,
    "message": "操作成功",
    "result": [],
    "total": null
}
})

// 修改角色信息
router.post('/sysRole/updateRole',async(ctx, next)=>{
    ctx.body = {
    "code": 200,
    "message": "操作成功",
    "result": [],
    "total": null
}
})

// 删除角色信息
router.post('/sysRole/deleteRole',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "操作成功",
        "result": [],
        "total": null
    }
})

// 批量删除用户信息
router.post('/sysRole/deleteRoles',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "操作成功",
        "result": [],
        "total": null
    }
})




/**-------------字典管理------------ */
// 新增字典项  
router.post('/dictionary/add',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "操作成功",
        "result": [],
        "total": null
      }
})

// 删除字典项 
router.get('/dictionary/delete/:id',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 查询字典项详情
router.get('/dictionary/detail/:id',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 按条件查询字典项
router.get('/dictionary/list',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 修改字典项
router.get('/dictionary/update',async(ctx, next)=>{
    ctx.body = {
        "code": 200,
        "message": "string",
        "result": {},
        "total": 0
      }
})



/**-------------日志相关------------ */
// 业务日志相关日志
router.post('/sysOperationLog/getOperationLogPage',async(ctx, next)=>{
    ctx.body={
        "code": 200,
        "message": "成功",
        "result": {
        "records": [
            {
            "operationLogId": "00d6a75c7e0246f680cde0e7ad7f722f",
            "logType": "查询用户列表",
            "logName": "业务日志",
            "userId": "1",
            "className": "com.saichen.veterans.controller.SysUserController",
            "method": "getUsers",
            "createTime": "2020-12-03 13:56:59",
            "succeed": "失败",
            "message": "\r\n### Error querying database.  Cause: java.sql.SQLIntegrityConstraintViolationException: Column 'is_disable' in where clause is ambiguous\r\n### The error may exist in file [E:\\workspace\\pytyjr\\trunk\\veterans\\target\\classes\\mapper\\SysUserMapper.xml]\r\n### The error may involve defaultParameterMap\r\n### The error occurred while setting parameters\r\n### SQL: SELECT                 sys_user.user_id,   sys_user.avatar,   sys_user.account,   sys_user.password,   sys_user.salt,   sys_user.name,   sys_user.birthday,   sys_user.sex,   sys_user.email,   sys_user.phone,   sys_user.organization_id,   sys_user.status,   sys_user.create_time,   sys_user.create_user,   sys_user.update_time,   sys_user.update_user,   sys_user.version,   sys_user.is_disable,   sys_user.role_id    ,             sys_organization.org_name as organization_name         FROM             sys_user             left join sys_organization on sys_organization.id = sys_user.organization_id         where             is_disable = '0' LIMIT ?\r\n### Cause: java.sql.SQLIntegrityConstraintViolationException: Column 'is_disable' in where clause is ambiguous\n; Column 'is_disable' in where clause is ambiguous; nested exception is java.sql.SQLIntegrityConstraintViolationException: Column 'is_disable' in where clause is ambiguous",
            "args": "{\"size\": 5, \"current\": 1}",
            "ipAddress": "192.168.3.104",
            "userName": "xiaoming",
            "userAccount": "admin"
            },
            {
            "operationLogId": "0272e00776ea4bb89275c0ebe595879f",
            "logType": "查询用户列表",
            "logName": "业务日志",
            "userId": "1",
            "className": "com.saichen.veterans.controller.SysUserController",
            "method": "getUsers",
            "createTime": "2020-12-03 15:10:15",
            "succeed": "成功",
            "message": "成功",
            "args": "{\"size\": 10, \"current\": 1}",
            "ipAddress": "192.168.3.99",
            "userName": "xiaoming",
            "userAccount": "admin"
            }
        ],
        "total": 23,
        "size": 2,
        "current": 1,
        "orders": [],
        "optimizeCountSql": true,
        "hitCount": false,
        "countId": null,
        "maxLimit": null,
        "searchCount": true,
        "pages": 12
        },
        "total": null
    }
})

// 查询登录日志列表
router.post('/sysLoginLog/getLogPage',async(ctx, next)=>{
    ctx.body={
        "code": 200,
        "message": "成功",
        "result": {
          "records": [
            {
              "loginLogId": "1ace96b7cff64340aaf7861f35345a4b",
              "logName": "登录日志",
              "userId": "1",
              "createTime": "2020-12-03 16:07:44",
              "succeed": "成功",
              "ipAddress": "127.0.0.1",
              "message": null,
              "userName": "xiaoming",
              "userAccount": "admin"
            },
            {
              "loginLogId": "31c1532f0875448a8ea8a3f0a03aacbf",
              "logName": "登录日志",
              "userId": "1",
              "createTime": "2020-12-04 16:46:06",
              "succeed": "成功",
              "ipAddress": "192.168.3.99",
              "message": null,
              "userName": "xiaoming",
              "userAccount": "admin"
            }
          ],
          "total": 10,
          "size": 2,
          "current": 1,
          "orders": [],
          "optimizeCountSql": true,
          "hitCount": false,
          "countId": null,
          "maxLimit": null,
          "searchCount": true,
          "pages": 5
        },
        "total": null
      }
})

/**=============单位================== */

router.get('/sysOrganization/treeAll',async(ctx, next)=>{
  ctx.body={
    "code": 200, 
    "message": "操作成功", 
    "result": [
        {
            "id": "001", 
            "createTime": "2020-12-03 11:25:24", 
            "updateTime": null, 
            "parentId": "0", 
            "orgCode": "001", 
            "orgName": "番禺区退役军人事务局", 
            "orgStatus": null, 
            "priority": 1, 
            "children": [
                {
                    "id": "001001", 
                    "createTime": "2020-12-03 11:25:24", 
                    "updateTime": null, 
                    "parentId": "001", 
                    "orgCode": "001001", 
                    "orgName": "沙湾街道办事处", 
                    "orgStatus": null, 
                    "priority": 1, 
                    "children": [
                        {
                            "id": "001001001", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001001", 
                            "orgName": "沙湾居委会", 
                            "orgStatus": null, 
                            "priority": 1, 
                            "children": null
                        }, 
                        {
                            "id": "001001002", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001002", 
                            "orgName": "紫坭居委会", 
                            "orgStatus": null, 
                            "priority": 2, 
                            "children": null
                        }, 
                        {
                            "id": "001001003", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001003", 
                            "orgName": "渡头居委会", 
                            "orgStatus": null, 
                            "priority": 3, 
                            "children": null
                        }, 
                        {
                            "id": "001001004", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001004", 
                            "orgName": "东区居委会", 
                            "orgStatus": null, 
                            "priority": 4, 
                            "children": null
                        }, 
                        {
                            "id": "001001005", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001005", 
                            "orgName": "金沙湾居委会", 
                            "orgStatus": null, 
                            "priority": 5, 
                            "children": null
                        }, 
                        {
                            "id": "001001006", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001006", 
                            "orgName": "龙岐居委会", 
                            "orgStatus": null, 
                            "priority": 6, 
                            "children": null
                        }, 
                        {
                            "id": "001001007", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001007", 
                            "orgName": "福涌居委会", 
                            "orgStatus": null, 
                            "priority": 7, 
                            "children": null
                        }, 
                        {
                            "id": "001001008", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001008", 
                            "orgName": "沙湾东村委会", 
                            "orgStatus": null, 
                            "priority": 8, 
                            "children": null
                        }, 
                        {
                            "id": "001001009", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001009", 
                            "orgName": "沙湾南村委会", 
                            "orgStatus": null, 
                            "priority": 9, 
                            "children": null
                        }, 
                        {
                            "id": "001001010", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001010", 
                            "orgName": "沙湾西村委会", 
                            "orgStatus": null, 
                            "priority": 10, 
                            "children": null
                        }, 
                        {
                            "id": "001001011", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001011", 
                            "orgName": "沙湾北村委会", 
                            "orgStatus": null, 
                            "priority": 11, 
                            "children": null
                        }, 
                        {
                            "id": "001001012", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001012", 
                            "orgName": "沙坑村委会", 
                            "orgStatus": null, 
                            "priority": 12, 
                            "children": null
                        }, 
                        {
                            "id": "001001013", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001013", 
                            "orgName": "大涌口村委会", 
                            "orgStatus": null, 
                            "priority": 13, 
                            "children": null
                        }, 
                        {
                            "id": "001001014", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001014", 
                            "orgName": "古坝东村委会", 
                            "orgStatus": null, 
                            "priority": 14, 
                            "children": null
                        }, 
                        {
                            "id": "001001015", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001015", 
                            "orgName": "古坝西村委会", 
                            "orgStatus": null, 
                            "priority": 15, 
                            "children": null
                        }, 
                        {
                            "id": "001001016", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001016", 
                            "orgName": "新洲村委会", 
                            "orgStatus": null, 
                            "priority": 16, 
                            "children": null
                        }, 
                        {
                            "id": "001001017", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001017", 
                            "orgName": "紫坭村委会", 
                            "orgStatus": null, 
                            "priority": 17, 
                            "children": null
                        }, 
                        {
                            "id": "001001018", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001018", 
                            "orgName": "三善村委会", 
                            "orgStatus": null, 
                            "priority": 18, 
                            "children": null
                        }, 
                        {
                            "id": "001001019", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001001", 
                            "orgCode": "001001019", 
                            "orgName": "龙湾村委会", 
                            "orgStatus": null, 
                            "priority": 19, 
                            "children": null
                        }
                    ]
                }, 
                {
                    "id": "001002", 
                    "createTime": "2020-12-03 11:25:24", 
                    "updateTime": null, 
                    "parentId": "001", 
                    "orgCode": "001002", 
                    "orgName": "钟村街道办事处", 
                    "orgStatus": null, 
                    "priority": 2, 
                    "children": [
                        {
                            "id": "001002001", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002001", 
                            "orgName": "钟村居委会", 
                            "orgStatus": null, 
                            "priority": 1, 
                            "children": null
                        }, 
                        {
                            "id": "001002002", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002002", 
                            "orgName": "南奥居委会", 
                            "orgStatus": null, 
                            "priority": 2, 
                            "children": null
                        }, 
                        {
                            "id": "001002003", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002003", 
                            "orgName": "祈福新邨居委会", 
                            "orgStatus": null, 
                            "priority": 3, 
                            "children": null
                        }, 
                        {
                            "id": "001002004", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002004", 
                            "orgName": "锦绣花园居委会", 
                            "orgStatus": null, 
                            "priority": 4, 
                            "children": null
                        }, 
                        {
                            "id": "001002005", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002005", 
                            "orgName": "骏新社区", 
                            "orgStatus": null, 
                            "priority": 5, 
                            "children": null
                        }, 
                        {
                            "id": "001002006", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002006", 
                            "orgName": "钟村一村委会", 
                            "orgStatus": null, 
                            "priority": 6, 
                            "children": null
                        }, 
                        {
                            "id": "001002007", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002007", 
                            "orgName": "钟村二村委会", 
                            "orgStatus": null, 
                            "priority": 7, 
                            "children": null
                        }, 
                        {
                            "id": "001002008", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002008", 
                            "orgName": "钟村三村委会", 
                            "orgStatus": null, 
                            "priority": 8, 
                            "children": null
                        }, 
                        {
                            "id": "001002009", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002009", 
                            "orgName": "钟村四村委会", 
                            "orgStatus": null, 
                            "priority": 9, 
                            "children": null
                        }, 
                        {
                            "id": "001002010", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002010", 
                            "orgName": "胜石村委会", 
                            "orgStatus": null, 
                            "priority": 10, 
                            "children": null
                        }, 
                        {
                            "id": "001002011", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002011", 
                            "orgName": "谢村村委会", 
                            "orgStatus": null, 
                            "priority": 11, 
                            "children": null
                        }, 
                        {
                            "id": "001002012", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002012", 
                            "orgName": "诜敦村委会", 
                            "orgStatus": null, 
                            "priority": 12, 
                            "children": null
                        }, 
                        {
                            "id": "001002013", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001002", 
                            "orgCode": "001002013", 
                            "orgName": "汉溪村委会", 
                            "orgStatus": null, 
                            "priority": 13, 
                            "children": null
                        }
                    ]
                }, 
                {
                    "id": "001003", 
                    "createTime": "2020-12-03 11:25:24", 
                    "updateTime": null, 
                    "parentId": "001", 
                    "orgCode": "001003", 
                    "orgName": "大石街道办事处", 
                    "orgStatus": null, 
                    "priority": 3, 
                    "children": [
                        {
                            "id": "001003001", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003001", 
                            "orgName": "大石居委会", 
                            "orgStatus": null, 
                            "priority": 1, 
                            "children": null
                        }, 
                        {
                            "id": "001003002", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003002", 
                            "orgName": "富丽居委会", 
                            "orgStatus": null, 
                            "priority": 2, 
                            "children": null
                        }, 
                        {
                            "id": "001003003", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003003", 
                            "orgName": "星河湾居委会", 
                            "orgStatus": null, 
                            "priority": 3, 
                            "children": null
                        }, 
                        {
                            "id": "001003004", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003004", 
                            "orgName": "富庭居委会", 
                            "orgStatus": null, 
                            "priority": 4, 
                            "children": null
                        }, 
                        {
                            "id": "001003005", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003005", 
                            "orgName": "银湾居委会", 
                            "orgStatus": null, 
                            "priority": 5, 
                            "children": null
                        }, 
                        {
                            "id": "001003006", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003006", 
                            "orgName": "丽景居委会", 
                            "orgStatus": null, 
                            "priority": 6, 
                            "children": null
                        }, 
                        {
                            "id": "001003007", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003007", 
                            "orgName": "涌口村委会", 
                            "orgStatus": null, 
                            "priority": 7, 
                            "children": null
                        }, 
                        {
                            "id": "001003008", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003008", 
                            "orgName": "河村村委会", 
                            "orgStatus": null, 
                            "priority": 8, 
                            "children": null
                        }, 
                        {
                            "id": "001003009", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003009", 
                            "orgName": "礼村村委会", 
                            "orgStatus": null, 
                            "priority": 9, 
                            "children": null
                        }, 
                        {
                            "id": "001003010", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003010", 
                            "orgName": "植村村委会", 
                            "orgStatus": null, 
                            "priority": 10, 
                            "children": null
                        }, 
                        {
                            "id": "001003011", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003011", 
                            "orgName": "猛涌村委会", 
                            "orgStatus": null, 
                            "priority": 11, 
                            "children": null
                        }, 
                        {
                            "id": "001003012", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003012", 
                            "orgName": "诜村村委会", 
                            "orgStatus": null, 
                            "priority": 12, 
                            "children": null
                        }, 
                        {
                            "id": "001003013", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003013", 
                            "orgName": "会江村委会", 
                            "orgStatus": null, 
                            "priority": 13, 
                            "children": null
                        }, 
                        {
                            "id": "001003014", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003014", 
                            "orgName": "官坑村委会", 
                            "orgStatus": null, 
                            "priority": 14, 
                            "children": null
                        }, 
                        {
                            "id": "001003015", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003015", 
                            "orgName": "大兴村委会", 
                            "orgStatus": null, 
                            "priority": 15, 
                            "children": null
                        }, 
                        {
                            "id": "001003016", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003016", 
                            "orgName": "北联村委会", 
                            "orgStatus": null, 
                            "priority": 16, 
                            "children": null
                        }, 
                        {
                            "id": "001003017", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003017", 
                            "orgName": "山西村委会", 
                            "orgStatus": null, 
                            "priority": 17, 
                            "children": null
                        }, 
                        {
                            "id": "001003018", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003018", 
                            "orgName": "大维村委会", 
                            "orgStatus": null, 
                            "priority": 18, 
                            "children": null
                        }, 
                        {
                            "id": "001003019", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003019", 
                            "orgName": "东联村委会", 
                            "orgStatus": null, 
                            "priority": 19, 
                            "children": null
                        }, 
                        {
                            "id": "001003020", 
                            "createTime": "2020-12-03 11:25:24", 
                            "updateTime": null, 
                            "parentId": "001003", 
                            "orgCode": "001003020", 
                            "orgName": "大山村委会", 
                            "orgStatus": null, 
                            "priority": 20, 
                            "children": null
                        }
                    ]
                }, 
            ]
        }
    ], 
    "total": null
}
})

/***==============优抚信息================= */

// 删除优抚信息
router.get('/veteransPreferential/deletePreferential',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "string",
    "result": {},
    "total": 0
  }
})

// 批量删除优抚信息
router.get('/veteransPreferential/deletePreferentialList',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "string",
    "result": {},
    "total": 0
  }
})

// 根据优抚id查询优抚信息  id
router.get('/veteransPreferential/getPreferential',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "成功",
    "result": {
      "createTime": "2020-12-08 14:57:17",
      "createUser": null,
      "updateTime": null,
      "updateUser": null,
      "isDisable": "0",
      "version": null,
      "preferentialId": "11",
      "veteransId": "1",
      "type": "sc",
      "state": "1",
      "fileList":[
        {
          id:'1'
        },
        {
          id:'2'
        }
      ],
      "preferentialTreatmentType": null,
      "subsistenceAllowances": null,
      "disabilityLevel": null,
      "disabilityNature": null,
      "disabilityBelong": null,
      "mentalDisease": null,
      "joinParty": null,
      "conscriptsStartDate": null,
      "conscriptsEndDate": null,
      "conscriptsConvertDate": null,
      "ionelyOldPeople": null,
      "retireIdNumber": null,
      "militaryCode": null,
      "fiveGuarantees": null,
      "otherPreferentialIdentity": null,
      "identificationBasis": null,
      "applyType": null,
      "remarks": null,
      "joinArmyDate": null,
      "outArmyDate": null,
      "belongPeriod": null,
      "abilityLive": null,
      "laborCapacity": null,
      "employmentSituation": null,
      "workUnit": null,
      "medicalInsurance": null,
      "otherSafeguards": null,
      "pensionSecurityType": null,
      "veteransBaseInfo": {
        "createTime": "2020-12-08 14:56:33",
        "createUser": null,
        "updateTime": null,
        "updateUser": null,
        "isDisable": "0",
        "version": null,
        "veteransId": "1",
        "idPhoto": "1222",
        "organizationId": null,
        "name": "神",
        "idCardNo": "111",
        "nation": null,
        "birthDate": null,
        "sex": null,
        "phone": null,
        "politicalIdentity": null,
        "maritalStatus": null,
        "educationDegree": null,
        "householdType": null,
        "householdAddressType": null,
        "householdAddress": null,
        "actualAddress": null,
        "health": null,
        "remarks": null,
        "nameUsedBefore": null,
        "domicile": null,
        "whetherHk": null,
        "signingIssuingOrganization": null,
        "termValidityStart": null,
        "termValidityEnd": null,
        "fixedTelephone": null,
        "wechatQq": null
      },
      "veteransBankInfo": {
        "bankAccount": "string",
        "bankAccountNo": "string",
        "bankAddress": "string",
        "bankName": "string",
        "id": "string",
        "preferentialId": "string",
        "remarks": "string"
      },
      "veteransFamilyInfo":  {
        "agedSize": 0,
        "familySize": 0,
        "id": "string",
        "preferentialId": "string",
        "remarks": "string",
        "underAgeSize": 0
      },
      "veteransHouseInfo": {
        "id": null,
        "preferentialId": "11",
        "houseType": null,
        "houseStatus": null,
        "houseArea": null,
        "roomsNumber": null,
        "remarks": null
      },
      "veteransTypeInfo": null,
      "veteransMartyrFamily": null
    },
    "total": null
  }
})

// 查询优抚信息列表
router.post('/veteransPreferential/getPreferentialPage',async(ctx, next)=>{
  ctx.body = {
    "code": 200,
    "message": "成功",
    "result": {
      "records": [
        {
          "id": "1",
          "name": "xiaoming",
          "idCardNo": "4413333333333333",
          "sex": "f",
          "nation": "汉族",
          "joinTime": "2014.01.01",
          "outTime": "2014.01.01",
          "type": "5",
          "state": "y",
          "organizationId": "番禺区",
        }
      ],
      "total": 0,
      "size": 5,
      "current": 1,
      "orders": [],
      "optimizeCountSql": true,
      "hitCount": false,
      "countId": null,
      "maxLimit": null,
      "searchCount": true,
      "pages": 0
    },
    "total": null
  }
})

// 新增/修改优抚信息
router.post('/veteransPreferential/savePreferential',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "string",
    "result": {},
    "total": 0
  }
})

// /attachFile/upload
// 文件删除
router.get('/attachFile/delete/:id',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "删除成功",
    "result": null,
    "total": null
  }
})


// /attachFile/upload
// 文件下载
router.get('/attachFile/get/:id',async(ctx, next)=>{
  console.log('文件下载')
  const path = `upload/aaa.jpg`;
  ctx.attachment(path);
  await send(ctx, path);

  // const pathUrl = path.join(__dirname, npath)
  // ctx.body = fs.createReadStream(pathUrl)

  // ctx.body={
  //   code: 200,
  //   message: "删除成功",
  //   result: null,
  //   total: null
  // }
})

// /attachFile/upload
// 文件上传
router.post('/attachFile/upload',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "操作成功",
    "result": {
      "createTime": "2020-12-31 18:06:07",
      "createUser": "1",
      "updateTime": null,
      "updateUser": null,
      "isDisable": null,
      "version": null,
      "id": "cd6b2c3563e30ee47cb643661dd8d7e4",
      "fileType": null,
      "fileName": "006fpauXly1gekdv9a85hj30gs0d2mzn.jpg",
      "filePath": "20201231/6ea387f905484afaa1a5212bcae804ff.jpg",
      "fileThumPath": "20201231/6ea387f905484afaa1a5212bcae804ff-thumbnail.jpg",
      "ownerId": null
    },
    "total": null
  }
})


// 查询安置信息列表
router.post('/placeInfo/getPlacePage',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "成功",
    "result": {
      "records": [
        {
          "organizationId": "001",
          "orgName": "番禺区退役军人事务局",
          "veteransId": "2",
          "phone": "string",
          "nation": "string",
          "idCardNo": "888",
          "sex": "string",
          "placeId": "1",
          "name": "xiaoming",
          "birthDate": "2020-12-08 09:19:07"
        }
      ],
      "total": 1,
      "size": 5,
      "current": 1,
      "orders": [],
      "optimizeCountSql": true,
      "hitCount": false,
      "countId": null,
      "maxLimit": null,
      "searchCount": true,
      "pages": 1
    },
    "total": null
  }
})

// 新增/修改安置信息
router.post('/placeInfo/savePlace',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "string",
    "result": {},
    "total": 0
  }
})


// 根据安置id查询安置信息
router.get('/placeInfo/getPlace',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "string",
    "result": {
      "placeId": "1",
      "veteransId": "2",
      "fileList":[
        {
          "id":'1'
        }
      ]
    },
    "total": 0
  }
})


// 批量删除安置信息
router.get('/placeInfo/deletePlaces',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "string",
    "result": {},
    "total": 0
  }
})


// 删除安置信息
router.get('/placeInfo/deletePlace',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "string",
    "result": {},
    "total": 0
  }
})


router.post('/sysOrganization/query',async(ctx, next)=>{
  ctx.body={
    "code": 200,
    "message": "操作成功",
    "result": {
      "records": [
        {
          "createTime": "2020-12-03 11:25:24",
          "createUser": null,
          "updateTime": null,
          "updateUser": null,
          "isDisable": "0",
          "version": 1,
          "id": "001",
          "parentId": "0",
          "parentName": null,
          "orgCode": "001",
          "orgName": "小黄人人事务局",
          "priority": 1
        }
      ],
      "total": 1,
      "size": 1,
      "current": 1,
      "orders": [],
      "optimizeCountSql": true,
      "hitCount": false,
      "countId": null,
      "maxLimit": null,
      "searchCount": true,
      "pages": 5
    },
    "total": null
  }
})

module.exports = router