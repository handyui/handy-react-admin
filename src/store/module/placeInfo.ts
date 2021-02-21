import { Reducer } from 'redux'
import { IAction } from '../types'
import { createStorage} from '@/utils/storage'
const Storage = createStorage({storage: localStorage})

const PLACEINfo_data = 'PLACEINfo_data'

export interface placeInfoState {
    veteransBaseInfo: object
    [key:string]: any
}

const defaultUser: placeInfoState = Storage.get(PLACEINfo_data)

// reducer
export const reducer: Reducer<placeInfoState, IAction<any>> = ( state = defaultUser, action: IAction<any>) => {
    switch (action.type) {
        case PLACEINfo_data:
            return {
                ...state,
                "placeInfoData": action.payload
            }
        default:
            return state
    }
}

/*
    设置存储数据
 */
export const setDatas = (data:any) => ({type: PLACEINfo_data, payload: data})

export const SetPlaceInfo = (data:any) => {
    return async (dispatch:any) => {
        Storage.set(PLACEINfo_data, data)
        dispatch(setDatas(data))
    }
}