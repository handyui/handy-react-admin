
import React, { FC, useState, useEffect } from 'react'

const OtherPage:FC=()=>{
    return (
        <ul className="list-icons hidden-sm">
            <li>
                <i className="wb-check"></i>1、请使用windows平台设备登录本系统
            </li>
            <li><i className="wb-check"></i>2、请使用<a href="https://www.google.cn/intl/zh-CN/chrome/"><span style={{fontSize:'16px'}}>Chrome浏览器</span></a></li>
        </ul>
    )
}

export default OtherPage