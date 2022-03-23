const baseUrl = process.env.VUE_APP_BASEURL ? process.env.VUE_APP_BASEURL : '/'
const uapi = () => {
	uni.request({
		url: baseUrl + "",
		data: undefined,
		header: {
			'Authorization': 'Bearer ' + getToken(),
			'Content-Type': 'application/json'
		},
	})
}
