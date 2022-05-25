import {
	getToken
} from "./token.js"
var baseUrl = process.env.VUE_APP_BASEURL ? process.env.VUE_APP_BASEURL : '/'
// #ifdef APP
//以为app不存在跨域，所以不需要代理
baseUrl = "http://xxxxxxx:8080"
// #endif
const uapi = function(Data) {
	return new Promise((resolve, reject) => {
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
				if (res.data.code == 401) {
					uni.redirectTo({
						url: '/pages/login/index'
					})
				} else if (res.data.code == 500) {
					uni.$u.toast('服务器错误，请稍后再试')
				}
				if (res.data.code == 200) {
					resolve(res.data)
				}
			},
			fail(err) {
				reject(err.data)
			}
		})
	}).catch(err => {
		uni.$u.toast('服务器连接超时，请稍后再试')
	})

}
export default uapi
