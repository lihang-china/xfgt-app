import request from "../request/request.js"
// 查询巡检任务 列表
export function patrollistTask(data) {
  return request({
    url: '/eoms/patrol/task/list',
    method: 'get',
    data: data
  })
}

// 查询巡检任务 详细
export function getTask(taskId) {
  return request({
    url: '/eoms/patrol/task/' + taskId,
    method: 'get'
  })
}

// 新增巡检任务
export function addTask(data) {
  return request({
    url: '/eoms/patrol/task',
    method: 'post',
    data: data
  })
}

// 修改巡检任务
export function updateTask(data) {
  return request({
    url: '/eoms/patrol/task',
    method: 'put',
    data: data
  })
}

// 删除巡检任务
export function delTask(taskId) {
  return request({
    url: '/eoms/patrol/task/' + taskId,
    method: 'delete'
  })
}

// 导出巡检任务
export function exportTask(data) {
  return request({
    url: '/eoms/patrol/task/export',
    method: 'get',
    data: data
  })
}