export function getToken() {
	return uni.getStorageSync('token')
}
export async function setToken(token) {
	uni.setStorage({
		key: 'token',
		data: token,
	})
}
