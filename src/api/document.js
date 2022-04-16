import request from "../request/request.js"
// 查询班次管理日历
export function documentList(data) {
  return request({
    url: '/eoms/base/document/list',
    method: 'get',
	data:data
  })
}