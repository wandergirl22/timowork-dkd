import request from '@/utils/request'

/**
 * 获取订单管理
 * @param {Object} params
 * pageIndex是
 * pageSize	是
 * orderNo	是
 * startDate是 开始日期
 * endDate  是 结束日期
 * @returns
 */
export function getOrderList(params) {
  return request({
    url: '/order-service/order/search',
    params
  })
}
// /api/task-service/task/search?pageIndex=1&pageSize=10&isRepair=false
/**
 * 获取运营工单
 * @param {Object} params
 * pageIndex	页码
 * pageSize	每页数据
 * taskCode	工单编号
 * status		1:待办;2:进行;3:取消;4:完成	工单状态
 * isRepair true：运维工单;false：运营工单
 * @returns Promise对象
 */
export function getOperationList(params) {
  return request({
    url: '/task-service/task/search',
    params
  })
}

/**
 * 获取工单详情
 * @param {Number} id 工单Id
 * @returns Promise对象
 */
export function getCheckDetails(id) {
  return request({
    url: '/task-service/task/taskInfo/' + id
  })
}



// ----------------------------------------
/**
 * 获取工单状态
 * @returns Promise对象
 */
export function getOperationStatesList() {
  return request({
    url: 'task-service/task/allTaskStatus'
  })
}

/**
 * 获取所有工单类型
 * @returns  Promise对象
 */
export function getOperationType() {
  return request({
    url: '/task-service/taskType/list'
  })
}

