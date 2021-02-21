import React, { FC, useState, useEffect, useRef} from 'react'
import { useLocation } from 'react-router-dom'
import DetailPage from './allDetail'

const EditPage:FC = (props) =>{
    const location:any = useLocation()
    const detailRef = useRef()

    useEffect(()=>{
      (detailRef as any).current.forceUpdate()
    }, [location.state])
    
    return (
      <>
        <DetailPage ref={detailRef} modalType='edit' />
      </>
  )
}

export default EditPage