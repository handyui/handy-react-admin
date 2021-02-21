
import React, { FC, useState, useEffect, useRef, ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface Options {
    callback?: (...rest:any[]) => any;
    [key: string]: any;
}

const UseCreateModal = (Component:any, options?:Options) => {
    // const { callback }:any = options
    // const createPortal = ReactDOM.createPortal
    // let dom
    // if(dom)  document.body.removeChild(dom)

    // dom = document.createElement('div') as HTMLElement
   
    // ReactDOM.render(Component(), dom)
    // document.body.appendChild(dom)

    // callback && callback()

    // return createPortal(Component, document.body)
    //  as React.ReactNode

    // const Dom = document.createElement('div')
    // Dom.classList.add('modal-container')
    // document.body.appendChild(Dom)

    // const close = () => {
    //     ReactDOM.unmountComponentAtNode(Dom)
    //     document.body.removeChild(Dom)
    // }

    // ReactDOM.render(Component(), Dom)
    
}

export default UseCreateModal
