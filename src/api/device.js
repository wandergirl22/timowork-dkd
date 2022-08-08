import request from '@/utils/request'
export function getDeviceListApi(params) {
  return request({
    url: '/vm-service/vm/search',
    params
  })
}
// 策略列表
export function getPolicyListApi(data) {
  return request({
    url: '/vm-service/policy',
    data
  })
}



// 售货机策略
export function getVmPoliceApi(code) {
  return request({
    url: '/vm-service/policy/vmPolicy/' + code
  })
}
