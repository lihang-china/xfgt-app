<template>
	<view class="container">
		<uni-calendar :showMonth="false" :selected="selectData" ref="calendar" @change="changeInfo" />
		<view class="container-bottom">
			<view class="bottom-top">
				<text>{{date}}</text>
			</view>
			<view v-if="Object.keys(fromData).length" class="bottom-center">
				<text>{{fromData.desc}}</text>
			</view>
			<view v-else class="bottom-center">
				<!-- <image @click="show = true" class="center-icon" src="../../images/smicon.png" mode=""></image> -->
				<text>暂无备注</text>
			</view>
		</view>
		<u-popup :show="show" :round="10" mode="center" @close="show = false">
			<ui-card>
				<view class="popup-dialog">
					<view class="dialog-header">
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
						<!-- 		<u-form-item borderBottom>
										<view class="tag-group">
											<view class="u-page__tag-item" v-for="(item, index) in checkboxs"
												:key="index">
												<u-tag size="mini" :text="`班组${index + 1}`" :plain="!item.checked"
													type="primary" :name="index" @click="checkboxClick">
												</u-tag>
											</view>
										</view>
									</u-form-item> -->
					</u-form>
				</view>
			</ui-card>
		</u-popup>
		<!-- <u-icon  @click="handelView" class="circle-button" color="rgb(162, 224, 232);" name="plus" size="24px"></u-icon> -->
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
				info: [{

				}],
				current: 0,
				mode: 'round',
				checkboxs: [{
						checked: true
					},
					{
						checked: false
					},
					{
						checked: false
					},
					{
						checked: false
					},
					{
						checked: false
					}, {
						checked: false
					},
					{
						checked: false
					},
				],
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
			checkboxClick(name) {
				this.checkboxs[name].checked = !this.checkboxs[name].checked
			},
			handelView() {
				this.show = true
			},
			handelTimePick() {
				this.pickerisSHow = true
			},
			changeInfo(e) {
				this.fromData = {}
				console.log(e, '11111111111')
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
	// @import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");
	.container {
		width: 100%;
		height: calc(100% - 20px);
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;

		::v-deep .uni-swiper__warp {
			overflow: visible !important;
		}

		::v-deep uni-swiper .uni-swiper-wrapper {
			overflow: visible !important;
		}

		::v-deep uni-swiper-item {
			padding: 3px !important;
			width: calc(100% - 6px) !important;
		}

		::v-deep .uni-swiper__dots-box {
			display: none;
		}

		.container-bottom {
			height: 100%;
			padding: 4px 8px;
			width: calc(100% - 16px);
			border-top: 0.5pt solid rgb(221, 221, 221);

			uni-text {
				font-size: 10px;
			}

			.bottom-center {
				.center-icon {
					width: 30px;
					height: 30px;
				}

				height: 90%;
				min-height: 80px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				uni-text {
					font-size: 9px;
					color: rgb(177, 177, 177);
				}
			}
		}

		.ui-card {
			padding: 0 0 10px 0;
			width: 100%;
		}

		::v-deep .u-popup__content {
			background-color: rgba(0, 0, 0, 0);
		}

		.swiper-box {
			background-color: rgba(0, 0, 0, 0);
			width: 210px;
			height: 230px;
		}

		.popup-dialog {
			padding: 15px 8px 15px 8px;
			width: 190px;

			.dialog-header {
				margin-bottom: 10px;

				uni-text {
					color: rgb(72, 72, 72);
				}

				display: flex;
				justify-content: space-between;
			}

			::v-deep .tag-group {
				max-height: 50px;
				overflow: scroll;
				display: flex;
				flex-wrap: wrap;
			}

			.u-form-item {
				margin-top: 5px;

				.u-page__tag-item {
					::v-deep .u-tag {
						margin: 5px 0 5px 5px;

						.u-tag__text {
							white-space: nowrap;
						}
					}
				}
			}
		}

		.circle-button {
			bottom: 45px;
			right: 8px;
			position: fixed;
			margin-left: 20px;
			background-color: rgb(248, 248, 248);
			box-shadow: 0 3px 5px 2px rgb(222, 222, 223);
			width: 35px;
			height: 35px;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		::v-deep .uni-calendar__content {
			padding: 0 5px;
			background-color: rgba(255, 255, 255, 0);

			.uni-calendar-item--checked {
				background-color: rgb(230, 230, 230);
				color: rgb(3, 116, 255);
				font-weight: bold;

				.uni-calendar-item__weeks-lunar-text {
					border: none !important;
				}

				.uni-calendar-item__weeks-box-text {
					border: none !important;
				}
			}

			.uni-calendar__header {
				border: none;
				justify-content: flex-start;
			}

			.uni-calendar__header-text {
				font-weight: bold;
				position: relative;
				font-size: 14px;
			}

			.uni-calendar__backtoday {
				background-color: rgb(82, 146, 253);
				color: rgb(255, 255, 255);
			}

			height: 100%;

			.uni-calendar-item__weeks-box-circle {
				background-color: rgb(119, 0, 255);
				width: 4px !important;
				height: 4px !important;
			}

			.uni-calendar-item__weeks-box-item {
				width: 100%;
			}

			.uni-calendar__weeks {
				.uni-calendar-item__weeks-box {
					border: 2px solid rgba(255, 255, 255, 0);
					border-radius: 10px;
				}

				.uni-calendar__weeks-item {
					border-radius: 10px;
				}

				.uni-calendar__weeks-day {
					display: flex;

				}
				margin:4px;
				height: 30px;
				* {
					height: 100%;
				}
			}
		}
	}
</style>
