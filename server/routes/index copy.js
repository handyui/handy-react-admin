const router = require('@koa/router')()
router.prefix('/api')
const WeixinAuth = require('../middlewares/koa2-weixin-auth')
let WXBizDataCrypt = require('../lib/WXBizDataCrypt');
const jsonwebtoken = require('jsonwebtoken')

const AppID = 'wx7884e3fd54e3bf98'
const AppSecret= '5862d91d01fe030d10858ed491d4156e'
const weixinAuth= new WeixinAuth(AppID, AppSecret)
const JET_SECRET = 'JETSECRET'


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
router.get('/sys/logout',async(ctx, next)=>{
    ctx.body = {
        "data": null, 
        "code": 200, 
        "message": "请求成功"
    }
})


/**-------------菜单------------ */

// 请求菜单
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
                "id": 27, 
                "url": "222", 
                "sort": 4, 
                "icon": "icon-zhuxingtu", 
                "parentId": 1, 
                "name": "2222"
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

/**-------------用户------------ */
// 用户列表
router.post('/sysUser/getUserPage',async(ctx, next)=>{
    // ctx.body ={
    //     "result": {
    //         "data": [
    //             {
    //                 "id": 37, 
    //                 "isDel": 0, 
    //                 "createdAt": "2020-11-26T14:26:52.696Z", 
    //                 "updatedAt": "2020-11-26T15:53:57.000Z", 
    //                 "platform": null, 
    //                 "isSuper": 0, 
    //                 "roles": [
    //                     {
    //                         "id": 2, 
    //                         "createdAt": "2020-11-11T14:31:52.024Z", 
    //                         "updatedAt": "2020-11-27T09:24:40.000Z", 
    //                         "title": "系统审计员", 
    //                         "description": "这是一个系统审计员"
    //                     }, 
    //                     {
    //                         "id": 13, 
    //                         "createdAt": "2020-11-26T06:28:06.454Z", 
    //                         "updatedAt": "2020-11-26T06:28:06.454Z", 
    //                         "title": "草帽团", 
    //                         "description": "草帽海贼团"
    //                     }
    //                 ], 
    //                 "platformDict": null, 
    //                 "username": "路飞"
    //             }, 
    //             {
    //                 "id": 36, 
    //                 "isDel": 0, 
    //                 "createdAt": "2020-11-25T10:03:25.838Z", 
    //                 "updatedAt": "2020-11-25T10:03:25.838Z", 
    //                 "platform": null, 
    //                 "isSuper": 0, 
    //                 "roles": [
    //                     {
    //                         "id": 3, 
    //                         "createdAt": "2020-11-11T14:32:40.512Z", 
    //                         "updatedAt": "2020-11-17T01:26:59.000Z", 
    //                         "title": "系统管理员", 
    //                         "description": "系统管理员。"
    //                     }
    //                 ], 
    //                 "platformDict": null, 
    //                 "username": "test"
    //             }, 
    //             {
    //                 "id": 22, 
    //                 "isDel": 0, 
    //                 "createdAt": "2020-11-16T10:26:13.376Z", 
    //                 "updatedAt": "2020-11-26T14:22:21.000Z", 
    //                 "platform": null, 
    //                 "isSuper": 0, 
    //                 "roles": [
    //                     {
    //                         "id": 2, 
    //                         "createdAt": "2020-11-11T14:31:52.024Z", 
    //                         "updatedAt": "2020-11-27T09:24:40.000Z", 
    //                         "title": "系统审计员", 
    //                         "description": "这是一个系统审计员"
    //                     }, 
    //                     {
    //                         "id": 13, 
    //                         "createdAt": "2020-11-26T06:28:06.454Z", 
    //                         "updatedAt": "2020-11-26T06:28:06.454Z", 
    //                         "title": "草帽团", 
    //                         "description": "草帽海贼团"
    //                     }
    //                 ], 
    //                 "platformDict": null, 
    //                 "username": "wowo"
    //             }, 
    //             {
    //                 "id": 21, 
    //                 "isDel": 0, 
    //                 "createdAt": "2020-11-16T10:25:41.446Z", 
    //                 "updatedAt": "2020-11-16T10:25:41.446Z", 
    //                 "platform": null, 
    //                 "isSuper": 0, 
    //                 "roles": [
    //                     {
    //                         "id": 2, 
    //                         "createdAt": "2020-11-11T14:31:52.024Z", 
    //                         "updatedAt": "2020-11-27T09:24:40.000Z", 
    //                         "title": "系统审计员", 
    //                         "description": "这是一个系统审计员"
    //                     }
    //                 ], 
    //                 "platformDict": null, 
    //                 "username": "788"
    //             }, 
    //             {
    //                 "id": 20, 
    //                 "isDel": 0, 
    //                 "createdAt": "2020-11-16T09:57:06.225Z", 
    //                 "updatedAt": "2020-11-16T09:57:06.225Z", 
    //                 "platform": null, 
    //                 "isSuper": 0, 
    //                 "roles": [
    //                     {
    //                         "id": 2, 
    //                         "createdAt": "2020-11-11T14:31:52.024Z", 
    //                         "updatedAt": "2020-11-27T09:24:40.000Z", 
    //                         "title": "系统审计员", 
    //                         "description": "这是一个系统审计员"
    //                     }, 
    //                     {
    //                         "id": 3, 
    //                         "createdAt": "2020-11-11T14:32:40.512Z", 
    //                         "updatedAt": "2020-11-17T01:26:59.000Z", 
    //                         "title": "系统管理员", 
    //                         "description": "系统管理员。"
    //                     }
    //                 ], 
    //                 "platformDict": null, 
    //                 "username": "123123"
    //             }, 
    //             {
    //                 "id": 10, 
    //                 "isDel": 0, 
    //                 "createdAt": "2020-11-13T16:14:13.721Z", 
    //                 "updatedAt": "2020-11-13T16:14:13.721Z", 
    //                 "platform": null, 
    //                 "isSuper": 0, 
    //                 "roles": [
    //                     {
    //                         "id": 2, 
    //                         "createdAt": "2020-11-11T14:31:52.024Z", 
    //                         "updatedAt": "2020-11-27T09:24:40.000Z", 
    //                         "title": "系统审计员", 
    //                         "description": "这是一个系统审计员"
    //                     }
    //                 ], 
    //                 "platformDict": null, 
    //                 "username": "666"
    //             }
    //         ], 
    //         "total": 6, 
    //         "pageNumber": 1, 
    //         "pageSize": 10
    //     }, 
    //     "code": 200, 
    //     "message": "请求成功"
    // }

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
              "name": "stylefeng",
              "birthday": "2018-11-16 00:00:00",
              "sex": "M",
              "email": "sn93@qq.com",
              "phone": "18200000000",
              "organizationId": "001",
              "status": "y",
              "roleId": "1,2",
              "roles": null,
              "menuList": null,
              "organizationName": "番禺区退役军人事务局"
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
              "organizationName": "沙湾居委会"
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
              "organizationName": "沙湾居委会"
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
          "name": "stylefeng",
          "birthday": "2018-11-16 00:00:00",
          "sex": "M",
          "email": "sn93@qq.com",
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
        "result": {
            "records": [
                {
                    "id": 2, 
                    "createdAt": "2020-11-11T14:31:52.024Z", 
                    "updatedAt": "2020-11-27T09:24:40.000Z", 
                    "title": "系统审计员", 
                    "description": "这是一个系统审计员"
                }, 
                {
                    "id": 3, 
                    "createdAt": "2020-11-11T14:32:40.512Z", 
                    "updatedAt": "2020-11-17T01:26:59.000Z", 
                    "title": "系统管理员", 
                    "description": "系统管理员。"
                }, 
                {
                    "id": 13, 
                    "createdAt": "2020-11-26T06:28:06.454Z", 
                    "updatedAt": "2020-11-26T06:28:06.454Z", 
                    "title": "草帽团", 
                    "description": "草帽海贼团"
                }
            ], 
            "total": 3, 
            "pageNumber": 1, 
            "pageSize": 10
        }, 
        "code": 200, 
        "message": "请求成功"
    }

    // {
    //     "code": 200,
    //     "message": "成功",
    //     "result": {
    //       "records": [
    //         {
    //           "createTime": null,
    //           "createUser": null,
    //           "updateTime": null,
    //           "updateUser": null,
    //           "isDisable": "0",
    //           "version": 1,
    //           "roleId": "1",
    //           "roleName": "超级管理员",
    //           "roleCode": "admin",
    //           "sort": 1
    //         },
    //         {
    //           "createTime": null,
    //           "createUser": null,
    //           "updateTime": null,
    //           "updateUser": null,
    //           "isDisable": "0",
    //           "version": 1,
    //           "roleId": "2",
    //           "roleName": "测试查看",
    //           "roleCode": "select",
    //           "sort": 2
    //         },
    //         {
    //           "createTime": "2020-12-03 17:40:21",
    //           "createUser": "1",
    //           "updateTime": null,
    //           "updateUser": null,
    //           "isDisable": "0",
    //           "version": 1,
    //           "roleId": "7ac75add9897492c8c7ad504638ff464",
    //           "roleName": "大龙审核员",
    //           "roleCode": "dlshy",
    //           "sort": 2
    //         }
    //       ],
    //       "total": 3,
    //       "size": 10,
    //       "current": 1,
    //       "orders": [],
    //       "optimizeCountSql": true,
    //       "hitCount": false,
    //       "countId": null,
    //       "maxLimit": null,
    //       "searchCount": true,
    //       "pages": 1
    //     },
    //     "total": null
    //   }
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
router.post('/sysRole/getRole',async(ctx, next)=>{
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



// 菜单管理
router.get('/sys/access',async(ctx, next)=>{
    ctx.body ={
        "data": {
            "data": [
                {
                    "id": 18, 
                    "isDel": 0, 
                    "createdAt": "2020-11-16T03:24:06.558Z", 
                    "updatedAt": "2020-11-16T05:30:49.000Z", 
                    "moduleName": "测试模块", 
                    "actionName": "", 
                    "icon": "icon-BUG", 
                    "url": "test", 
                    "moduleId": -1, 
                    "sort": 1, 
                    "description": null, 
                    "children": true
                }, 
                {
                    "id": 1, 
                    "isDel": 0, 
                    "createdAt": "2020-11-02T15:16:08.891Z", 
                    "updatedAt": "2020-11-19T06:21:39.000Z", 
                    "moduleName": "系统管理", 
                    "actionName": "", 
                    "icon": "icon-shezhi", 
                    "url": "system", 
                    "moduleId": -1, 
                    "sort": 6, 
                    "description": null, 
                    "children": true
                }
            ], 
            "total": 2, 
            "pageNumber": 1, 
            "pageSize": 10
        }, 
        "code": 200, 
        "message": "请求成功"
    }
})



/**-------------角色管理------------ */
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
        "code": 0,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 查询字典项详情
router.get('/dictionary/detail/:id',async(ctx, next)=>{
    ctx.body = {
        "code": 0,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 按条件查询字典项
router.get('/dictionary/list',async(ctx, next)=>{
    ctx.body = {
        "code": 0,
        "message": "string",
        "result": {},
        "total": 0
      }
})

// 修改字典项
router.get('/dictionary/update',async(ctx, next)=>{
    ctx.body = {
        "code": 0,
        "message": "string",
        "result": {},
        "total": 0
      }
})



/**-------------日志相关------------ */
// 业务日志相关日志
router.post('/dictionary/update',async(ctx, next)=>{
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
            "userName": "stylefeng",
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
            "userName": "stylefeng",
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
              "userName": "stylefeng",
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
              "userName": "stylefeng",
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


module.exports = router