import { Reducer } from 'redux'
import { IAction } from '../types'

const PANES_data = 'panes_data'


interface PaneProps {
    title: string
    menuId: string
    closable?: string
    [key:string]:any
}

export interface layoutState {
    panes: PaneProps[] // 选项卡内容存储
    [key:string]: any
}

const defaultUser: layoutState = {
    panes : [{ title: '首页', menuPath: '/dashboard', menuId: 'dashboard',  closable: '0' }]
}

// reducer
export const reducer: Reducer<layoutState, IAction<any>> = ( state = defaultUser, action: IAction<any>) => {
    switch (action.type) {
        case PANES_data:
            return {
                ...state,
                "panes": action.payload
            }
        default:
            return state
    }
}

/*
    设置存储数据
 */
export const setPanes = (data:any) => ({type: PANES_data, payload: data})

// // 新增选项卡操作
// export const addTab=(data:any)=>{
//     return async (dispatch:any) => {
//         dispatch(setPanes(data))
//     }
// }


