<script>
	export default {
		onLaunch: function() {
			uni.getLocation({
				altitude: true
			}) //用户信息权限
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "./public/css/main.scss";
</style>

