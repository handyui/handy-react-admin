import { request } from '@/utils/api.request'

/**-------------------------------附件相关------------------------------- */
/* 文件上传 
file:file
fileType: 附件类型编码，字典code
content type:
*/
export const uploadAttachFile = (data:object) => request.post('/attachFile/upload', data)

// 删除附件
export const deleteAttachFile = (id:string) => request.get(`/attachFile/delete/${id}`)

// 文件下载
export const getAttachFile = (id:string) => request.get(`/attachFile/get/${id}`, {}, {'Content-Type': 'application/octet-stream'}, 'arraybuffer')

// 根据owner获取附件列表
export const getAttachFileByOwner = (data:object) => request.post('/attachFile/listByOwner', data)


