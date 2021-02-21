import React, { FC, useEffect, useRef} from 'react'
import { useLocation } from 'react-router-dom'
import DetailPage from '../allDetail'

interface editPageProps{
  urlName?:string
  preType?:string
}

const EditPage:FC<editPageProps> = (props) =>{
    const {urlName, preType} = props
    const location:any = useLocation()
    const {pathname, state} = location
    const detailRef = useRef()
    useEffect(()=>{
      const index = pathname.lastIndexOf("/")
      const path = pathname.substring(0, index)
      if(state && (state as any).refresh && path === `/soldierManage/${urlName}/detail`){
        (detailRef as any).current.forceUpdate()
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])
    return (
      <DetailPage ref={detailRef} modalType='detail' preType={preType} />
  )
}

export default EditPage





