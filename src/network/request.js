import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://106.54.54.237:8000/api/v1',
    baseURL : 'http://123.207.32.32:8000/api/vip',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    // 请求成功的时候的拦截
    return config
    // 请求成功的时候的拦截
  }, err => {
    // console.log(err);
    // 请求失败的时候的拦截    
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    // 响应成功的拦截
    return res.data
  }, err => {
    // 响应成功的拦截
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
