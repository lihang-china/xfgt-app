import {
	getToken
} from "./token.js"
var baseUrl = process.env.VUE_APP_BASEURL ? process.env.VUE_APP_BASEURL : '/'
// #ifdef APP
//以为app不存在跨域，所以不需要代理
baseUrl = "http://xxx.xx.xxx.xx:8080"
// #endif
const uapi = function(Data) {
	return new Promise((resolve, reject) => {
		console.log(Data)
		uni.request({
			url: baseUrl + Data.url,
			data: Data.data,
			method: Data.method,
			timeout: 10000,
			header: {
				'Authorization': 'Bearer ' + getToken(),
				'Content-Type': 'application/json'
			},
			success(res) {
				resolve(res.data)
			},
			fail(err) {
				reject(err.data)
			}
		})
	}).catch(res => {
		console.log(res, 'erro')
	})

}
export default uapi
