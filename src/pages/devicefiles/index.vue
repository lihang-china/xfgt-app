<template>
	<view class="container">
		<u-navbar title="设备档案" :autoBack="true">
		</u-navbar>
		<view class="header-search flex-flex">
			<u-search @clear="handleReset" @custom="handleSearch" v-model="searchVal" placeholder="请输入设备名称"></u-search>
		</view>
		<view class="app-container">
			<view class="card-list">
				<uni-list>
					<uni-list-item v-for="(item,index) in deviceList.list" :key="index">
						<card-item :cardData="item" slot="body" />
					</uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		deviceList
	} from '/src/api/device.js'
	import {
		uniList,
		uniListItem,
	} from '@dcloudio/uni-ui'
	import cardItem from './components/itemCard.vue'
	// import {
	// 	deviceList
	// } from './default.js'
	export default {
		components: {
			cardItem,
			uniList,
			uniListItem,
		},
		data() {
			return {
				searchVal: undefined,
				deviceList: {
					list: []
				},
				queryData: {
					pageNum: 1,
					pageSize: 1000000,
					equName: undefined,
				}
			}
		},
		onShow() {
			this.getDeviceList()
			console.log('111show')
		},
		methods: {
			handleReset() {
				this.queryData.equName = undefined
				this.getDeviceList()
			},
			getDeviceList() {
				deviceList(this.queryData).then(res => {
					this.$lazyList(this.deviceList, res.rows, 10)
				})
			},
			handleSearch() {
				this.queryData.equName = this.searchVal
				this.getDeviceList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.app-container {
			margin-top: 6px;
			padding-bottom: 20px;
		}

		.header-search {
			padding: 0 12px;
		}
	}
</style>
