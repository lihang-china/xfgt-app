<template>
	<view class="container">
	<u-navbar class="app-navbar" :autoBack="true">
	</u-navbar>	
	<view class="app-container">
		<view class="container-component">
			<order-page v-if="isShow" />
			<view v-else class="u-loading-icon flex-center">
				<u-loadmore status="loading" />
			</view>
		</view>
		<u-tabbar :value="activeIndex" @change="changeBar" :fixed="true" :border="false" :placeholder="false"
			inactiveColor="" :safeAreaInsetBottom="true">
			<u-tabbar-item :text="item.title" :icon="item.icon" v-for="(item,index) in itemList" :key="index">
			</u-tabbar-item>
		</u-tabbar>
	</view>
		</view>
</template>

<script>
	import orderPage from './detail/index.vue'
	export default {
		components: {
			orderPage
		},
		data() {
			return {
				pageName: undefined,
				itemList: [{
						title: '保养',
						icon: 'home',
						value: 'maintain'
					},
					{
						title: '巡检',
						icon: 'order',
						value: 'inspection'
					},
				],
				activeIndex: 0,
				isShow: true,
			}
		},
		methods: {
			changeBar(index) {
				this.isShow = false
				this.activeIndex = index
				this.$store.state.pageName = this.itemList[index].value
				setTimeout(() => {
					this.isShow = true
				}, 500)
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	width: 100%;
}

	.app-container {
	max-height: calc(88%);
	}

	.u-loading-icon {
		margin-top: calc(70% - 15px);
	}

	.container-component {
		overflow: scroll;
		margin-top: 10px;
		flex-grow: 1;
	}

	::v-deep .u-tabbar {
		.u-tabbar__content__item-wrapper {
			border: none !important;
			// box-shadow: 0 0 0 0.5pt rgb(220, 220, 220);
			background-color: rgb(241, 242, 243);
		}
	}
</style>
