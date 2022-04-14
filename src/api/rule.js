import request from "../request/request.js"
// 查询班次管理日历
export function selectRule(data) {
  return request({
    url: '/eoms/base/attendance/roles',
    method: 'get',
	data:data
  })
}