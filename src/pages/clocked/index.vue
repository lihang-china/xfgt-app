<template>
	<view class="clocked">
		<view class="clocked-title">
			<text class="ui-title">浙江源创</text>
			<view class="title-top">
				<text>{{this.$moment(date).format('HH:mm:ss')}} </text>
				<view class="top-left">
					<text>{{this.$moment(new Date()).format('MM月DD日')}} </text>
					<text>{{ date | formatDay }}</text>
				</view>
			</view>
			<view class="title-btngroup">
				<u-button @click="handelCount()" iconColor="rgb(149, 149, 149)" size="small" icon="map" shape="circle"
					text="考勤记录" class="custom-style flex-center">
				</u-button>
				<u-button @click="handelRule()" iconColor="rgb(149, 149, 149)" size="small" icon="order" text="规则"
					class="custom-style flex-center" shape="circle">
				</u-button>
			</view>
		</view>
		<ui-card class="clocked-header">
			<view class="flex-between">
				<u-avatar text="北" fontSize="14px" randomBgColor></u-avatar>
				<view class="flex-column">
					<text>Test User</text>
					<text class="clocked-tips" @click="routerMap()">{{clockTips}}: {{clockPath}}</text>
				</view>
			</view>
		</ui-card>
		<ui-card class="clocked-center">
			<ui-card class="clocked-card">
				<view class="card-left">
					<text>上班08:30：</text>
					<view class="card-time">
						<text>08:30 {{upClock ? '已打卡' : '未打卡'}}</text>
						<u-icon :color="upClock?'rgb(0, 238, 55)':'rgb(226, 226, 226)'" :name="upClock ? 'checkmark-circle-fill' : 'close-circle-fill'">
						</u-icon>
					</view>

					<text>下班17:00：</text>
					<view class="card-time">
						<text>17:00 {{downClock ? '已打卡' : '未打卡'}}</text>
						<u-icon :color="downClock?'rgb(0, 238, 55)':'rgb(226, 226, 226)'" :name="downClock ? 'checkmark-circle-fill' : 'close-circle-fill'">
						</u-icon>
					</view>
					<text></text>
				</view>
				<view class="card-right">
					<image src="../../images/people.png" mode=""></image>
				</view>
				<button class="card-button" :class="[isClock ? '' :'visible-button']" @click="handelClocked()">
					{{upClock ? '下班' : '上班'}}打卡
				</button>
			</ui-card>
		</ui-card>
		<!-- 	<view class="clocked-bottom">
			<view class="bottom-card ui-card" v-for="(item,index) in btnGroup" :key="index">
				<image class="card-image" :src="require('../../images/' + item.icon) " mode=""></image>
				<text>{{item.title}}</text>
				<text>{{item.value}}</text>
			</view>
		</view> -->
		<u-popup :round="10" :closeOnClickOverlay="false" :closeable="true" :duration="350" :show="show"
			@close="show = false" mode="center">
			<ui-card class="dialog">
				<view class="dialog-header flex-center">
					<u-icon size="16px" color="rgb(0, 171, 34)" name="checkmark-circle-fill"></u-icon>
					<text>{{cloedValue}}打卡成功</text>
				</view>
				<view class="dialog-bottom flex-center">
					<text>打卡时间：{{this.$moment(cloedTime).format('HH:mm')}}</text>
					<text>六合大厦</text>
				</view>
			</ui-card>
		</u-popup>
		<u-popup :round="10" :closeOnClickOverlay="true" :closeable="false" :show="mapShow" @close="mapShow = false"
			mode="bottom">
			<view class="clock-map">
				<view class="close-btn" @click="mapShow = false">
				</view>
				<clock-map :xyTude="xyTude" v-show="mapShow" />
			</view>
		</u-popup>
	</view>
</template>

<script>
	import clockMap from './components/map.vue'
	export default {
		components: {
			clockMap
		},
		data() {
			return {
				xyTude: [],
				upClock: false,
				downClock: false,
				isClock: false,
				mapShow: false,
				clockPath: '中控科技园',
				clockTips: '超出打卡范围',
				latitude: 30.1806,
				longitude: 120.139,
				timer: undefined,
				// btnGroup: [{
				// 	icon: 'bmicon1.png',
				// 	title: '新建外勤',
				// 	value: '外勤打卡'
				// }, {
				// 	icon: 'bmicon2.png',
				// 	title: '出行统计',
				// 	value: '统计每天出行情况'
				// }, {
				// 	icon: 'bmicon3.png',
				// 	title: '体温计量',
				// 	value: '记录每日体温'
				// }],
				date: new Date(),
				Day: new Date().getDay(),
				cloedTime: new Date(),
				cloedValue: "上班",
				show: false,

			}
		},
		beforeDestroy() {
			//销毁计时器
			clearInterval(this.timer);
		},
		created() {

		},
		mounted() {
			this.getDistance()
			//打卡页面定时刷新用户位置信息
			this.initTimer()
			setInterval(() => {
				this.date = new Date()
			}, 1000)
		},
		methods: {
			routerMap() {
				this.mapShow = true
			},
			Rad(d) {
				return d * Math.PI / 180.0;
			},
			getDistance() {
				//地理围栏算法,判断用户位置是否在范围内
				let radLat1 = this.Rad(Number(this.latitude))
				let radLat2 = this.Rad(Number(30.1804))
				let a = a = radLat1 - radLat2
				let b = this.Rad(this.longitude) - this.Rad(Number(120.139))
				let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math
					.pow(Math.sin(b / 2), 2)))
				s = s * 6378.137
				s = Math.round(s * 10000) / 10000
				s = s.toFixed(2)
				if (s * 1000 < Number(Number(100)) + 5) {
					this.isClock = true
					console.log("未超出范围：" + s * 1000)
					return true
				} else {
					this.distanceFlag = true
					console.log("超出范围：" + s * 1000)
					return false
				}
			},
			initTimer() {
				//定时器定时获取用户位置信息
				this.timer = setInterval(() => {
					if (this.isClock == false) {
						this.getDistance()
					}
					uni.getLocation({
						altitude: true
					}).then(res => {
						console.log(res[1].latitude, res[1].longitude, '打卡用户位置信息')
						if (res[1].latitude && res[1].longitude) {
							this.xyTude = [res[1].latitude, res[1].longitude]
						}
					})
				}, 3000)
			},
			handelCount() {
				uni.navigateTo({
					url: '../clockcount/index'
				});
			},
			handelRule() {
				uni.navigateTo({
					url: '../clockrules/index'
				});
			},
			handelClocked() {
				if (this.isClock == true) {
					if (this.upClock == true && this.downClock == true) {
						this.cloedValue = '更新'
					} else {
						this.upClock == true ? (this.downClock = true, this.cloedValue = '下班') : (this.upClock =
							true, this
							.cloedValue = '上班')
					}
					this.show = true
					this.$forceUpdate()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clocked {
		.clock-map {
			margin: 8px;
			width: calc(100% - 16px);
			height: 60vh;
			padding-bottom: 8px;

			.close-btn {
				margin: 0 auto;
				margin-top: 5px;
				margin-bottom: 5px;
				border-radius: 2px;
				background-color: rgb(160, 160, 160);
				width: 15px;
				height: 3px;
			}
		}

		.clocked-tips {
			margin-top: 3px;
			font-size: 8px !important;
			// color: rgb(0, 127, 212);
			color: red;
		}

		.ui-title {
			font-size: 12px;
		}

		uni-image {
			width: 24px;
			height: 24px;
		}

		width:100%;
		margin-bottom: 30px;

		.clocked-bottom {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.bottom-card {
				padding: 6px 0px;
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100%;
				margin: 8px 0px;

				&:nth-child(2) {
					margin: 8px 8px;
				}

				uni-text {
					&:nth-child(3) {
						margin: 2px;
						font-size: 8px;
						color: rgb(180, 180, 180);
					}

					&:nth-child(2) {
						color: rgb(27, 0, 39);
						font-size: 10px;
					}
				}
			}
		}

		.clocked-title {
			display: flex;
			flex-direction: column;
			color: rgb(50, 50, 50);

			.title-btngroup {
				display: flex;

				::v-deep .custom-style {
					padding: 0 10px;
					width: 65px;
					white-space: nowrap;
					padding: 0;
					margin: 0;
					box-shadow: 0 0 2px 2px rgba(227, 227, 227, 0.1);
					background-color: rgb(255, 255, 255);
					border: 0;
					border-radius: 12px;
					font-size: 8px;

					&:nth-child(2) {
						margin-left: 8px;
						width: 50px;
					}
				}
			}

			.title-top {
				margin: 8px 0;
				display: flex;
				justify-content: space-between;

				.top-left {
					width: 60px;
					margin-top: 13px;
					margin: 8px;

					uni-text {
						color: rgb(55, 47, 65);
						display: flex;
						flex-direction: column;
						font-size: 12px;
					}
				}

				uni-text {
					color: rgb(26, 0, 40);
					margin: 6px 0;
					font-size: 36px;
					font-weight: bold;
				}

			}

		}

		.clocked-header {
			display: flex;
			align-items: center;

			uni-text {
				font-size: 10px;
				margin: 0 10px;
			}
		}

		.dialog {
			width: 120px;
			height: 50px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 10px;

			.dialog-bottom {
				flex-direction: column;
				font-size: 8px;

				uni-text {
					margin-top: 4px;
					color: rgb(168, 168, 168);
				}
			}
		}

		.container-map {
			height: 200px;
		}

		.clocked-center {
			.clocked-card {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;

				.card-left {
					width: 50%;
				}

				.card-right {
					width: 50%;

					uni-image {
						margin: 20px 0 0 4px;
						width: 100px;
						height: 65px;
					}
				}

				font-size: 10px;

				.card-time {
					display: flex;
					align-items: center;
					font-size: 10px;
					white-space: nowrap;

					uni-text {
						margin: 8px;
					}
				}

				uni-button::after {
					border: none;
				}

				.card-button {
					padding: 2px 0;
					margin-top: 10px;
					border-radius: 6px;
					font-size: 11px;
					color: #fff;
					width: 100%;
					background-color: rgba(192, 212, 236, 0.5);
				}

				.visible-button {
					background-color: rgba(160, 175, 191, 0.5);
					color: rgb(171, 171, 171);

				}

				uni-text {
					color: #fff;
					margin-bottom: 10px;
				}

				color: #ffff;
				margin: 0px 0;
				background : linear-gradient(35deg, rgba(0, 104, 248, 0.7), rgb(0, 104, 248));
			}

			overflow: hidden;
		}
	}
</style>
