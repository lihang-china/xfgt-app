<template>
	<view class="container">
		<view class="tabbar flex-column">
			<uni-calendar :showMonth="false" :selected="selectData" ref="calendar" @change="changeInfo" />
			<view class="container-bottom flex-column">
				<view class="bottom-top">
					<text>{{date}}</text>
				</view>
				<view @click="createLog" v-if="Object.keys(fromData).length" class="bottom-center">
					<u-icon size="24" name="file-text" color="rgb(200,200,200)" />
					<text>点击新建日志</text>
				</view>
				<view v-else class="bottom-center">
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
							<u-input v-model="fromData.title" placeholderStyle="fontSize:12px;" placeholder="标题"
								border="none" suffixIcon="info-circle-fill"
								suffixIconStyle="color:rgb(162, 224, 232);margin-right:2px;">
							</u-input>
						</u-form-item>
						<u-form-item v-show="logShow">
							<u-input v-model="fromData.date"
								prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="clock"
								placeholderStyle="fontSize:12px;" @focus="handelTimePick()" placeholder="开始时间"
								border="none">
							</u-input>
							<u-datetime-picker @confirm="pikerConfirm" @close="pickerisSHow = false"
								:show="pickerisSHow" v-model="pickerVal" mode="date"></u-datetime-picker>
						</u-form-item>
						<u-form-item v-show="!logShow" borderBottom>
							<u-grid col="3">
								<u-grid-item>
									<u-input v-model="fromData.startDate"
										prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="clock"
										placeholderStyle="fontSize:12px;" placeholder="开始时间" border="none">
									</u-input>
								</u-grid-item>
								<u-grid-item>
									-
								</u-grid-item>
								<u-grid-item>
									<u-input v-model="fromData.endDate" placeholderStyle="fontSize:12px;"
										placeholder="结束时间" border="none">
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

						<u-form-item borderBottom>
							<u-textarea v-model="fromData.desc"
								prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="order"
								placeholderStyle="fontSize:12px;" placeholder="请输入备注" border="none">
							</u-textarea>
						</u-form-item>
						<u-form-item v-show="logShow" borderBottom>
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
		manualList,
		attendanceRecord,
		attendanceRecordList,
	} from '/src/api/class.js'
	import {
		uniCalendar,
		uniSwiperDot
	} from '@dcloudio/uni-ui'
	import {
		selectData
	} from './defualt.js'
	export default {
		components: {
			uniCalendar,
			uniSwiperDot
		},
		data() {
			return {
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
			}
		},
		created() {
			this.getManualList()
			this.initData()
		},
		methods: {
			pikerConfirm(val) {
				this.pickerVal = val
				this.fromData.date = this.$moment(val.value).format("YYYY-MM-DD")
				this.$forceUpdate()
				this.pickerisSHow = false
			},
			attendanceRecordList(date) {
				attendanceRecordList({
					beginrepairDate: date,
					endrepairDate: date,
					pageNum: 1,
					pageSize: 10
				}).then(res => {})
			},
			handelSubmit() {
				let data = {
					teamId: 2,
					journalDate:this.fromData.date,
					logCaption: this.fromData.title,
					noticeContent: this.fromData.desc
				}
				attendanceRecord(data).then(res => {
					if (res.code == 200) {
						uni.showToast({
							icon: "success",
							title: '新建日志成功成功',
							duration: 1000
						});
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
						date: this.$moment(new Date).format('YYYY-MM-DD')
					}
					this.pickerVal = this.$moment(new Date).format('YYYY-MM-DD')
					this.logShow = true
					this.show = true
				} else {
					uni.$u.toast('请不要连续快速点击')
				}
			},
			getManualList() {
				manualList({
					teamId: 2,
					// endrepairDate: "2022-01-20",
					// beginrepairDate: "2022-01-18"
				}).then(res => {
					res.data.forEach(e => {
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
					})

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

	::v-deep .u-picker {
		background-color: #fff !important;
	}
</style>
