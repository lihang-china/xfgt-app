<template>
	<u-popup :closeOnClickOverlay="false" :show="show" mode="center" :closeable="!isTrue" round="10"
		@close="show = false">
		<view class="popup">
			<view class="popup-header">
				<text>发现新版本</text>
				<view class="flex-center">
					<u-icon size="90px" :name="require('../../images/update.png')"></u-icon>
				</view>
			</view>
			<text class="version">Version:0.5.5</text>
			<u-button @click="handleUpdate()">{{btntext}}</u-button>
			<u-line-progress v-if="isTrue" :percentage="speed" height="4" :showText="false"></u-line-progress>
		</view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {
				downloadResult: undefined,
				isTrue: false,
				show: false,
				speed: 0,
				btntext: '立即更新',
			}
		},
		created() {
			this.show = true
			//条件编译
			// #ifdef APP
			// #endif
		},
		methods: {
			handleUpdate() {
				this.isTrue = true
				this.downLoad()
			},
			downLoad() {
				uni.downloadFile({ //执行下载
					url: 'http://xfgth.ycibms.com/xfgtapp.apk',
					success: downloadResult => { //下载成功
						if (downloadResult.statusCode == 200) {
							this.btntext = "正在安装..."
								this.show = false
							plus.runtime.install( //安装
								downloadResult.tempFilePath, {
									force: true
								},
								function(res) {
									plus.runtime.restart();
								}
							);
						} else {
							this.btntext = "更新失败"
						}
					},
					fail: (err) => {
						console.log(err)
						this.btntext = "更新失败"
					}
				}).onProgressUpdate((res) => {
					this.speed = res.progress
					this.btntext = "下载中" + res.progress + "%"
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.popup {
		position: relative;
		border-radius: 5px;
		// background-image: url(../../images/update.png);
		background-size: 50%;
		background-repeat: no-repeat;
		width: 70vw;
		height: 40vh;
		// background-color: rgb(0, 123, 255);
		background: linear-gradient(rgb(0, 123, 255), rgb(64, 140, 255), rgb(90, 140, 255));
		overflow: hidden;

		.u-line-progress {
			width: 100%;
			position: absolute;
			bottom: 0px;
		}

		.u-button {
			margin: 10px;
			width: calc(100% - 20px);
			position: absolute;
			bottom: 0;
			font-size: 10px;
			color: rgb(0, 123, 255) !important;
			font-weight: bold;
			letter-spacing: 2px;
		}

		.version {
			font-size: 8px;
			width: 100%;
			display: block;
			color: rgb(250, 250, 250);
			text-align: center;
			margin-top: 20px;

		}

		.popup-header {
			padding-top: 20px;
			height: 40%;

			uni-text {
				width: 100%;
				display: block;
				text-align: center;
				color: rgb(250, 250, 250);
				font-size: 14px;
				font-weight: bold;
			}
		}
	}
</style>
