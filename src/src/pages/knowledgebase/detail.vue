<template>
	<view class="container flex-column">
		<u-navbar :title="title" :autoBack="true">
		</u-navbar>
		<ui-card class="app-container">
			<u-form
			 :labelStyle="{color:'rgb(150, 150, 150)'}">
				<u-form-item labelWidth="50" :borderBottom="formBorder" :label="item.title" v-for="(item,index) in itemData"
					:key="index">
					<view v-if=" item.value == 'tag'" class="flex-flex">
						<view v-if="fileData[item.value]"  class="flex-flex">
							<u-tag size="mini" :text="fileData[item.value]" plain :icon="tagIcon">
							</u-tag>
							<text class="ui-text-btn" @click="handelTagclose">删除</text>
						</view>
						<text v-if="!fileData[item.value]" class="ui-text-btn">添加</text>
					</view>
					<view class="from-time" v-if="item.value =='createTime'">
						<text @click="show = true">{{fileData[item.value]}}</text>
						<u-datetime-picker @change="timeChange"  @cancel="show = false" @confirm="handleTime(item.value)" :show="show"
							v-model="time" mode="datetime"></u-datetime-picker>
					</view>
					<u-input border="none"
						v-if="item.value !=='createTime' && item.value !== 'tag' && item.value !== 'content' && item.value !== 'desc'"
						v-model="fileData[item.value]"></u-input>
					<u-textarea v-model="fileData[item.value]" v-if="item.value == 'desc'"></u-textarea>
					<u-textarea v-model="fileData[item.value]" v-if="item.value == 'content'"></u-textarea>
				</u-form-item>
				<u-form-item label="文件：" labelWidth="50">
					<view class="flex-flex">
						<u-icon color="rgb(180,180,180)" size="22" name="file-text"></u-icon>
						<text>(*Filasnad)</text>
						<text class="ui-text-btn">上传</text>
					</view>
				</u-form-item>
			</u-form>
		</ui-card>
		<view class="flex-bottom flex-center">
			<text @click="handleClose">取消</text><text @click="handleSave">保存</text>
		</view>
	</view>
</template>

<script>
	import {
		fileList,
		itemData
	} from './default.js'
	export default {
		data() {
			return {
				title:'文档详情',
				formBorder: false,
				time: Number(new Date()),
				show: false,
				fileList: fileList,
				fileData: {},
				itemData: itemData,
				tagIcon: require('/src/images/tag.png')
			}
		},

		created() {
			this.initData()
		},
		methods: {
			timeChange(val) {
				this.time = val.value
			},
			handleClose() {
				uni.navigateBack({
					delta: 1
				})
			},
			handleSave() {},
			handleTime(val) {
				this.fileData[val] = this.$moment(this.time).format('YYYY-MM-DD')
				this.show = false
			},
			handelTagclose() {
				this.fileData.tag = undefined
			},
			initData() {
				this.title = '文档详情' 
				getCurrentPages().pop().options.title ? this.fileData = this.fileList.filter(e => {
					return e.title == getCurrentPages().pop().options.title
				})[0]:( this.formBorder = true ,this.title = '新建文档')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		max-height: 100%;
	}

	.ui-card {
		border-radius: 0 0 10% 10%;
	}

	.flex-bottom {
		uni-text {
			font-size: 12px;
			color: rgb(42, 42, 42);
			font-weight: bold;
			margin: 15px 30px;
		}
	}

	.u-form-item {
		.from-time {
			uni-text {
				display: block;
				min-height: 12px;
				min-width: 100px;
			}
		}

		
	}
</style>
