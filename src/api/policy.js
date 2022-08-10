import request from '@/utils/request'

// ?pageIndex=1&pageSize=10
/**
 * 获取策略列表
 * @param {Object} params
 * pageIndex	页码
 * pageSize		页数
 * policyName	策略名
 * @returns promise对象
 */
export function getPolicyListApi(params) {
  return request({
    url: 'vm-service/policy/search',
    params
  })
}

/**
 * 查询售货机策略
 * @param {*} innerCode 售货机编号
 * @returns
 */
export function searchPolicyApi(innerCode) {
  return request({
    url: '/vm-service/policy/vmPolicy/' + innerCode
  })
}

/**
 * 根据策略搜索售货机详情
 * @param {Object}
 * policyId   策略id
 * pageIndex	页码
 * pageSize		页数
 * @returns promise对象
 */
export function getpolicySearchApi(params) {
  return request({
    url: 'vm-service/policy/vmList',
    params
  })
}
