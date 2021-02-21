const Koa = require('koa')
const session = require('koa-session')
const store = require('koa-session-local')
const Router = require('@koa/router')
const koajwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')
const koaBody = require('koa-body')
const path = require('path')
const util = require('util')
const serve = require('koa-static-server')
const index = require('./routes/index')
const sdkTrack = require('./routes/sdk_track')
const cors = require('koa2-cors')

const fs = require('fs')

const app = new Koa()
app.use(koaBody()) // parse request.body
// 静态文件，自动跳过koajwt检查
app.use(serve({rootDir:'static', rootPath:'/static'}))
// app.use(require('koa-static')(__dirname + '/static'))

// koa-session 将session以cookie的方式存储在客户端浏览器
// 设置签名的Cookie密钥
app.keys = ['koakeys']

const CONFIG = {
    store: new store(), // 把store指定为我们本地的内存存储对象
    key:'koa.sess',
    maxAge:86400000,
    autoCommit: true,
    overwritte: true,
    httpOnly: true, 
    signed: true, // 为false时，app.keys步赋值没有关系，为true时，则需要对app.keys赋值，否则会报错
    rolling: false,
    renew: false,
    secure: false, // 在本地调试时设置为false，上线再改成true，线上可以用https这样的域名
    sameSite: null 
}

app.use(async function(ctx, next){
    const n=~~ctx.cookies.get('view')+1
    ctx.cookies.set('view', n, {httpOnly:false})
    await next()
})


app.use(session(CONFIG, app))


// jwt实现
const JET_SECRET = 'JETSECRET'

// 错误处理，被tokenjwt挡住的请求
// 没有token或者token过期，返回401
// 与下面的koajwt设置是组合使用的
app.use(async(ctx, next)=>{
    try{
        await next()
    }catch(err){
        if(err.status === 401){
            ctx.status = 401
            ctx.body = 'Protected resource'
        }else{
            throw err
        }
    }
})

// app.use(koajwt({secret: JET_SECRET}).unless({
//     path:['/admin/test']
// }))


// 路由
const router = new Router({
    prefix: '/user'
})

// router.use(async(ctx, next)=>{
//     // 如果不是登录页，和web-view
//     if(!ctx.url.includes('login') && !ctx.url.includes('web-view')){
//         try{
//             let token = ctx.request.header.authorization
//             console.log('token', token)
//             token = token.split('')[1]
//             // 如果签名不对，这里会报错走catch分支
//             let payload = await util.promisify(jsonwebtoken.verify)(token, JWT_SECRET)
//             console.log('payload', payload)
//             // 404 bug
//             await next()
//         }catch{
//             console.log('err', err)
//             throw err
//         }
//     }else{
//         // 这里status状态不对，也会返回404
//         await next()
//     }
// })


app.use(async (ctx, next) => {
    // 允许来自所有域名请求
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', '*')
    // 设置所允许的HTTP请求方法
    // ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
    // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
    // ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type')
    await next()
})

// routes
app.use(router.routes()).use(router.allowedMethods())
app.use(index.routes(), index.allowedMethods())
app.use(sdkTrack.routes(), sdkTrack.allowedMethods())


// function routes(app){
//     let files = fs.readdirSync(path.resolve(__dirname, './routes'));
//     console.log(files)
//     let jsFiles = files.filter((f)=>{
//         // return f.endsWith('-router.js');
//         return f.endsWith('.js');
//     }, files);
  
//     // for (let f of jsFiles) {
//     //   console.log(`import file ${f}...`)
//     //   // let name = f.substring(0, f.length - 10)
//     //   let router = require(__dirname + "/" + f)
//     //   app.use(router.routes())
//     //   app.use(router.allowedMethods())
//     // }
// }

// routes(app)
// let bb = fs.readdirSync(path.resolve(__dirname, './routes'));



app.use(cors())

app.listen(3001, () => {
    console.log("渲染服务器启动成功");
});
  

/**
 * 如何将session存储到服务器
 * const store = require('koa-session-local')
 * const CONFIG = {
    store: new store(), 
    }
 * 
 * 如何使用token验证
 * 使用curl验证已经实现的token
 * 
 * 
 * 
 * jsonwebtoken：
 * 生成token：jsonwebtoken.sign(payload, secretOrPrivateKey, [options, callback])
 * 验证token否合法：jsonwebtoken.verify(payload, secretOrPrivateKey, [options, callback])
 */