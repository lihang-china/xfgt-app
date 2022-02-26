<template>
	<ui-card class="flex-column" v-if="fileData">
		<view class="container-header flex-between">
			<text>{{fileData.fileCode}}</text>
			<u-icon @click="handleView" :name="selectIcon" size="22"></u-icon>
		</view>
		<view class="flex-flex">
			<u-avatar :icon="fileIcon" fontSize="18" randomBgColor></u-avatar>
			<view class="flex-column container-center">
				<text>{{fileData.fileName}}</text>
				<text>{{fileData.desc}}</text>
			</view>
		</view>
		<view class="flex-between container-bottom">
			<view class="flex-flex">
				<text>文档类型：</text><text>{{fileData.type}}</text>
			</view>
			<view class="flex-flex">
				<text>{{fileData.careateTime}}</text>
				<u-icon size="18" :name="downLoad" @click="handleDownload"></u-icon>
			</view>
		</view>
	</ui-card>
</template>

<script>
	export default {
		props: {
			fileData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				selectIcon: require('/src/images/eyes.png'),
				fileIcon: require('/src/images/file.png'),
				downLoad: require('/src/images/download.png')
			}
		},
		methods: {
			handleView() {
				//打开文件
				uni.openDocument({
					filePath: 'www.baidu.com',
					success: function(res) {
						console.log('打开文档成功');
					},
					fail:(err=>{
						console.log(err,'预览失败')
					})
				});
			},
			handleDownload() {
				//预览文件
				uni.downloadFile({
					url: 'www.baidu.com',
					success: (res => {
						console.log('下载成功')
					}),
					fail: (error => {
						console.log(error, '下载失败')
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-avatar {
		margin-right: 5px;
	}

	.container-header {
		uni-text {
			color: rgb(72, 72, 72);
			font-weight: bold;
			margin-bottom: 5px;
		}
	}

	.container-center {
		uni-text {
			&:nth-child(2) {
				color: rgb(180, 180, 180);
				max-width: 160px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap
			}
		}
	}

	.container-bottom {
		margin-top: 5px;

		uni-view {
			&:nth-child(2) {
				uni-text {
					margin-right: 4px;
				}
			}
		}
	}
</style>
