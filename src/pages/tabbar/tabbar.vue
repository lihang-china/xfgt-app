<template>
	<u-tabbar inactiveColor="rgb(42,42,42)" :value="activeIndex" @change="changeBar" :fixed="true" :border="false"
		:placeholder="true" :safeAreaInsetBottom="true">
		<u-tabbar-item class="flex-column" :text="item.title" :icon="item.icon" v-for="(item,index) in itemList"
			:key="index">
		</u-tabbar-item>
	</u-tabbar>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [{
						title: '首页',
						icon: 'home',
						value: "homssePage",
						pagePath: "pages/homepage/index"
					},
					{
						title: '打卡',
						icon: 'map',
						value: "clocked",
						pagePath: "pages/clocked/index"
					},
					{
						title: '排班',
						icon: 'order',
						value: "clander",
						pagePath: "pages/attendance/index"
					},
					{
						title: '我的',
						icon: 'account',
						value: "userEdit",
						pagePath: "pages/useredit/index"
					}
				],
				activeIndex: 0,

			}
		},
		mounted() {
			this.initActive()
		},
		methods: {
			initActive() {
				this.itemList.forEach((e, index) => {
					if (
						e.pagePath == getCurrentPages().pop().route
					) {
						this.activeIndex = index
					}
				})
			},
			changeBar(index) {
				this.$url('/' + this.itemList[index].pagePath, 1)
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-tabbar__content {
		background-color: rgb(241, 242, 243);
		.u-tabbar-item__icon{
			span{
				font-size: 16px !important;
			}
			
		}
	}
</style>
