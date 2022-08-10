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

// 取消策略
export function cancelPolicy(innerCode, policyId) {
  return request({
    url: `/vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: 'PUT'
  })
}
// 获取售货机商品销量
export function getShopCollectApi(innerCode, start, end, data) {
  return request({
    url: `/order-service/report/skuCollect/${innerCode}/${start}/${end}`,
    data
  })
}

// 获取售货机补货次数
export function getSupplyApi(innerCode, start, end, data) {
  return request({
    url: `task-service/task/supplyCount/${innerCode}/${start}/${end}`,
    data
  })
}
// 获取售货机维修次数
export function getRepairCountApi(innerCode, start, end, data) {
  return request({
    url: `/task-service/task/repairCount/${innerCode}/${start}/${end}`,
    data
  })
}
// 售货机类型列表(搜索)
export function getvmTypeApi(params) {
  return request({
    url: '/vm-service/vmType/search',
    params
  })
}

// 新增售货机类型
export function setVmDeviceApi(data) {
  return request({
    url: '/vm-service/vmType',
    method: 'POST',
    data
  })
}

// 售货机类型修改
export function setVmTypeApi(typeId, data) {
  return request({
    url: '/vm-service/vmType/' + typeId,
    method: 'PUT',
    data
  })
}

// 新增策略
export function addPolicyApi(data) {
  return request({
    url: '/vm-service/vm/applyPolicy',
    method: 'PUT',
    data
  })
}
// 售货机类型列表
export function getShopVmTypeApi(params) {
  return request({
    url: '/vm-service/vmType/search',
    params
  })
}

// 获取点位
export function getAdressApi(params) {
  return request({
    url: '/vm-service/node/search',
    params
  })
}

// 新增售货机
export function addDeviceApi(data) {
  return request({
    url: '/vm-service/vm',
    method: 'POST',
    data
  })
}

// 修改售货机点位
export function cancelDeveceAddressApi(id, nodeId) {
  return request({
    url: `/vm-service/vm/${id}/${nodeId}`,
    method: 'PUT'
  })
}
// 获取一定时间范围之内的收入
export function getAmountApi(params) {
  return request({
    url: '/order-service/report/orderAmount',
    params
  })
}
// 获取一定时间范围之内的订单总数
export function getCountApi(params) {
  return request({
    url: '/order-service/report/orderCount',
    params
  })
}
