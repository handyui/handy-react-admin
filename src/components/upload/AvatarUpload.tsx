import React, { useEffect, forwardRef, useImperativeHandle, useState} from 'react'
// import { UploadProps, UploadProgressEvent, UploadRequestError, RcFile, Action } from './interface'
import {uploadAttachFile, getAttachFile} from '@/api/file'
import classNames from 'classnames'
// import RcUpload  from 'rc-upload'
// import { FormInstance } from 'antd/lib/form'
;import{ PlusOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
// import { getUid, getFileItem } from './utils'
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
    fileId?: string
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
    const {accept, multiple, fileId, ownerId, className}:any = props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nextFileList, setNextFileList] = useState([] as any[])
    const [state, setState] = useState({
        imageUrl:'', 
        id:'', 
        fileName: '', 
        status: 'done'
    })
    const [imgUrl, setImgUrl] = useState(new Map() as any)

    const getImg=async(id:string)=>{
        let res:any = await getAttachFile(id)
        let b = new Blob([res])
        let url = URL.createObjectURL(b) // 创建指向参数b的URL
        setImgUrl(imgUrl.set(id, url))
        return url
    }

    const getAsyncData = async(id:string) => {
        console.log('getAsyncDatassss', fileId)
        let imageUrl = await getImg(id)
        setState({
            imageUrl, 
            id, 
            fileName: '', 
            status: 'done'
        })
      }

    useEffect(()=>{
        console.log('fileId', fileId)
        getAsyncData(fileId)
    }, [fileId])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files }:any = e.target
        if(files.length !==0){
            // setState({  
            //     imageUrl:'', 
            //     id:'', 
            //     fileName: files[0].name, 
            //     status: 'uploading'
            // })
            // 生成base64缩略图
            getBase64(files[0], imageUrl => {
                nextFileList.push({ imageUrl, id:'', fileName: files[0].name, status: 'uploading'});
                setState({
                    imageUrl, 
                    id:'', 
                    fileName: files[0].name, 
                    status: 'uploading'
                })
                // 提交
                const formData = new FormData() // FormData 对象
                formData.append('file', files[0]) // 文件对象
                formData.append('fileType', '') // 附件类型编码，字典code
                formData.append('ownerId', ownerId) // 文件对象
                uploadAttachFile(formData).then((val)=>{
                    const {code, result}:any = val
                    if(code===200){
                            setState({  
                                imageUrl, 
                                id: result.id, 
                                fileName: files[0].name, 
                                status: 'done'
                            })
                    }else{
                        setState({  
                            imageUrl, 
                            id: result.id, 
                            fileName: files[0].name, 
                            status: 'error'
                        })
                    }
                })

            })
        }
    }

    useImperativeHandle(ref, () => ({
        getfileIds: () => {
           console.log('arr', state.id)
           return state.id
        },
        setfileList:(fileId:string)=> getAsyncData(fileId)
    }))

    const classes = classNames('upload-list avatar-upload', className)

    const uploadClasses = classNames('upload-list-item-info upload-select', {
        'avatar-upload-select': state.imageUrl
    })
    

    return (
        <>
        <div className={classes} ref={ref}>
          {
            state.imageUrl && 
                <div className="upload-list-item">
                    <Spin tip="Loading..." spinning={state.status === 'uploading'}>
                    <div className="upload-list-item-info" >
                        <img src={state.imageUrl} alt="avatar" style={{ width: '100%' }} />
                    </div>
                    </Spin>
                </div>
           
          }
          {
            <div className={uploadClasses} >
              <span tabIndex={0} className="upload" role="button">
                  {/* <input type="file" ref={ref} onChange={onChange} className="upload-input"   accept={accept} multiple={multiple}
                  style={{display: "none"}}
                   onClick={e => e.stopPropagation()}/> */}
                   <input type="file" onChange={onChange} multiple={multiple} accept={accept}></input>
                  <div>
                      <PlusOutlined />
                      <div style={{marginTop: '8px'}}>上传证件照</div>
                  </div>
              </span>
          </div>
          }
        </div>

        </>
    )
})

SingleUpload.defaultProps = {
    multiple: false,
    disable: false
}

export default SingleUpload
