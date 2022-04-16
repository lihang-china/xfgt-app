import request from "../request/request.js"
// 查询班次管理日历
export function getknowList(data) {
  return request({
    url: '/eoms/base/knownLedge/list',
    method: 'get',
	data:data
  })
}


export function fileunLoad(data) {
  return request({
    url: '/eoms/base/file/upload',
    method: 'post',
	data:data,
  })
}