import React, { FC, useState, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
// import {connect} from 'react-redux'
import { Layout, Menu } from 'antd'
import { useSelector} from 'react-redux'
import {list2tree} from '@/utils/index'
import {IconFont} from '@/components/iconfont'
import logo from '@/assets/images/logo.png'
import smallLogo from '@/assets/images/logo_small.png'
import { RootState } from '@/store/types'
// import {
//     MenuUnfoldOutlined,
//     MenuFoldOutlined,
//     UserOutlined,
//     VideoCameraOutlined,
//     UploadOutlined,
//     MailOutlined,
//     AppstoreOutlined,
//     SettingOutlined
// } from '@ant-design/icons'

const { Sider } = Layout

interface SidebarProps{
    collapsed: boolean
}

interface MenuItemProps{
  menuId:string
  parentId:number
  menuType?:string
  menuPath?:string
  component?:string
  redirect?:string
  menuCode?:string
  title?:string
  icon?:string
  priority?:number
  version?:number
  hidden?:number
}

const Sidebar: FC<SidebarProps> = (props) => {
    const { collapsed } = props
    const location = useLocation()
    const allMenuList = useSelector((state:RootState) => state.userReducer.menu)
    const [menuList, setMenuList] = useState([])
    const  {pathname} = location

    const [selectedKey, setSelectedKey] = useState([pathname])
    // const menu = store.getState().userReducer.menu

    useEffect(()=>{
      // console.log(list2tree(menu))
      setMenuList(list2tree(allMenuList))
      return ()=> {}
    }, [allMenuList]) 

    useEffect(()=>{
     setSelectedKey([pathname])
  }, [pathname])

    const handleClick = () =>{}


    const renderTitle = (meta: any) => {
        /* eslint-disable no-confusing-arrow */
        return (
          <span className="menu-item-inner">
            { meta.icon && <IconFont type={meta.icon} size="14" />}
            <span className="menu-title"> {meta.title} </span>
          </span>
        );
      }

      const renderMenuRoute = (menu: any) => {
        return (
          <Menu.Item key={menu.path}>
            <Link to={menu.path}> {renderTitle(menu.meta)} </Link>
          </Menu.Item>
        );
      }
      
      const renderSubMenu = (menu: any) => {
        return (
          <Menu.SubMenu title={renderTitle(menu.meta)} key={menu.path}>
            {menu.children!.map((item: any) =>
              item.children.length > 0 ? renderSubMenu(item) : renderMenuRoute(item),
            )}
          </Menu.SubMenu>
        );
      }
      
      const renderMenu = (menu: any) => {
        if (menu.children.length > 0) {
          return renderSubMenu(menu)
        }
      
        return renderMenuRoute(menu)
    }

    const getPagePathList =(pathname?: string): any[]=>{
        return (pathname || window.location.pathname)
        .split('/')
        .filter(Boolean)
        .map((value, index, array) => '/'.concat(array.slice(0, index + 1).join('/')))
    }

    return (
        <>
          <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo" >
                {!collapsed? <img className="bLogo" src={logo} alt=""/>:<img src={logo} alt=""/>}
                </div>
              <Menu
                  theme="dark"
                  onClick={handleClick}
                  // style={{ width: 256 }}
                  defaultOpenKeys={getPagePathList(location.pathname)}
                  // selectedKeys={[state.current]}
                  selectedKeys={selectedKey}
                  defaultSelectedKeys={[location.pathname]}
                  mode="inline"
                  >
                      {menuList.map((menu: any) => menu.meta.hidden !==1? renderMenu(menu):'')}
                  </Menu>
          </Sider> 
        </>
    )

}

Sidebar.defaultProps = {
    collapsed: false
}

export default Sidebar
