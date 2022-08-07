import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
// 获取订单管理
export function getOrderList(params) {
  return request({
    url: '/order-service/order/search',
    params
  })
}
// /api/task-service/task/search?pageIndex=1&pageSize=10&isRepair=false
// 获取运营工单
export function getOperationList(params) {
  return request({
    url: '/task-service/task/search',
    params
  })
}
// 获取运营工单状态
export function getOperationStatesList() {
  return request({
    url: 'task-service/task/allTaskStatus'
  })
}
// 查看详情
export function getCheckDetails(id) {
  return request({
    url: '/task-service/task/taskInfo/' + id
  })
}
