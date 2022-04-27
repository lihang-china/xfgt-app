<template>
	<view class="container">
		<view class="tabbar flex-column">
			<uni-calendar :showMonth="false" :selected="selectData" ref="calendar" @change="changeInfo" />
			<view class="container-bottom flex-column">
				<view class="bottom-top">
					<text>{{date}}</text>
				</view>
				<view v-if="Object.keys(fromData).length" class="bottom-center">
					<u-form v-if="Object.keys(logData).length" class="log-form">
						<u-form-item v-for="(item,index) in formItem" :key="index">
							<view class="flex-column">
								<view class="log-title flex-flex">
									<u-icon size="18px" color="rgb(25, 122, 206)" :name="item.icon"></u-icon>
									<view class="log-span">
									</view> <text>{{item.title}}</text>
								</view>
								<text>{{logData[item.value]}}</text>
							</view>
						</u-form-item>
					</u-form>
					<view @click="createLog" v-else class="log-create flex-column-center">
						<u-icon size="24" name="file-text" color="rgb(200,200,200)" />
						<text>点击新建日志</text>
					</view>
				</view>
				<view v-else class="bottom-none">
					<text>今日暂无排班信息</text>
				</view>
			</view>

		</view>
		<u-popup :duration="200" :show="show" :round="10" mode="center" @close="popupClose">
			<ui-card>
				<view class="popup-dialog">
					<view class="dialog-header flex-between">
						<text>{{date}}</text>
						<u-icon color="color: rgb(72,72,72);" name="list-dot" size="22"></u-icon>
					</view>
					<u-form size="mini">
						<u-form-item borderBottom>
							<u-input disabledColor="rgb(255,255,255)" :disabled="!logShow" v-model="fromData.title"
								placeholderStyle="fontSize:12px;" placeholder="标题" border="none"
								suffixIcon="info-circle-fill"
								suffixIconStyle="color:rgb(162, 224, 232);margin-right:2px;">
							</u-input>
						</u-form-item>
						<u-form-item v-show="logShow">
							<view @click="handelTimePick()">
								<u-input
								:readonly="true"
								v-model="fromData.date"
									prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="clock"
									placeholderStyle="fontSize:12px;"  placeholder="开始时间"
									border="none">
								</u-input>
							</view>
							<u-datetime-picker  @confirm="pikerConfirm" @cancel="pickerisSHow = false"
								:show="pickerisSHow" v-model="pickerVal" mode="date"></u-datetime-picker>
						</u-form-item>
						<u-form-item v-show="!logShow" borderBottom>
							<u-grid col="3">
								<u-grid-item>
									<u-input disabledColor="rgb(255,255,255)" :disabled="!logShow"
										v-model="fromData.startDate"
										prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="clock"
										placeholderStyle="fontSize:12px;" placeholder="开始时间" border="none">
									</u-input>
								</u-grid-item>
								<u-grid-item>
									-
								</u-grid-item>
								<u-grid-item>
									<u-input disabledColor="rgb(255,255,255)" :disabled="!logShow"
										v-model="fromData.endDate" placeholderStyle="fontSize:12px;" placeholder="结束时间"
										border="none">
									</u-input>
								</u-grid-item>
							</u-grid>
						</u-form-item>
						<!-- <u-form-item borderBottom>
							<u-input v-model="fromData.phone" type="number"
								prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="account"
								placeholderStyle="fontSize:12px;" placeholder="创建人" border="none">
							</u-input>
						</u-form-item> -->

						<u-form-item>
							<u-textarea :disabled="!logShow" :maxlength="200" count v-model="fromData.desc"
								placeholder="请输入备注">
							</u-textarea>
						</u-form-item>
						<u-form-item v-show="logShow">
							<u-button @click="handelSubmit" color="rgb(118, 223, 220)" type="primary">提交</u-button>
						</u-form-item>
					</u-form>
				</view>
			</ui-card>
		</u-popup>
		<ui-tabbar />
	</view>
</template>

<script>
	import {
		selClass,
		attendanceRecord,
		attendanceRecordListId,
	} from '/src/api/class.js'
	import {
		uniCalendar,
		uniSwiperDot
	} from '@dcloudio/uni-ui'
	import {
		selectData,
		formItem
	} from './defualt.js'
	export default {
		components: {
			uniCalendar,
			uniSwiperDot
		},
		data() {
			return {
				formItem: formItem,
				logData: {},
				timer: undefined,
				logShow: false,
				info: [{}],
				current: 0,
				mode: 'round',
				date: this.$moment(new Date()).format('MM月DD日'),
				fromData: {},
				pickerisSHow: false,
				show: false,
				selectData: [],
				pickerVal: null,
				logDate: undefined,
				queryData: {
					teamId: uni.getStorageSync('xfgt-user_team').teamId
					// ,
					// endrepairDate: this.$moment(new Date()).format('YYYY-MM') + '-' + String(new Date(new Date()
					// 	.getFullYear(), new Date().getMonth() + 1, 0).getDate()),
					// beginrepairDate: this.$moment(new Date()).format('YYYY-MM') + '-01'
				}
			}
		},
		onShow() {
			this.getManualList()
			this.attendanceRecordList(this.$moment(new Date()).format('YYYY-MM-DD'))
			// this.$nextTick(()=>{
				
			// 	console.log(this.$refs.calendar,'calendarcalendarcalendar')
			// 	setTimeout(()=>{
			// 		var rightBtn = uni.createSelectorQuery().select('.uni-calendar--right')
			// 		plus.push.addEventListener('click', () => {
			// 			this.mounthChange()
			// 		})
			// 		var leftBtn = uni.createSelectorQuery().select('.uni-calendar--left')
			// 		plus.push.addEventListener('click', () => {
			// 			this.mounthChange()
			// 		})
			// 	},500)
			// })
		},
		methods: {
			// mounthChange() {
			// 		let text = document.querySelector('.uni-calendar__header-text').innerText
			// 		let date = new Date(this.$moment(text).format('YYYY-MM') + '-01')
			// 		let year = text.split('/')[0]
			// 		let month = date.getMonth()
			// 		let startDay = this.$moment(text).format('YYYY-MM') + '-01'
			// 		let endDay = this.$moment(new Date(year, month + 1, 0)).format('YYYY-MM-DD')
			// 		this.queryData.endrepairDate = endDay
			// 		this.queryData.beginrepairDate = startDay
			// 		this.getManualList()
			// },
			pikerConfirm(val) {
				this.pickerVal = val
				this.fromData.date = this.$moment(val.value).format("YYYY-MM-DD")
				this.$forceUpdate()
				this.pickerisSHow = false
			},
			attendanceRecordList(date, update) {
				if (!(this.logDate && this.logDate == date && !update)) {
					//判断日期是否相同，防止重复获取数据
					this.logDate = date
					this.logData = {}
					attendanceRecordListId({
						employeesId: uni.getStorageSync('user_info').user.userId,
						journalDate: date,
					}).then(res => {
						if (res.rows[0]) {
							this.logData = res.rows[0]
						}
					})
				}
			},
			handelSubmit() {
				let data = {
					teamId:uni.getStorageSync('xfgt-user_team').teamId,
					employeesId: uni.getStorageSync('user_info').user.userId,
					journalDate: this.fromData.date,
					logCaption: this.fromData.title,
					noticeContent: this.fromData.desc
				}
				attendanceRecord(data).then(res => {
					if (res.code == 200) {
						uni.showToast({
							icon: "success",
							title: '新建成功',
							duration: 1000
						});
						this.attendanceRecordList(this.logDate, true)
						this.logShow = false
						this.show = false
					} else {
						uni.showToast({
							icon: "none",
							title: res.msg,
							duration: 1000
						});
					}
				})
			},
			popupClose() {
				this.show = false
				this.timer = setTimeout(() => {
					this.logShow = false
					this.timer = undefined
				}, 500)
			},
			createLog() {
				if (this.timer === undefined) {
					this.fromData = {
						date: this.$moment(new Date).format('YYYY-MM-DD'),
					}
					this.pickerVal = this.$moment(new Date).format('YYYY-MM-DD')
					this.logShow = true
					this.show = true
				} else {
					uni.$u.toast('请不要连续快速点击')
				}
			},
			getManualList() {
				selClass(this.queryData).then(res => {
					if (res.code == 200) {
						res.data.daysOfList.forEach(e => {
							this.selectData.push({
								date: e.dateStr,
								info: e.shiftName,
								data: {
									...e,
									startDate: e.startTime,
									endDate: e.endTime,
									desc: e.remark,
									tag: []
								}
							})
							this.initData()
						})
					}
				})
			},
			initData() {
				this.selectData.forEach(e => {
					if (e.date == this.$moment(new Date).format('YYYY-MM-DD')) {
						this.fromData = e.data
					}
				})
			},
			handelView() {
				this.show = true
			},
			handelTimePick() {
				this.pickerisSHow = true
			},
			changeInfo(e) {
				this.attendanceRecordList(e.fulldate)
				this.fromData = {}
				this.date = this.$moment(e.fulldate).format("MM月DD日")
				if (Object.keys(e.extraInfo).length > 0) {
					this.show = true
					this.fromData = e.extraInfo.data
					this.fromData.title = e.extraInfo.info
					this.fromData.date = e.extraInfo.date
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./style/default.scss";
	::v-deep .uni-calendar__header-btn-box {
		width: 10px;
		margin: 0 3px;
	}

	::v-deep .u-picker {
		background-color: #fff !important;
	}
</style>
