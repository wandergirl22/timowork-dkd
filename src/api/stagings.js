import request from '@/utils/request'
/**
 * 获取工单数
 * @param {*} start 开始时间 YY-MM-DD HH:MM:SS
 * @param {*} end   结束时间 YY-MM-DD HH:MM:SS
 * @returns Promise对象
 */
export function getUserWork(start, end) {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}
/**
 * 获取销售数
 * @param {Object} data
 * start 开始时间
 * end 结束时间
 * @returns Promise对象
 */
export function getregionCollect(data) {
  return request({
    url: '/order-service/report/orderAmount',
    params: data
  })
}
/**
 * 获取订单总数
 * @param {Object} data
 * start 开始时间
 * end 结束时间
 * @returns Promise对象
 */
export function getregionOrderCount(data) {
  return request({
    url: '/order-service/report/orderCount',
    params: data
  })
}

// 线型图
/**
 * 获取销售额统计
 * @param {*} collectType 统计时间类型，1:按日统计，2:按月统计
 * @param {*} start 开始日期 YYYY-MM-DD
 * @param {*} end   结束日期 YYYY-MM-DD
 * @returns Promise对象
 */
export function getregionAmountCollect(collectType, start, end) {
  return request({
    url: `/order-service/report/amountCollect/${collectType}/${start}/${end}`
  })
}

// 柱状图
/**
 * 根据地区汇总销售额数据(销售量分布)
 * @param {*} start 开始日期 YYYY-MM-DD
 * @param {*} end   结束日期 YYYY-MM-DD
 * @returns Promise对象
 */
export function getOrderAmount(start, end) {
  return request({
    url: `/order-service/report/regionCollect/${start}/${end}`
  })
}

/**
 * 获取点位总数
 * @returns Promise对象
 */
export function getNodeCount() {
  return request({
    url: '/vm-service/node/count'
  })
}
/**
 * 获取合作商总数
 * @returns Promise对象
 */
export function getPrtnerCount() {
  return request({
    url: '/user-service/partner/count'
  })
}
/**
 * 合作商点位汇总统计
 * @returns Promise对象
 */
export function getnodeCollect() {
  return request({
    url: '/vm-service/node/nodeCollect'
  })
}
/**
 * 获取top排行
 * @param {Number}} topValue 前几的商品 10
 * @param {*} start 开始日期 YYYY-MM-DD
 * @param {*} end   结束日期 YYYY-MM-DD
 * @returns Promise对象
 */
export function getSkuTop(topValue, start, end) {
  return request({
    url: `/order-service/report/skuTop/${topValue}/${start}/${end}`
  })
}
