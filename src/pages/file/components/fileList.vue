<template>
	<ui-card class="flex-column" v-if="fileData">
		<view class="container-header flex-between">
			<text>{{fileData.documentId}}</text>
			<!-- <u-icon @click="handleView(fileData.filePaper)" :name="selectIcon" size="22"> </u-icon> -->
		</view>
		<view class="flex-flex">
			<u-avatar :icon="fileIcon" fontSize="18" randomBgColor></u-avatar>
			<view class="flex-column container-center">
				<text>{{fileData.fileName}}</text>
				<text>{{fileData.repairContacts}}</text>
			</view>
		</view>
		<view class="flex-between container-bottom">
			<view class="flex-flex">
				<text>文档类型：</text><text>{{fileData.fileification}}</text>
			</view>
			<view class="flex-flex">
				<text>{{fileData.repairDate}}</text>
				<u-icon size="18" :name="downLoad" @click="handleDownload(fileData.filePaper)"></u-icon>
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
			handleView(url) {
				//打开文件
				// // #ifdef APP
				// 	uni.$u.toast('未找到第三方应用')
				// window.open(url,"_blank")
				// // #endif
				plus.webview.open(url)
				// plus.runtime.openURL( url )

			},
			handleDownload(url) {
				//下载文件
				// #ifndef H5 || APP-PLUS
				uni.$u.toast('请在APP或者浏览器中打开')
				// #endif 
				// #ifdef H5 || APP-PLUS
				uni.downloadFile({
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
