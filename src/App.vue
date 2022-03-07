<script>
	import {
		getToken
	} from '/src/request/token.js'
	export default {
		onLaunch: function() {
			uni.hideTabBar()
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
		},
		onShow: function() {

			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>
<style lang="scss">
	uni-tabbar .uni-tabbar {
		* {
			border: 1px solid red !important;
		}

		display: none !important;

	}

	.uni-app--showleftwindow+.uni-tabbar-bottom {
		display: none;
	}

	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "./public/css/main.scss";
</style>
