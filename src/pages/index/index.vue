<template>
	<view class="container">
		<view class="container-header">
		</view>
		<view class="app-container">
				<component :is="activeName"></component>
		</view>
		<u-tabbar :value="activeIndex" @change="changeBar" :fixed="true" :border="false" :placeholder="false"
			inactiveColor="" :safeAreaInsetBottom="true">
			<u-tabbar-item :text="item.title" :icon="item.icon" v-for="(item,index) in itemList" :key="index">
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import userEdit from '../useredit/index.vue'
	import clander from '../attendance/index.vue'
	import clocked from '../clocked/index.vue'
	import homePage from '../homepage/index.vue'
	export default {
		components: {
			homePage,
			clocked,
			clander,
			userEdit
		},
		data() {
			return {
				activeName: undefined,
				itemList: [{
						title: '首页',
						icon: 'home',
						value: "homePage"
					},
					{
						title: '打卡',
						icon: 'map',
						value: "clocked"
					},
					{
						title: '排班',
						icon: 'order',
						value: "clander"
					},
					{
						title: '我的',
						icon: 'account',
						value: "userEdit"
					}
				],
				activeIndex: 0,
			}
		},
		created() {
			this.changeBar(this.activeIndex)
		},
		methods: {
			changeBar(index) {
				this.activeIndex = index
				this.activeName = this.itemList[index].value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container-header {
		height: 25px;
	}
	.app-container {
		max-height: calc(100% - 60px);
	}
	::v-deep .u-tabbar {
		flex:0;
		.u-tabbar__content__item-wrapper {
			border: none !important;
			background-color: rgb(241, 242, 243);
		}
	}
</style>
