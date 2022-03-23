import {
	getToken
} from '/src/request/token.js'
//白名单
const whiteList = ['/pages/register/index']
 export function $url(url, type){
		if (getToken() || whiteList.includes(url)) {
			if (!type) {
				uni.navigateTo({
					url: url
				})
			} else if (type === 1) {
				uni.switchTab({
					url: url
				})
			}
		} else {
			uni.redirectTo({
				url: '/pages/login/index'
			})
		}
	}
