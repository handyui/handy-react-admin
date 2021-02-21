import React, { FC, useState, useEffect, useRef} from 'react'
import DetailPage from './allDetail'

const AddPage:FC = (props) =>{
    return (
      <>
        <DetailPage modalType='add'/>
      </>
  )
}

export default AddPage