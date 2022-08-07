// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import { getTokenTime } from '@/utils/auth'
import store from '@/store'
import router from '@/router'

function isTime() {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 100000
  return currentTime - tokenTime > timeout
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
// 请求拦截器
service.interceptors.request.use((config) => {
  if (store.state.login.token) {
    config.headers.Authorization = store.state.login.token
  }
  return config
})
// 响应拦截器
service.interceptors.response
  .use
  // (res) => {
  //   const { success, data, message } = res.data;
  //   if (success) {
  //     return ;
  //   }
  //   Message.error(message);
  //   return Promise.reject(new Error(message));
  // },
  // async function (error) {
  //   if(error?.response?.status===401){
  //     Message.error('登录过期')
  //     await store.dispatch('login/logout')
  //     router.push('/login')
  //   }else{
  //     Message.error(error.message)
  //   }
  //     return Promise.reject(error);
  //   }
  ()
export default service // 导出axios实例
