import { Reducer } from 'redux'
import { IAction } from '../types'
import { createStorage} from '@/utils/storage'
import { getUserAndRole, getMenuByToken} from '@/api/system'
import { ACCESS_TOKEN, CURRENT_USER } from '../mutation-types'
import { login, loginOut} from '@/api/user'
import { message as Message} from 'antd'

const Storage = createStorage({storage: localStorage})

const USER_MENU = 'USER_MENU'
const USER_INFO = 'USER_INFO'

export interface userState {
    token: string;
    avatar: string | undefined;
    account: string;
    mobile: string;
    role: number;
    id: number;
    menu: any;
}

const defaultUser: userState = {
    token: Storage.get(ACCESS_TOKEN),
    avatar: undefined,
    account: '',
    mobile: '',
    role: 0,
    id: 0,
    menu: Storage.get(CURRENT_USER)? Storage.get(CURRENT_USER).menuList : []
}


// reducer
export const reducer: Reducer<userState, IAction<any>> = ( state = defaultUser, action: IAction<any>) => {
    switch (action.type) {
        case USER_MENU:
            return {
                ...state,
                "menu": action.payload
            }
        case USER_INFO:
            return {
                ...state,
                "info": action.payload
            }
        default:
            return state
    }
}


/*
设置菜单的同步action
 */
export const setMenus = (menu:any) => ({type: USER_MENU, payload: menu})

// dispatch({
//     type: USER_INFO,
//     data: res.data.info
//   })

export interface loginCheck { //登录检验
    loginName: string; 
    passWord: string;
}


// actions
// export const userLoginReq = (param:loginCheck) => {
//     return async (dispatch:any) => {
//     //   try {
//     //     const response = await checkLogin(param)
//     //     if(response.errorCode===0){
//     //       await dispatch(userLoadingSuccess(response));
//     //       dispatch(push('/home'));
//     //     }else{
//     //       await dispatch(userLoginFail(response));
//     //     }
//     //   }
//     //   catch(err){
//     //     await dispatch(userLoginFail(err));
//     //   }
//     };
// };


const next = () => {
    // const params = new URLSearchParams(window.location.search)
    // const redirectURL = params.get('redirectURL')
    // // 获取退出登录携带的路径
    // if (redirectURL) {
    //   window.location.href = redirectURL
    //   return
    // }
    window.location.href = '/dashboard'
}

// 获取个人权限
export const SetUserInfor = () => {
    return async (dispatch:any) => {
        const param={
            token: defaultUser.token
        }
        const {result, code}:any = await getUserAndRole(param)
        if(code === 200){
            console.log('result.menuList', result.menuList)
            Storage.set(CURRENT_USER, result, 7 * 24 * 60 * 60 * 1000)
            dispatch(setMenus(result.menuList))
        }
    }
}

// 登录
export const Login = (data:any) => {
    return async (dispatch:any) => {
        const {result, code, message}:any  = await login(data)  // {status: 0, data: user} {status: 1, msg: 'xxx'}
        if(code === 200) {
            Storage.set(ACCESS_TOKEN, result, 7 * 24 * 60 * 60 * 1000)
            const param={
                token: result
            }
      
            const res:any = await getUserAndRole(param)
            Storage.set(CURRENT_USER, res.result, 7 * 24 * 60 * 60 * 1000)
            dispatch(setMenus(res.result.menuList))
            next()
            // history.push('/dashboard')
            // dispatch(setMenus(res.result.menuList))
        } else {
            // dispatch(showErrorMsg(msg))
            Message.error(`${message}`)
        }
    }
}

// 退出
export const LoginOut = () => {
    return async (dispatch:any) => {
        const { pathname, search } = window.location
        const login = `/login?redirectURL=${encodeURIComponent( window.location.origin + pathname + search )}`
        await loginOut()
        Storage.remove(ACCESS_TOKEN)
        Storage.remove(CURRENT_USER)
        window.location.href = login
    }
}

// 请求菜单
export const SetMenu = () => {
    return async (dispatch:any) => {
        const {result, code}:any =  await getMenuByToken()
        if(code === 200){
           dispatch(setMenus(result))
        }
    }
}



// 退出登陆的异步action
// export const Logout = () =>  {
//     // // 返回action对象
//     // return {type: RESET_USER}
//     return async dispatch => {
     
//     }
// }