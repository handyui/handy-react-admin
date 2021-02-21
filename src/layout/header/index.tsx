import React, {FC, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Layout, Menu, Modal, Avatar, Dropdown} from 'antd'
import { LoginOut } from '@/store/actions'
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, ExpandOutlined, CompressOutlined } from '@ant-design/icons'
const { Header } = Layout

interface HeadPage{
  toggle: ()=>void
}

const HeadPage:FC<HeadPage> =(props)=>{

  const { toggle } = props

   const dispatch = useDispatch()
   const [collapsed, setCollapsed] = useState(false)
   const [fullscreen, setFullscreen] = useState(false)
   const loginOut = () => {
      // 显示确认框
      Modal.confirm({
        content: '确定退出吗?',
        onOk: () => {
          dispatch(LoginOut())
        }
      })
    }

    const menu = (
      <Menu>
        <Menu.Item key="loginOut" onClick={loginOut}>退出登录</Menu.Item>
      </Menu>
    )

    const handleToggle=()=>{
      setCollapsed(!collapsed)
      toggle && toggle()
    }

    const full=(num:number)=>{
      num = num || 1;
      num = num * 1;
      let docElm = document.documentElement as any
      switch (num) {
        case 1:
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
          } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
          } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
          }
          setFullscreen(true)
          break;
        case 2:
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
          } else if ((document as any).webkitCancelFullScreen) {
            (document as any).webkitCancelFullScreen();
          } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
          }
          setFullscreen(false)
          break;
      }
    }
      
    return (
        <Header className="header">
          {/* <div id="header"> */}
            <div className="prev-menu">
              {/* <MenuUnfoldOutlined
                className="trigger menu-item"
                onClick={trigger}
              /> */}
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: handleToggle,
              })}
            </div>
            <div className="next-menu">
              <div className="icon-expand">
                {!fullscreen? <ExpandOutlined className="expand menu-item" onClick={()=>full(1)} /> :
              <CompressOutlined className="expand menu-item" onClick={()=>full(2)} /> }
              </div>
              <Dropdown overlay={menu}  placement="bottomCenter" arrow>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <Avatar  icon={<UserOutlined />} />
                </a>
              </Dropdown>
            </div>
    </Header> 
    )
}

export default HeadPage
