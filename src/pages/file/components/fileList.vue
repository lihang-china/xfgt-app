<template>
	<ui-card class="flex-column" v-if="fileData">
		<view class="container-header flex-between">
			<text>{{fileData.documentId}}</text>
			<!-- <u-icon @click="handleView(fileData.filePaper)" :name="selectIcon" size="22"> </u-icon> -->
		</view>
		<view class="flex-between">
			<view class="flex-flex">
				<!-- <u-avatar icon="order" fontSize="30"  shape="square"></u-avatar> -->
				<u-icon name="order" size="40" color="rgb(0, 0, 0)"></u-icon>
				<view class="flex-column container-center">
					<text>{{fileData.fileName}}</text>
					<!-- <text>{{fileData.repairContacts}}</text> -->
				</view>
			</view>
			<u-icon color="rgb(255, 255, 255)" class="download-icon" size="26" name="download"
				@click="handleDownload(fileData.filePaper)"></u-icon>
		</view>
		<view class="flex-between container-bottom">
			<view class="flex-flex">
				<text>文档类型：</text><text>{{fileData.fileification}}</text>
			</view>
			<text>{{fileData.repairDate}}</text>
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
			handleView(url) {
				//打开文件
				// // #ifdef APP
				// 	uni.$u.toast('未找到第三方应用')
				// window.open(url,"_blank")
				// // #endif
				plus.webview.open(url)
				// plus.runtime.openURL( url )

			},
			async handleDownload(url) {
				//下载文件
				// #ifndef H5 || APP-PLUS
				uni.$u.toast('请在APP或者浏览器中打开')
				// #endif 
				// #ifdef H5 || APP-PLUS
				uni.showLoading({
					title: '正在打开文件'
				});
				await uni.downloadFile({
					url: url,
					success: (res => {
						uni.openDocument({
							filePath: res.tempFilePath,
							showMenu: true,
							fail(err) {
								uni.$u.toast(err)
							}
						});
					}),
				})
				uni.hideLoading()
				// #endif

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
			color: rgb(150, 150, 150);
			font-weight: bold;
			margin-bottom: 5px;
		}
	}

	.container-center {
		uni-text {
			margin-left: 5px;
			color: rgb(120, 120, 120);
			max-width: 160px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap
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

	.download-icon {
		// border: 2px solid rgb(62, 77, 129);
		background-color: rgb(8, 127, 255);
		border-radius: 50%;
		padding: 3px;
	}
</style>
