import request from '@/utils/request'

/**
 * 获取补货详情
 * @param {*} id 工单Id
 * @returns Promise对象
 */
export function getReplenishDetails(id) {
  return request({
    url: '/task-service/taskDetails/' + id
  })
}

/**
 * 获取补货预警值
 * @returns Promise对象
 */
export function getAlertValue() {
  return request({
    url: '/task-service/task/supplyAlertValue'
  })
}

/**
 * 设置自动补货工单阈值
 * @param {Number} data 预警值(百分比)
 * @returns Promise对象
 */
export function setAlertValue(data) {
  return request({
    url: '/task-service/task/autoSupplyConfig',
    method: 'post',
    data
  })
}

/**
 * 获取售货机货道详情
 * @param {*} innerCode 售货机编号
 * @returns Promise对象
 */
export function getSellDetails(innerCode) {
  return request({
    url: '/vm-service/channel/channelList/' + innerCode
  })
}
