import {
		getToken
	} from "/src/request/token.js"
	export function upLoad(data) {
		var baseUrl = process.env.VUE_APP_BASEURL ? process.env.VUE_APP_BASEURL : '/'
		// #ifdef APP
		//以为app不存在跨域，所以不需要代理
		baseUrl = "http://115.29.201.75:8080"
		// #endif
		let a = new Promise((resolve, reject) => {
			uni.uploadFile({
				url: baseUrl + data.url,
				filePath: data.path,
				name: data.name,
				header: {
					'Authorization': 'Bearer ' + getToken(),
				},
				success: (res) => {
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
		return a
	}
