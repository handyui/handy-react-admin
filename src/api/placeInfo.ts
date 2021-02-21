
import { request } from '@/utils/api.request'

/**-------------------------------安置------------------------------- */
// 删除安置信息
export const deletePlace = (id:string) => request.get(`/placeInfo/deletePlace?id=${id}`)

// 批量删除安置信息
export const deletePlaces = (ids:string) => request.get(`/placeInfo/deletePlaces?ids=${ids}`)

// 根据安置id查询安置信息
export const getPlace = (id:string) => request.get(`/placeInfo/getPlace?id=${id}`)

// 查询安置信息列表
export const getPlacePage = (data:any) => request.post('/placeInfo/getPlacePage', data)

// 新增/修改安置信息
export const savePlace = (data:any) => request.post('/placeInfo/savePlace', data)