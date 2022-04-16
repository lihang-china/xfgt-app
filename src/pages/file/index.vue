<template>
	<view class="container">
		<u-navbar title="文档管理" :autoBack="true">
		</u-navbar>
		<u-sticky class="container-header " :offsetTop="0">
			<view class="flex-between">
				<!-- <u-icon size="26" name="calendar" @click="show = true"></u-icon> -->
				<u-search @clear="handleReload" :showAction="false" v-model="searchVal" showAction
					@custom="handleSearch" placeholder="请输入文档分类名称">
				</u-search>
			</view>
		</u-sticky>
		<view class="app-container">
			<uni-list>
				<uni-list-item v-for="(item,index) in data.list" :key="index">
					<file-item :fileData="item" slot='body' />
				</uni-list-item>
			</uni-list>
		</view>
	<!-- 	<u-datetime-picker @change="dateChange" @cancel="show = false" @confirm="handleDate" :show="show"
			v-model="searchDate" mode="date">
		</u-datetime-picker> -->
	</view>
</template>

<script>
	import {
		documentList
	} from '/src/api/document.js'
	import {
		uniList,
		uniListItem,
	} from '@dcloudio/uni-ui'
	import {
		fileList
	} from './default.js'
	import fileItem from './components/fileList.vue'
	export default {
		components: {
			fileItem,
			uniList,
			uniListItem,
		},

		data() {
			return {
				queryData: {
					pageNum: 1,
					pageSize: 10000,
					fileName: undefined
				},
				data: {
					list: []
				},
				searchVal: undefined,
				dataList: fileList,
				show: false,
				searchDate: Number(new Date())
			}
		},
		mounted() {
			this.getDocumentList()

		},
		methods: {
			getDocumentList() {
				documentList(this.queryData).then(res => {
					this.$lazyList(this.data, res.rows, 10)
				})
			},
			dateChange(val) {
				this.searchDate = val.value
			},
			handleDate() {
				let arr = this.dataList.filter(e => {
					return e.careateTime == this.$moment(this.searchDate).format('YYYY-MM-DD')
				})
				this.show = false
				this.$lazyList(this.data, arr, 20)

			},
			handleReload() {
				this.queryData.fileName = undefined
				this.getDocumentList()
			},
			handleSearch() {
				this.queryData.fileName = this.searchVal
				this.getDocumentList()

			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		.container-header {
			margin: 0 12px;

			.u-icon {
				&:nth-child(1) {
					margin-right: 5px;
				}
			}
		}

		.app-container {
			margin-top: 6px;
			padding-bottom: 30px;

			.nav-list {
				margin-right: 21px;

				&:nth-last-child(1) {
					margin: 0;
				}
			}

			.nav-scroll {
				border: 1px solid red;
				max-width: 200%;
			}

			.nav-block {
				background-color: rgb(200, 200, 200);
				width: 40px;
				border-radius: 50%;
				height: 40px;
			}
		}
	}
</style>
