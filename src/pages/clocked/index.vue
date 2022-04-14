<template>
	<view class="container">
		<view class="tabbar">
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
					<u-button @click="handelCount()" iconColor="rgb(149, 149, 149)" icon="map" shape="circle"
						text="考勤记录" class="custom-style flex-center">
					</u-button>
					<u-button @click="handelRule()" iconColor="rgb(149, 149, 149)" icon="order" text="规则"
						class="custom-style flex-center" shape="circle">
					</u-button>
				</view>
			</view>
			<ui-card class="clocked-header">
				<view class="flex-between">
					<u-avatar :src="imgSrc" fontSize="16" randomBgColor></u-avatar>
					<view class="flex-column">
						<text>{{userInfo.userName}}</text>
						<text class="clocked-tips" @click="routerMap()">{{clockTips}}: {{clockPath}}</text>
					</view>
				</view>
			</ui-card>
			<ui-card class="clocked-center">
				<ui-card class="clocked-card">
					<view class="card-left">
						<text>上班{{clockStart}}：</text>
						<view class="card-time">
							<text>{{clockStartvalue}} {{upClock ? '已打卡' : '未打卡'}}</text>
							<u-icon :color="upClock?'rgb(0, 238, 55)':'rgb(226, 226, 226)'"
								:name="upClock ? 'checkmark-circle-fill' : 'close-circle-fill'">
							</u-icon>
						</view>
						<text>下班{{clockEnd}}：</text>
						<view class="card-time">
							<text>{{clockEndvalue}} {{downClock ? '已打卡' : '未打卡'}}</text>
							<u-icon :color="downClock?'rgb(0, 238, 55)':'rgb(226, 226, 226)'"
								:name="downClock ? 'checkmark-circle-fill' : 'close-circle-fill'">
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
		</view>
		<ui-tabbar />
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
				<view @touchstart="touchStar" @touchend="touchEnd" class="close-btn" @click="mapShow = false">
				</view>
				<clock-map :xyTude="xyTude" v-show="mapShow" />
			</view>
		</u-popup>
	</view>

</template>

<script>
	import {
		clocked
	} from '/src/api/class.js'
	// import wx from 'jweixin-module/lib/index.js';
	// import AMapLoader from '@amap/amap-jsapi-loader';
	import {
		clockPath
	} from './default.js'
	import clockMap from './components/map.vue'
	export default {
		components: {
			clockMap
		},
		data() {
			return {
				userInfo: {},
				map: undefined,
				clockStartvalue: undefined,
				clockEndvalue: undefined,
				clockStart: clockPath.clockStart,
				clockEnd: clockPath.clockEnd,
				radius: clockPath.radius,
				xyTude: [],
				upClock: false,
				downClock: false,
				isClock: false,
				mapShow: false,
				clockPath: clockPath.path,
				clockTips: '超出打卡范围',
				latitude: clockPath.latitude,
				longitude: clockPath.longitude,
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
				touchData: {},
				imgSrc: undefined,
			}
		},
		onHide() {
			clearInterval(this.timer);
		},
		onLoad() {
			this.getUserinfo()
		},
		onShow() {
			// this.getLocation()
			//打卡页面定时刷新用户位置信息
			this.initTimer()
			setInterval(() => {
				this.date = new Date()
			}, 1000)
		},
		methods: {
			getUserinfo() {
				var data = uni.getStorageSync('user_info')
				this.userInfo = data.user
				this.imgSrc = data.user.avatar
			},
			touchStar(e) {
				this.touchData = e.changedTouches[0]
			},
			touchEnd(e) {
				//下滑关闭，Y值 大于 70 关闭地图组件
				if (e.changedTouches[0].clientY - this.touchData.clientY >= 70) {
					this.mapShow = false
				}
			},
			routerMap() {
				this.mapShow = true
			},
			Rad(d) {
				return d * Math.PI / 180.0;
			},
			getDistance() {
				//地理围栏算法,判断用户位置是否在范围内
				// let x = 30.1804
				// let y = 120.1395
				let radLat1 = this.Rad(Number(this.latitude))
				let radLat2 = this.Rad(Number(this.xyTude[0]))
				let a = a = radLat1 - radLat2
				let b = this.Rad(this.longitude) - this.Rad(Number(this.xyTude[1]))
				let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math
					.pow(Math.sin(b / 2), 2)))
				s = s * 6378.137
				s = Math.round(s * 10000) / (this.radius * 100)
				s = s.toFixed(2)
				if (s * 1000 < Number(Number(100)) + 5) {
					this.isClock = true
					console.log("未超出范围：" + s * 100)
					return true
				} else {
					this.distanceFlag = true
					console.log("超出范围：" + s)
					return false
				}
			},
			initTimer() {
				//定时器定时获取用户位置信息
				this.timer = setInterval(() => {
					if (this.isClock == false) {}
					this.getLocation()
				}, 3000)
			},
			getLocation() {
				uni.getLocation({
					isHighAccuracy: true,
					high: 'best',
					geocode: true,
					altitude: true,
					type: 'gcj02',
					success: (res) => {
						if (res.latitude && res.longitude) {
							this.xyTude = [res.latitude, res.longitude]
							this.getDistance()
						}
					}
				})
			},
			handelCount() {
				this.$url('/pages/clockcount/index')
			},
			handelRule() {
				this.$url('/pages/clockrules/index')
			},
			handelClocked() {
				if (this.isClock == true) {
					if (this.upClock == true && this.downClock == true) {
						this.cloedValue = '更新', this.clockEndvalue = this.$moment(new Date()).format("HH:mm")
					} else {
						this.upClock == true ? (this.downClock = true, this.cloedValue = '下班', this.clockEndvalue = this
							.$moment(new Date()).format("HH:mm")) : (this.upClock =
							true, this
							.cloedValue = '上班', this.clockStartvalue = this.$moment(new Date()).format("HH:mm"))
					}
					clocked({
						employeesId:this.userInfo.userId,
						teamId: 2,
						checkTimeDay: this.$moment(new Date()).format("YYYY-MM-DD")
					}).then(res => {
						if (res.code == 200) {
							this.show = true
						}
					})
					this.$forceUpdate()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		max-height: 100%;
		flex-direction: column;

		.clock-map {
			margin: 8px;
			width: calc(100% - 16px);
			height: 60vh;
			padding-bottom: 8px;

			.close-btn {
				margin: 0 auto;
				margin-top: 5px;
				margin-bottom: 5px;
				border-radius: 4px;
				background-color: rgb(180, 180, 180);
				width: 20px;
				height: 5px;
			}
		}

		.ui-title {
			font-size: 12px;
		}

		uni-image {
			width: 24px;
			height: 24px;
		}

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
					width: 68px;
					white-space: nowrap;
					margin: 0;
					box-shadow: 0 0 2px 2px rgba(227, 227, 227, 0.1);
					background-color: rgb(255, 255, 255);
					border: 0;
					border-radius: 12px;
					font-size: 8px;

					&:nth-child(2) {
						margin-left: 8px;
						width: 54px;
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

			.clocked-tips {
				margin-top: 3px;
				font-size: 9px !important;
				color: red;
			}

			uni-text {
				font-size: 12px;
				margin: 0 10px;
			}
		}

		.dialog {
			width: 130px;
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

		}
	}
</style>
