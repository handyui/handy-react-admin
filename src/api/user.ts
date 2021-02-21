import { request } from '@/utils/api.request'


// wholeObject: { a: string, b?: number } let { a, b = 1001 } = wholeObject;
export const login = ({loginName, passWord} : {loginName: string, passWord: string}) => {
    
console.log(process.env)
  return  request.post(`/sys/login?loginName=${loginName}&passWord=${passWord}`)}

export const loginOut = () => request.post('/sys/loginOut')