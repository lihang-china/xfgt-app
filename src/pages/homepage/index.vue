<template>
	<view class="container">
		<view class="tabbar">
			<ui-card class="clendarBg">
				<view class="clendarBg-top">
					<view class="clendarBg-left flex-column">
						<text>
							{{ date | formatDate}}
						</text>
						<text>{{ date | formatDay }}</text>
					</view>
					<view class="clendarBg-right">
						<u-icon color="#fff" size="76px" name="account-fill"></u-icon>
					</view>
				</view>
				<view class="clendarBg-bottom">
					<u-grid col="4">
						<u-grid-item v-if="clockData && clockData[item.value] > 0" @click="handleGrid(item)"
							v-for="(item,index) in gridList" :key="index">
							<u-icon color="#fff" size="20px" :name="item.icon"></u-icon>
							<text>{{item.title}}
							</text>
							<u-badge :bgColor="item.color" :absolute="true" :offset="[10,2]" :type="item.type" max="99"
								:value="clockData[item.value]">
							</u-badge>
						</u-grid-item>
					</u-grid>
				</view>
			</ui-card>
			<ui-card :title="'今日排班信息'">
				<view class="center-bottom ">
					<view v-if="wordData">
						<view class="bottom-icon">
							<u-tag :text="wordData.shiftName ? wordData.shiftName :'休息' " shape="circle"></u-tag>
							<text>{{wordData.cautionTime ? wordData.cautionTime + '——' :''}}
							</text><text>{{wordData.endTime ? wordData.endTime :'今日暂无排班信息'}}</text>
						</view>
					</view>
					<view>
						<u-icon color="rgb(60, 156, 255)" size="28px" name="clock-fill"></u-icon>
					</view>
				</view>
				<view class="bottom-notice">
					<u-notice-bar v-show="wordData.data" color="#0068f8" bgColor="#0068f801"
						:text="wordData.data ?  wordData.data.desc : '空'" speed="80">
					</u-notice-bar>
				</view>
			</ui-card>
			<ui-card :title="'消息通知'">
				<view class="flex-center">
					<u-notice-bar v-if="msgList[0]" icon="chat" bgColor="#0068f801" :text="msgList[0].noticeTitle +'...'">
					</u-notice-bar>
					<text v-else>暂无新通知</text>
				</view>
				<view class="flex-flex bottom-message">
					<text @click="handleMsg" class=" ui-text-btn" v-if="msgList.length > 1">更多</text>
					<u-icon color="rgb(0, 143, 253)" name="arrow-right-double"></u-icon>
				</view>
			</ui-card>
			<nav-card :navList="navList" :gridList="gridList" :title="'我的'" />
		</view>
		<update />
		<ui-tabbar />
	</view>

</template>
<script>
	import {
		selClass,
		clockCount
	} from '/src/api/class.js'
	import update from '../update/index.vue'
	import {
		msgList
	} from '../message/default.js'
	import navCard from './components/navList.vue'
	import {
		selectData
	}
	from '../attendance/defualt.js'
	import {
		navList,
		gridList
	} from './default.js'
	import {
		noticeList
	} from '/src/api/system.js'
	export default {
		components: {
			navCard,
			update
		},
		data() {
			return {
				clockData: undefined,
				msgList: [],
				selectData: selectData,
				wordData: {},
				date: new Date(),
				navList: navList,
				gridList: gridList
			}
		},
		mounted(){
			this.$nextTick(function(){
				this.getClockCount()
				this.getWorkData()
				this.getNoticeList()
			})
		},
		onShow() {
			uni.hideTabBar()
		},
		methods: {
			getNoticeList() {
				noticeList().then(res => {
					this.msgList.splice(0)
					this.msgList = res.rows 
				})
			},
			getClockCount() {
				clockCount({
					beginrepairDate: this.$moment(this.date).format('YYYY-MM') + '-01',
					endrepairDate: this.$moment(this.date).format('YYYY-MM-DD'),
					employeesId: uni.getStorageSync('user_info').user.userId
				}).then(res => {
					this.clockData = res.data
					this.$forceUpdate()
				})
			},
			handleMsg() {
				this.$url('/pages/message/index')
			},
			handleGrid() {
				this.$url('/pages/clockcount/index')
			},
			getWorkData() {
				this.$nextTick(function(){
					selClass({
						teamId: uni.getStorageSync('xfgt-user_team').teamId,
						endrepairDate: this.$moment(new Date()).format('YYYY-MM-DD'),
						beginrepairDate: this.$moment(new Date()).format('YYYY-MM-DD')
					}).then(res => {
						this.wordData = res.data.daysOfList[0]
					
					})
				})
					
			
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.bottom-message {
			justify-content: flex-end;
		}

		.clendarBg {
			uni-text {
				color: #FFF !important;
			}

			.clendarBg-top {
				width: 100%;
				display: flex;
				justify-content: space-between;

				uni-text {
					font-size: 15px;
				}

				.clendarBg-left {
					height: 100%;
					width: 65%;
					margin-top: 8px;
				}

				.clendarBg-right {
					height: 100%;
					width: 25%;
					margin-top: 8px;
				}

			}

			.clendarBg-bottom {
				margin-top: 20px;

				.u-grid-item {
					position: relative;
				}

				height: 30%;

				uni-text {
					font-size: 8px;
				}
			}

			background-color: rgb(0, 104, 248);

		}

		.bottom-notice {
			margin-top: 5px;
			margin-left: -8px;
		}

		.center-bottom {
			margin-top: 10px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.bottom-icon {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				color: #fff;

				uni-text {
					display: inline-table;
				}
			}

			uni-text {
				font-size: 10px;
				margin-left: 10px;
			}
		}
	}
</style>
