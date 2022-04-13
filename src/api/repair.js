import request from "../request/request.js"
// 查询维修工单列表
export function listCard(data) {
  return request({
    url: '/eoms/repair/card/list',
    method: 'get',
    data: data
  })
}

// 查询维修工单详细
export function getCard(repairId) {
  return request({
    url: '/eoms/repair/card/' + repairId,
    method: 'get'
  })
}

// 新增维修工单
export function addCard(data) {
  return request({
    url: '/eoms/repair/card',
    method: 'post',
    data: data
  })
}

// 修改维修工单
export function updateCard(data) {
  return request({
    url: '/eoms/repair/card',
    method: 'put',
    data: data
  })
}

// 删除维修工单
export function delCard(repairId) {
  return request({
    url: '/eoms/repair/card/' + repairId,
    method: 'delete'
  })
}

// 导出维修工单
export function exportCard(data) {
  return request({
    url: '/eoms/repair/card/export',
    method: 'post',
    data: data
  })
}
