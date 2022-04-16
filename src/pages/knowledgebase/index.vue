<template>
	<view class="container">
		<u-navbar title="知识库管理" :autoBack="true">
		</u-navbar>
		<view class="flex-flex container-search">
			<!-- <u-icon @click="show = true" name="calendar" size="26"></u-icon> -->
			<u-search @custom="handleSearch" v-model="searchVal" placeholder="请输入知识库标题"></u-search>
		</view>
		<view class="container-header">
			<ui-card class="container-banner flex-between">
				<view class="banner-left">
					<u-icon size="100" :name="booksIcon"></u-icon>
				</view>
				<view class=" flex-between banner-right">
					<view class="flex-flex ">
						<u-icon @click="handleView" color="rgb(255,255,255)" size="60" name="plus-circle"></u-icon>
					</view>
					<text>数量：{{fileList.length}}</text>
				</view>
			</ui-card>
			<view class="container-icon flex-between">
				<u-icon size="24" :name="ascIcon"></u-icon>
				<u-icon size="24" name="reload" @click="handleReload"></u-icon>
			</view>
		</view>
		<view class="app-container">
			<item-card :itemData="item" v-for="(item,index) in fileList" :key="index"></item-card>
		</view>
		<u-datetime-picker @cancel="show = false" @change="timeChange" @confirm="handleSearchtime" :show="show"
			v-model="searchTime" mode="date"></u-datetime-picker>
	</view>
</template>

<script>
import {getknowList} from '/src/api/knowbase.js'
	import itemCard from './components/itemCard.vue'
	export default {
		components: {
			itemCard
		},
		data() {
			return {
				searchVal:'',
				fileData: [],
				show: false,
				searchTime: Number(new Date()),
				fileList: [],
				ascIcon: require('/src/images/asc.png'),
				booksIcon: require('/src/images/books.png'),
				queryData:{
					pageNum:1,
					pageSize:10000
				},
			}
		},
		mounted(){
			this.getKnowList()
		},
		methods: {
			getKnowList(){
				getknowList(this.queryData).then(res=>{
					this.fileList = res.rows
				})
			},
			handleSearch(){
				
			},
			handleReload() {
				this.searchVal = ''
				this.fileList = this.fileData
			},
			handleSearchtime() {
				this.fileList = this.fileData.filter(e => {
					return e.createTime == this.$moment(this.searchTime).format('YYYY-MM-DD')
				})
				this.show = false
			},
			timeChange(val) {
				this.searchTime = val.value
			},
			handleView(val) {
				uni.navigateTo({
					url: '/pages/knowledgebase/detail?type=add'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.container-search {
			padding: 6px;
		}

		.app-container {
			padding: 0;
			width: calc(100% - 16px);
			border-radius: 16px;
			border: 8px solid rgb(255, 255, 255);
			background-color: rgb(255, 255, 255);
		}

		.container-header {
			padding:8px;

			.banner-left {
				border-right: 1px solid rgb(220, 220, 220);
				width: 50%;
			}

			.banner-right {
				flex-direction: column;

				uni-text {
					color: #fff;
				}
			}

			.container-banner {
				align-items: flex-end;
				background-color: rgb(0, 98, 255);
				padding-top: 16px;
				padding-bottom: 16px;
			}
		}

		.container-icon {
			margin-top: 8px;
			margin-bottom: -6px;
		}

		.ui-card {}

	}
</style>
