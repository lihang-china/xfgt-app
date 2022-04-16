import request from "../request/request.js"
// 查询班次管理日历
export function userDetail(ID) {
  return request({
    url: '/eoms/base/staff/query/' + ID,
    method: 'get'
  })
}