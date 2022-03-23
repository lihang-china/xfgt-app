<template>
	<view class="container">
		<u-navbar title="设备档案" :autoBack="true">
		</u-navbar>
		<view class="header-search">
			<u-search @custom="handleSearch" v-model="searchVal" placeholder="请输入设备名称"></u-search>
		</view>
		<view class="app-container">
			<view class="card-list">
				<uni-list>
					<uni-list-item v-for="(item,index) in deviceList" :key="index">
						<card-item :cardData="item" slot="body"/>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniList,
		uniListItem,
	} from '@dcloudio/uni-ui'
	import cardItem from './components/itemCard.vue'
	import {
		deviceList
	} from './default.js'
	export default {
		components: {
			cardItem,
			uniList,
			uniListItem,
		},
		data() {
			return {
				searchVal: undefined,
				deviceList: deviceList
			}
		},
		methods: {
			handleSearch() {
				console.log(this.searchVal, 'searchValue')
			}
		}
	}
</script>

<style lang="scss" scoped>

	.container {
		
		.header-search {
			padding: 0 12px;
		}
	}
</style>
