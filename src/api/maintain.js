import request from "../request/request.js"
// 查询保养任务列表
export function listTask(data) {
  return request({
    url: '/eoms/maintain/task/list',
    method: 'get',
    data: data
  })
}
// 查询保养任务详细
export function getTask(taskId) {
  return request({
    url: '/eoms/maintain/task/' + taskId,
    method: 'get'
  })
}

// 新增保养任务
export function addTask(data) {
  return request({
    url: '/eoms/maintain/task',
    method: 'post',
    data: data
  })
}

// 修改保养任务
export function updateTask(data) {
  return request({
    url: '/eoms/maintain/task',
    method: 'put',
    data: data
  })
}

// 删除保养任务
export function delTask(taskId) {
  return request({
    url: '/eoms/maintain/task/' + taskId,
    method: 'delete'
  })
}

// 导出保养任务
export function exportTask(data) {
  return request({
    url: '/eoms/maintain/task/export',
    method: 'get',
    data: data
  })
}
