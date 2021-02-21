import React, { FC } from 'react'
import {createFromIconfontCN } from '@ant-design/icons'

const MyIconFont = createFromIconfontCN({
    // scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    // scriptUrl: '//at.alicdn.com/t/font_2184398_zflo1kjcemp.js',
    // iconfont字体图标本地化，详见：/public/iconfont.js
    scriptUrl: '',
})

interface IconFontProps{
    type: string
    color?: string
    size?: number|string
    callback?:()=>void
}

const IconFont:FC<IconFontProps> = (props) =>{
    const {type, color, size, callback}:any = props
    return (
        <>
            <MyIconFont type={type || ''}  style={{fontSize:`${size}px`, color:`${color}`}} onClick={callback}/>
        </>
    )
}

IconFont.defaultProps = {
    color: 'unset',
    size: 14
}

export default IconFont
