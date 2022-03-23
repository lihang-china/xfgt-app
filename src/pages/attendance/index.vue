<template>
	<view class="container">
		<view class="tabbar flex-column">
			<uni-calendar :showMonth="false" :selected="selectData" ref="calendar" @change="changeInfo" />
			<view class="container-bottom flex-column">
				<view class="bottom-top">
					<text>{{date}}</text>
				</view>
				<view v-if="Object.keys(fromData).length" class="bottom-center">
					<u-icon size="24" name="file-text" color="rgb(200,200,200)" />
					<text>点击新建日志</text>
				</view>
				<view v-else class="bottom-center">
					<text>今日暂无排班信息</text>
				</view>
			</view>

		</view>
		<u-popup :show="show" :round="10" mode="center" @close="show = false">
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
						<u-form-item borderBottom>
							<u-grid col="3">
								<u-grid-item>
									<u-input v-model="fromData.startDate"
										prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="clock"
										placeholderStyle="fontSize:12px;" @focus="handelTimePick()" placeholder="开始时间"
										border="none">
									</u-input>
								</u-grid-item>
								<u-grid-item>
									-
								</u-grid-item>
								<u-grid-item>
									<u-input v-model="fromData.endDate" placeholderStyle="fontSize:12px;"
										@focus="handelTimePick()" placeholder="结束时间" border="none">
									</u-input>
								</u-grid-item>
							</u-grid>
							<u-datetime-picker @cancel="pickerisSHow = false" :closeOnClickOverlay="true"
								:show="pickerisSHow" mode="time"></u-datetime-picker>
						</u-form-item>
						<u-form-item borderBottom>
							<u-input v-model="fromData.phone" type="number"
								prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="account"
								placeholderStyle="fontSize:12px;" placeholder="联系人" border="none">
							</u-input>
						</u-form-item>
						<u-form-item borderBottom>
							<u-input v-model="fromData.desc"
								prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="order"
								placeholderStyle="fontSize:12px;" placeholder="请输入备注" border="none">
							</u-input>
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
				info: [{}],
				current: 0,
				mode: 'round',
				date: this.$moment(new Date()).format('MM月DD日'),
				fromData: {},
				pickerisSHow: false,
				show: false,
				selectData: selectData
			}
		},
		created() {
			this.initData()
		},
		methods: {
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
</style>
