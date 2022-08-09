import request from "@/utils/request";

/**
 * 区域列表
 * @returns Promise对象
 */
export const getregionListApi = (data) => {
  return request({
    method: 'GET',
      url: '/vm-service/region/search',
    params:data
  })
}
/**
 * 删除区域
 * @returns Promise对象
 */
export const delregionApi = (id,data) => {
  return request({
    method: 'DELETE',
        url: `/vm-service/region/${id}`,
      data
  })
}
/**
 * 新增区域
 * @returns Promise对象
 */
export const addregionApi = (data) => {
  return request({
    method: 'POST',
        url: '/vm-service/region',
        data
  })
}
/**
 * 区域详情
 * @returns Promise对象
 */
export const regionInfoApi = (regionId) => {
  return request({
    method: 'GET',
      url: `/vm-service/region/${regionId}`
  })
}
/**
 * 点位搜索
 * @returns Promise对象
 */
export const NodeSearchApi = (data) => {
  return request({
    method: 'GET',
        url: '/vm-service/node/search',
      params: data
  })
}


/**
 * 修改区域
 * @returns Promise对象
 */
export const editregionApi = (id,data) => {
  return request({
    method: 'PUT',
      url: `/vm-service/region/${id}`,
      data
  })
}


/**
 * 商圈列表
 * @returns Promise对象
 */
export const businessListApi = () => {
  return request({
    method: 'get',
      url: '/vm-service/businessType',
  })
}
/**
 * 点位搜索
 * @returns Promise对象
 */
export const NodeListApi = (data) => {
  return request({
    method: 'get',
          url: '/vm-service/node/search',
        params:data
  })
}
/**
 * 点位详情
 * @returns Promise对象
 */
export const NodeInfoApi = (id) => {
  return request({
    method: 'get',
    url: `/vm-service/node/vmList/${id}`,
  })
}

/**
 * 新增点位
 * @returns Promise对象
 */
export const AddNodeApi = (data) => {
  return request({
    method: 'POST',
     url: '/vm-service/node',
    data
  })
}
/**
 * 修改点位
 * @returns Promise对象
 */
export const editNodeApi = (id,data) => {
  return request({
    method: 'PUT',
     url: `/vm-service/node/${id}`,
    data
  })
}
/**
 * 删除点位
 * @returns Promise对象
 */
export const delNodeApi = (id) => {
  return request({
    method: 'DELETE',
     url: `/vm-service/node/${id}`,
  })
}

/**
 * 合作商搜索
 * @returns Promise对象
 */
export const partnerInfoApi = (data) => {
  return request({
    method: 'get',
        url: '/user-service/partner/search',
       params:data
  })
}