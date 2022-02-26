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
			<file-item v-for="(item,index) in fileList" :fileData="item" :key="index" />
		</view>
		<u-datetime-picker @cancel="show = false" @confirm="handleDate" :show="show" v-model="searchDate" mode="date">
		</u-datetime-picker>
	</view>
</template>

<script>
	import {
		fileList
	} from './default.js'
	import fileItem from './components/fileList.vue'
	export default {
		components: {
			fileItem
		},
		data() {
			return {
				searchVal: undefined,
				dataList: fileList,
				fileList: fileList,
				show: false,
				searchDate: Number(new Date())
			}
		},
		methods: {
			handleDate() {
				this.fileList = this.dataList.filter(e => {
					return this.$moment(this.searchDate).format('YYYY-MM-DD') ? e.careateTime == this.$moment(this
						.searchDate).format('YYYY-MM-DD') : e
				})
				this.show = false
			},
			handleReload(){
				this.fileList = this.dataList
			},
			handleSearch() {
				this.fileList = this.dataList.filter(e => {
					return this.searchVal ? e.type == this.searchVal : e
				})
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
