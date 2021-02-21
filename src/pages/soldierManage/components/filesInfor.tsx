import React, {forwardRef, useContext} from 'react'
import {SingleUpload} from '@/components/upload'
import {Context} from './allDetail'

interface FilesInforProps{
  fileList?:any
}

const FilesInfor = forwardRef<any, FilesInforProps>((props, ref) => {
    const getContext = useContext(Context)
    const { modalType, resData, fileList } = getContext

    return (
      <>
       <SingleUpload ref={ref} ownerId={resData?resData.veteransId:''}  fileList={fileList}  disable={modalType === 'detail'? true:false}/>
       </>
    )
})

export default FilesInfor