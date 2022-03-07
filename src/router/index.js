import Vue from 'vue'
import {
	getToken
} from '/src/request/token.js'
//白名单
const whiteList = ['/pages/register/index']
exports.install = function() {
	Vue.prototype.$url = function(url, type = undefined) {
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
}
