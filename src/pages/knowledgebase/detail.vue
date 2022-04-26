<template>
	<view class="container flex-column">
		<u-navbar :title="title" :autoBack="true">
		</u-navbar>
		<ui-card class="app-container">
			<u-form :labelStyle="{color:'rgb(150, 150, 150)'}">
				<u-form-item labelWidth="50" :borderBottom="formBorder" :label="item.title"
					v-for="(item,index) in itemData" :key="index">
					<view v-if=" item.value == 'tag'" class="flex-flex">
						<view v-if="fileData[item.value]" class="flex-flex">
							<u-tag size="mini" :text="fileData[item.value]" plain :icon="tagIcon">
							</u-tag>
							<text class="ui-text-btn" @click="handelTagclose">删除</text>
						</view>
						<text v-if="!fileData[item.value]" class="ui-text-btn">添加</text>
					</view>
					<view class="from-time" v-if="item.value =='createTime'">
						<text>{{fileData[item.value]}}</text>
					</view>
					<u-input border="none"
						v-if="item.value !=='createTime' && item.value !== 'tag' && item.value !== 'content' && item.value !== 'desc'"
						v-model="fileData[item.value]"></u-input>
					<u-textarea v-model="fileData[item.value]" v-if="item.value == 'desc'"></u-textarea>
					<u-textarea v-model="fileData[item.value]" v-if="item.value == 'content'"></u-textarea>
				</u-form-item>
				<u-form-item label="文件：" labelWidth="50">
					<view class="flex-flex">
						<view class="flex-flex" v-if="fileData.knownledgePath">
							<u-icon color="rgb(180,180,180)" size="22" name="file-text"></u-icon>
							<text>(*Filasnad)</text>
							<text class="ui-text-btn" @click="handleDownload(fileData.knownledgePath)">下载</text>
						</view>
						<view v-else>
							<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="1"
								:maxCount="1"></u-upload>
							<!-- <text  class="ui-text-btn" @click="handleUpload">上传</text> -->
						</view>

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
		getknowList,
		fileunLoad
	} from '/src/api/knowbase.js'
	import {
		fileList,
		itemData
	} from './default.js'
	import {
		upLoad
	} from '/src/public/js/upLoad.js'
	export default {
		data() {
			return {
				title: '文档详情',
				formBorder: false,
				time: Number(new Date()),
				show: false,
				fileData: {},
				itemData: itemData,
				tagIcon: require('/src/images/tag.png'),
				fileList: [],
				fileUrl: undefined,
			}
		},
		mounted() {

		},
		onLoad: function(option) {
			this.initData(option)
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this.fileList.splice(0)
			},
			afterRead(event) {
				this.fileList.push(event.file)
			},
			handleSave() {
				let data = {
					url: '/eoms/base/file/upload',
					path: this.fileList[0].url,
					name: 'file'
				}
				upLoad(data).then(res => {
					if (JSON.parse(res.data).code == 200) {
						this.fileUrl = JSON.parse(res.data).fileUrl
					}
				})
			},

			handleDownload(url) {
				//下载文件
				uni.downloadFile({
					url: url,
					success: (res => {
						uni.openDocument({
							filePath: res.tempFilePath,
							showMenu: true,
							fail(err) {
								// #ifdef APP
								uni.$u.toast('未找到第三方应用')
								// #endif
								// #ifdef MP-WEIXIN
								uni.$u.toast('请在浏览器中打开')
								// #endif
							}
						});
					}),
				})
			},
			getKnowList(val) {
				getknowList({headline:val}).then(res => {
					this.fileData = res.rows[0]
				})
			},
			timeChange(val) {
				this.time = val.value
			},
			handleClose() {
				uni.navigateBack({
					delta: 1
				})
			},

			handleTime(val) {
				this.fileData[val] = this.$moment(this.time).format('YYYY-MM-DD')
				this.show = false
			},
			handelTagclose() {
				this.fileData.tag = undefined
			},
			initData(option) {
				if (option.type == 'add') {
					this.formBorder = true
					this.title = '新建文档'
				} else {
					this.getKnowList(option.title)
					this.title = '文档详情'
					this.formBorder = false
				}

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
