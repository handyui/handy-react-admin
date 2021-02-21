import React, { FC, useState } from 'react'
import { Layout } from 'antd'
import './index.scss'
import Sidebar from './sidebar/index'
import HeadPage from '@/layout/header/index'
import TabPage from '@/layout/tab/index'

const LayoutPage: FC = (props) => {
  const {children} = props
    const [state, setState] = useState({ collapsed: false})

    const toggle = () =>{
      setState({collapsed: !state.collapsed})
    }
    
    return(
      <Layout id="basic-layout">
        <Sidebar collapsed={state.collapsed} /> 
        <Layout className="site-layout">
          <HeadPage toggle={toggle}/>
          <TabPage />
          <div className="ant-layout-content site-layout-background">
            {children}
          </div>
        </Layout>
      </Layout>
    )
}

export default LayoutPage
