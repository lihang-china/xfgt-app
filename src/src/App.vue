<script>
	import {
		setToken,
		getToken
	} from '/src/request/token.js'
	export default {
		onLaunch: function() {
		},
		onShow: function() {
			uni.hideTabBar()
			this.uniInit()
			console.log(process.env.VUE_APP_BASEURL, 'App Show')

		},
		onHide: function() {
			console.log('App Hide')
		},
		data() {
			return {
				speed: 0,
			}
		},
		methods: {
			uniInit() {
				if (getToken()) {
					//手动关闭启动页面
					//存在则关闭启动页进入首页
					// #ifdef APP
					plus.navigator.closeSplashscreen();
					// #endif
				} else {
					uni.reLaunch({
						url: "pages/login/index",
						success: () => {
							// #ifdef APP
							plus.navigator.closeSplashscreen();
							// #endif
						}
					})
				}
			}
		}
	}
</script>
<style lang="scss">
	.uni-app--showleftwindow+.uni-tabbar-bottom {
		display: none;
	}

	.uni-modal {
		border-radius: 5px !important;
		background-color: rgb(251, 252, 253) !important;
		width: 160px !important;

		div {
			font-size: 12px !important;

		}
	}

	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "./public/css/main.scss";
</style>
