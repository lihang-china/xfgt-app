import request from "../request/request.js"
// 查询班次管理日历
export function userDetail(ID) {
  return request({
    url: '/eoms/base/staff/query/' + ID,
    method: 'get'
  })
}
//用户列表
export function userListall() {
  return request({
    url: '/system/user/list/all',
    method: 'get'
  })
}
//维修分类
export function repairTree() {
  return request({
    url: '/eoms/repair/class/treeselect',
    method: 'get'
  })
}
//区域列表
export function areaTree() {
  return request({
    url: '/eoms/base/area/treeselect',
    method: 'get',
  })
}
//组织机构
export function deptTree() {
  return request({
    url: '/system/dept/treeselect',
    method: 'get',
  })
}
//修改个人信息
export function profile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
	data:data
  })
}
//修改个人信息(头像)
export function profileAvatar(data) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
	data:data
  })
}
//系统通知
export function noticeList(data) {
  return request({
    url: '/system/notice/list',
    method: 'get',
	data:data
  })
}