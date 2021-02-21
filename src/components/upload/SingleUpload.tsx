import React, { useEffect,forwardRef, useImperativeHandle, useState} from 'react'
// import { UploadProps, UploadProgressEvent, UploadRequestError, RcFile, Action } from './interface'
import {uploadAttachFile, getAttachFile, deleteAttachFile} from '@/api/file'
// import RcUpload  from 'rc-upload'
// import { FormInstance } from 'antd/lib/form'
;import{ PlusOutlined } from '@ant-design/icons'
import { Button, Spin, message as Message, Modal } from 'antd'
import { getUid } from './utils'
import './index.scss'
// import axios from 'axios'

export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed'

export interface UploadFile<T = any> {
    uid?: string;
    size?: number;
    name?: string;
    fileName?: string;
    lastModified?: number;
    lastModifiedDate?: Date;
    filePath?: string;
    status?:  string;
    percent?: number;
    fileThumPath?: string;
    originFileObj?: File | Blob;
    response?: T;
    error?: any;
    linkProps?: any;
    type?: string;
    xhr?: T;
    preview?: string;
}

interface SingleUploadProps<T = any>{
    children?:any
    accept?:any
    multiple?:boolean
    fileList?: UploadFile<T>[]
    // type: string
    // color?: string
    // size?: number|string
    // callback?:()=>void
    // callback?:(val:any)=>void
    ownerId?:string
    // ref?:any
    disable?: boolean
    className?: string
}

function getBase64(img:any, callback:(val:any)=>void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img)
}

const SingleUpload= forwardRef<any, SingleUploadProps>((props, ref) => {
    const {accept, multiple, fileList, ownerId, disable}:any = props
    const [state, setState] = useState({
        fileList: [] as any ,
        loading: false,
    })
    const [ids, setIds] = useState([] as any)
    const [imgUrl, setImgUrl] = useState(new Map() as any)

    const [showImg, setShowImg] = useState({
        previewVisible:false,
        previewTitle:'',
        previewImage: ''
    })

    const getImg=async(id:string)=>{
        let res:any = await getAttachFile(id)
        let b = new Blob([res])
        let url = URL.createObjectURL(b) // 创建指向参数b的URL
        setImgUrl(imgUrl.set(id, url))
        return url
    }

    const getAsyncData = (fileList:any) => {
        // console.log('fileList', fileList)
        fileList &&  fileList.forEach(async(item:any)=>{
            // await getImg(item.id)
            item['imageUrl'] = await getImg(item.id)
            item['fileType'] = 'ddddd'
        })
        setTimeout(()=>{
            setState({
                fileList: fileList && [...fileList],
                loading: false
            })
        }, 500)
      }

    useEffect(()=>{
        getAsyncData(fileList)
    }, [fileList])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files }:any = e.target
        if(files.length !==0){
            const nextFileList = state.fileList
            files[0]['uid'] = getUid()
            files[0]['status'] = 'uploading'
            
            // 生成base64缩略图
            getBase64(files[0], imageUrl => {
                const fileIndex = nextFileList.findIndex((uid:string) => uid === files[0].uid)
                if (fileIndex === -1) {
                    nextFileList.push({ uid:files[0].uid, imageUrl, id:'', fileName: files[0].name, status: 'uploading'});
                }
                setState({
                    fileList: [...nextFileList],
                    loading: true
                })
                // 提交
                const formData = new FormData() // FormData 对象
                formData.append('file', files[0]) // 文件对象
                formData.append('fileType', '') // 附件类型编码，字典code
                formData.append('ownerId', ownerId) // 文件对象
                uploadAttachFile(formData).then((val)=>{
                    const {code, result}:any = val
                    if(code===200){
                        const targetItem = nextFileList.filter((item:any) => item['uid'] === files[0].uid)[0]
                        targetItem['id'] = result.id
                        targetItem['status'] = 'done'
                        // setTimeout(()=>{
                            setState({  
                                fileList: [...nextFileList],
                                loading: false
                            })
                            setIds(
                                [...ids, result.id] 
                            )
                            // callback&&callback([...ids, result.id] )
                        // }, 200)
                    }else{
                        const targetItem = nextFileList.filter((item:any) => item['fileName'] === result.fileName)[0]
                        targetItem['id'] = result.id
                        targetItem['status'] = 'error'
                        setState({
                            fileList: [...state.fileList],
                            loading: false
                        })
                    }
                })

            })
        }
    }

    const handleDownload=(item:any)=>{
        const {id, fileName } = item
        // console.log('id1', id)
        getAttachFile(id)
        //  axios.get(`http://192.168.7.221:8080/attachFile/get/${id}`, {
        // // axios.get(`http://localhost:3001/attachFile/get/2db5e4a034311ea772efd6f7db4b28ae`, {
        //     headers: {
        //       'Content-Type': 'application/octet-stream',
        //       'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6IjAwMSIsInJvbGVJZCI6IjEsMiIsInVzZXJOYW1lIjoiYWRtaW4iLCJleHAiOjE2MDk3OTcyNjAsInVzZXJJZCI6IjEiLCJhY2NvdW50IjoiYWRtaW4ifQ.vdEJKDqwRB1xOoypxbK8GOelu-M8R_6oqkCeUGqttpw'
        //     },
        //     responseType: 'arraybuffer',})
        .then((res:any) => {
            var b = new Blob([res])
            var url = URL.createObjectURL(b) // 创建指向参数b的URL
            var link = document.createElement('a')
            // 设置导出的文件名
            link.download = fileName
            link.href = url
            // 点击获取文件
            link.click();
        })
    }

    const handleDelete=(id:any)=>{
        console.log('id2', id)
        setState({  
            fileList: [...state.fileList],
            loading: false
        })
        deleteAttachFile(id).then(res=>{
            const {code, message}:any = res
            if(code === 200){
                var idIndex = state.fileList.findIndex((item:any, index:number) => {
                    return item.id === id
                })
                const arrs= state.fileList
                arrs.splice(idIndex, 1)
                setState({
                    fileList: arrs,
                    loading: false
                })

                var i = ids.findIndex((item:any, index:number) => {
                    return item === id
                })
                const nIds = ids
                nIds.splice(i, 1)
                setIds(
                    [...nIds] 
                )
                // callback&&callback([...nIds])
                Message.success(message)
            }else{
                Message.error(message)
            }
        })
    }

    useImperativeHandle(ref, () => ({
        getfileIds: () => {
            let arr:string[] = []
           state.fileList.map((item:any)=>(
                arr.push(item.id)
            ))
           return arr
        },
        setfileList:(fileList:any[])=> getAsyncData(fileList)
    }))

    const onCancel=()=>{
        setShowImg({
            previewVisible: false,
            previewTitle:'',
            previewImage: ''
        })
    }

    const onPreview=(imgUrl:string)=>{
        setShowImg({
            previewVisible: true,
            previewTitle:'',
            previewImage: imgUrl
        })
    }

    return (
        <>
        <div className="upload-list" ref={ref}>
          {
            state.fileList && state.fileList.length>0 && state.fileList.map((item:any,index:number)=>
                  <div key={index} className="upload-list-item">
                      <Spin tip="Loading..." spinning={item.status === 'uploading'}>
                        <div className="upload-list-item-info" onClick={()=> onPreview(item.imageUrl)}>
                            <img src={item.imageUrl} alt="avatar" style={{ width: '100%' }} />
                            
                        </div>
                        {!disable? <div className="upload-list-item-actions">
                            <Button type="link" size="small" onClick={()=>handleDownload(item)}>下载</Button>
                            <Button type="link" size="small" onClick={()=>handleDelete(item.id)}>删除</Button>
                        </div>:''}
                      </Spin>
                  </div>
              )
          }
          {
            (!state.loading && !disable)?  <div className="upload-list-item-info upload-select">
              <span tabIndex={0} className="upload" role="button">
                  {/* <input type="file" ref={ref} onChange={onChange} className="upload-input"   accept={accept} multiple={multiple}
                  style={{display: "none"}}
                   onClick={e => e.stopPropagation()}/> */}
                   <input type="file" onChange={onChange} multiple={multiple} accept={accept}></input>
                  <div>
                      <PlusOutlined />
                      <div style={{marginTop: '8px'}}>上传</div>
                  </div>
              </span>
          </div> :''
          }
        </div>

        <Modal
          visible={showImg.previewVisible}
          title={showImg.previewTitle}
          footer={null}
          onCancel={onCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={showImg.previewImage} />
        </Modal>
        </>
    )
})

SingleUpload.defaultProps = {
    multiple: false,
    disable: false
}

export default SingleUpload
