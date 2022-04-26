import request from "../request/request.js"
// 查询设备档案列表
export function deviceList(data) {
  return request({
    url: '/eoms/equipment/card/page',
    method: 'get',
	data:data
  })
  }
