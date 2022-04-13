<template>
	<view class="container">
		<u-navbar title="文档管理" :autoBack="true">
		</u-navbar>
		<u-sticky class="container-header " :offsetTop="0">
			<view class="flex-between">
				<u-icon size="26" name="calendar" @click="show = true"></u-icon>
				<u-search :showAction="false" v-model="searchVal" @change="handleSearch" placeholder="请输入文档分类名称">
				</u-search>
				<u-icon @click="handleReload" class="reload-icon" name="reload" size="26"></u-icon>
			</view>
		</u-sticky>
		<view class="app-container">
			<uni-list>
				<uni-list-item v-for="(item,index) in data.list" :key="index">
					<file-item :fileData="item" slot='body' />
				</uni-list-item>
			</uni-list>
		</view>
		<u-datetime-picker @change="dateChange" @cancel="show = false" @confirm="handleDate" :show="show" v-model="searchDate" mode="date">
		</u-datetime-picker>
	</view>
</template>

<script>
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
			this.$lazyList(this.data, this.dataList, 10)
		},
		methods: {
			dateChange(val){
				this.searchDate = val.value
			},
			handleDate() {
				let arr = this.dataList.filter(e => {
					return  e.careateTime == this.$moment(this.searchDate).format('YYYY-MM-DD') 
				})
				this.show = false
				this.$lazyList(this.data, arr, 20)

			},
			handleReload() {
				this.searchVal = undefined
				this.$lazyList(this.data, this.dataList, 20)
			},
			handleSearch() {
				let arr = this.dataList.filter(e => {
					return this.searchVal ? e.type == this.searchVal : e
				})
				this.$lazyList(this.data, arr, 20)
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
