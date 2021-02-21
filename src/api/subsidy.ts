import { request } from '@/utils/api.request'

/***==============优抚补助设置================= */


// 查询优抚补助方案信息列表
export const selectProgrammePage = (data:any) => request.post('/subsidyProgramme/selectProgrammePage', data)

// 新增优抚补助方案信息
export const saveProgramme = (data:any) => request.post('/subsidyProgramme/saveProgramme', data)

// 查看补助方案详情
export const getProgramme = (data:any) => request.post('/subsidyProgramme/getProgramme', data)

// 更新优抚补助方案信息
export const updateProgramme = (data:any) => request.post('/subsidyProgramme/updateProgramme', data)
