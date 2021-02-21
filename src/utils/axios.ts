import axios , { AxiosRequestConfig, AxiosResponse, AxiosError }from 'axios'
import { message as Message } from 'antd'
// import { getToken, setToken } from '~/assets/utils/auth'
// import { Message, Loading } from 'element-ui'

// import getEnv from './env'
// console.log(getEnv)
// console.log(import.meta)

import {ACCESS_TOKEN, CURRENT_USER} from '@/store/mutation-types'
import {createStorage} from './storage'
const Storage = createStorage()

const LoginOut = ()=>{
    const { pathname, search } = window.location
    const login = `/login?redirectURL=${encodeURIComponent( window.location.origin + pathname + search )}`
    Storage.remove(ACCESS_TOKEN)
    Storage.remove(CURRENT_USER)
    window.location.href = login
}


class HttpRequest {
    loading: any 
    data: any
    queue: any
    constructor () {
        this.loading = null
        this.data = null
        // 存储请求队列
        this.queue = {}
    }
    // 销毁请求实例
    distroy (url:any) {
        delete this.queue[url]
        const queue = Object.keys(this.queue)
        return queue.length
        // if (!Object.keys(this.queue).length) {
        //     // this.loading.close()
        //     console.log('加载关闭...')
        // }
    }
    // 请求拦截
    interceptors (instance:any, url:any) {
        // 添加请求拦截器
        instance.interceptors.request.use((config:AxiosRequestConfig) => {
            const token = Storage.get(ACCESS_TOKEN)
            // console.log(token)
            // 判断是否存在token，如果存在的话，请求带上token,后端接口判断请求头有无token
            if (token) {
                config.headers.token = token 
            }
       /*     let whiteList = ['/saasContentDetail/queryAllByPage', '/saasContentCover/queryCaseListByParam']
            // 添加全局的loading..以及不需要loading 页面的配置
            // 不添加loading 白名单
            if (!Object.keys(this.queue).length) {
                let valid = true
                whiteList.forEach(reg => {
                    if (url.indexOf(reg) != -1) {
                        valid = false
                    }
                })
                if (valid) {
                    this.loading = Loading.service({
                        lock: true,
                        text: '加载中……',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                    console.log('加载中...')
                } else {
                    this.loading.close()
                }
            }
      */
            this.queue[url] = true
            return config
        }, (error:AxiosError) => {
            return Promise.reject(error)
        })
        // 添加响应拦截器
        instance.interceptors.response.use((res:AxiosResponse) => {
            // 关闭loading
            // this.loading.close()
            const { code, message } = res.data
            if(code !==200 && url.indexOf('/attachFile/get/') !== 0){
                switch (code) { 
                    case 2010:
                        LoginOut()
                        break; 
                    case 2011:
                        LoginOut()
                        break;  
                    default:   
                    Message.error(message)
                }
               
            }
            this.distroy(url)
            return res.data
        }, (error:AxiosError) => {
            this.distroy(url)
            console.log(error)
            // Message({
            //     message: '链接超时，请稍候再试',
            //     type: 'error',
            //     duration: 5 * 1000
            // })
            return Promise.reject(error.response)
        })
    }

    request (options:AxiosRequestConfig) {
        this.data = options
        const instance = axios.create({
            // baseURL: process.env.NODE_ENV === 'development' ? '/api/' : 'http://192.168.7.221:80/api', 
            baseURL: process.env.REACT_APP_URL,
            timeout: 60000, // request timeout
            // withCredentials: true,
            // headers: {
            //     'Content-Type': 'application/json; charset=utf-8',
            //     'X-URL-PATH': location.pathname
            // }
        })
        this.interceptors(instance, options.url)
        options = Object.assign({}, options)
        // this.queue[options.url] = instance
        return instance(options)
    }
}

export default HttpRequest
