import React, { useRef } from 'react';
import { useDispatch } from 'react-redux'
import {Login} from '@/store/actions'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'
import '@/assets/style/login.scss'

const LoginPage: React.FC = (props) => {
  const dispatch = useDispatch()
  const formRef = useRef<FormInstance>(null)

  const handleLogin = async () =>{
    formRef.current && formRef.current.validateFields().then(async(values:any)=>{
      dispatch(Login(values))
  }).catch(() => console.log('出错!'))
    
  }

  return (
    <div className="login">
      <div className="login-box">
        <div className="login-title">Handy React Admin</div>
        <Form
          ref={formRef} 
          name="normal_login"
          className="login-form"
          // initialValues={{ loginName: '111', passWord:'222' }}
        >
          <Form.Item
            name="loginName"
            rules={[{ required: true, message: '请输入账号或手机号' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号或手机号"  size="large"/>
          </Form.Item>
          <Form.Item
            name="passWord"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
              size="large"
            />
          </Form.Item>
            <Button type="primary" className="login-form-button" size="large" block onClick={handleLogin}>
              登录
            </Button>
          </Form>
        </div>
        <div className="leftbg"></div>
    </div>
  );
}

export default LoginPage
