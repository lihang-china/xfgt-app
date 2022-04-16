import request from "../request/request.js"
// 查询班次管理日历
export function daysList(data) {
  return request({
    url: '/eoms/base/schedule/days/list',
    method: 'get',
	data:data
  })
}
// 查询班次管理日历
export function manualList(data) {
  return request({
    url: '/eoms/base/schedule/manual/list',
    method: 'get',
	data:data
  })
}
// 新增值班日志
export function attendanceRecord(data) {
  return request({
    url: '/eoms/base/attendance/record',
    method: 'post',
	data:data
  })
}
// 查询日志列表
export function attendanceRecordList(data) {
  return request({
    url: '/eoms/base/attendance/record/list',
    method: 'get',
	data:data
  })
}
//根据员工id和日期查询日志列表
export function attendanceRecordListId(data) {
  return request({
    url: '/eoms/base/attendance/record/listByDay',
    method: 'get',
	data:data
  })
}
// 考勤统计
export function clockCount(data) {
  return request({
    url: '/eoms/base/attendance/list',
    method: 'get',
	data:data
  })
}
// 考勤补卡
export function clockoffsetCard(data) {
  return request({
    url: '/eoms/base/attendance/offsetCard',
    method: 'get',
	data:data
  })
}
// 打卡(上班/下班)
export function clocked(data) {
  return request({
    url: '/eoms/base/attendance',
    method: 'post',
	data:data
  })
}
// 排班日历查询
export function selClass(data) {
  return request({
    url: 'eoms/base/attendance/list/schedules',
    method: 'get',
	data:data
  })
}