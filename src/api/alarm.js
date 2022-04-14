import request from "../request/request.js"
// 查询班次管理日历
export function alarmList(data) {
  return request({
    url: '/iot/alarm-record/list',
    method: 'get',
	data:data
  })
}