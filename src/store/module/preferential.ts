import { Reducer } from 'redux'
import { IAction } from '../types'
import { createStorage} from '@/utils/storage'
const Storage = createStorage({storage: localStorage})

const PREFERENTAIL_data = 'PREFERENTAIL_data'

export interface preState {
    preData: {
        veteransBaseInfo: object
        veteransBankInfo: object
        veteransFamilyInfo: object
        veteransHouseInfo: object
        veteransTypeInfo: object
        veteransMartyrFamily: object
        [key:string]: any
    }
}

const defaultUser: preState = {
    preData: Storage.get(PREFERENTAIL_data),
}

// reducer
export const reducer: Reducer<preState, IAction<any>> = ( state = defaultUser, action: IAction<any>) => {
    switch (action.type) {
        case PREFERENTAIL_data:
            return {
                ...state,
                "preData": action.payload
            }
        default:
            return state
    }
}

/*
    设置存储数据
 */
export const setDatas = (data:any) => ({type: PREFERENTAIL_data, payload: data})

export const SetData = (data:any) => {
    return async (dispatch:any) => {
        Storage.set(PREFERENTAIL_data, data)
        dispatch(setDatas(data))
    }
}