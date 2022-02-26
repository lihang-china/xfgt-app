<template>
	<view class="container">
		<u-navbar title="设备档案" :autoBack="true">
		</u-navbar>
		<view class="header-search">
			<u-search @custom="handleSearch" v-model="searchVal" placeholder="请输入设备名称"></u-search>
		</view>
		<view class="app-container">
			<view class="card-list">
				<card-item :cardData="item" v-for="(item,index) in deviceList" :key="index" />
			</view>
		</view>
	</view>
</template>

<script>
	import cardItem from './components/itemCard.vue'
	import {
		deviceList
	} from './default.js'
	export default {
		components: {
			cardItem
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
