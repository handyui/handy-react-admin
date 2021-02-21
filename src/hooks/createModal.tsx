
import React, { FC, useState, useEffect, useRef, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { Modal } from 'antd'

// interface Options {
//     callback?: (...rest:any[]) => any;
//     [key: string]: any;
// }
const createModal=(children:any, options:any)=>{
  const {title, callback}:any = options
  Modal.confirm({
    title: {title},
    content: (
        <>
           {/* {children} */}
        </>
    ),
    onOk: async () => {
        console.log('~~~~')
        callback()
    }
})

  
}

export default createModal