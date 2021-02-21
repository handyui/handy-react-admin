import React, { FC } from 'react'
import {IconFont} from '../iconfont'
import icons from './icons'
import './index.scss'

interface IconSelectorProps{
    selectIcon:(item:object)=>void
}

const IconSelector:FC<IconSelectorProps> = (props) =>{
    const {selectIcon} = props
    const handleSelectedIcon=(item:any)=>{
        console.log('item', item)
        selectIcon && selectIcon(item)
    }

    return (
        <div>
            {
                icons.map((v:any, index)=>(   
                    <ul className="icon-select" key={index}>
                        { v.icons.map((item:any)=>(
                            <li key={item.code} onClick={()=>handleSelectedIcon(item)}>
                                <IconFont type={item.code} size="26" />
                            </li>
                        ))
                        }
                    </ul>
                ))    
            }
        </div>
    )
}


export default IconSelector