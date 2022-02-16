<template>
	<view class="app-container">
		<view class="container-from">
			<u-form size="mini">
				<u-form-item borderBottom>
					<u-input v-model="fromData.title" placeholderStyle="fontSize:16px;" placeholder="标题" border="none"
						suffixIcon="info-circle-fill" suffixIconStyle="color:rgb(162, 224, 232);margin-right:2px;">
					</u-input>
				</u-form-item>
				<u-form-item borderBottom>
					<u-grid col="3">
						<u-grid-item>
							<u-input v-model="fromData.startDate"
								prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="clock"
								placeholderStyle="fontSize:14px;" @focus="handelTimePick()" placeholder="开始时间"
								border="none">
							</u-input>
						</u-grid-item>
						<u-grid-item>
							-
						</u-grid-item>
						<u-grid-item>
							<u-input v-model="fromData.endDate" placeholderStyle="fontSize:14px;"
								@focus="handelTimePick()" placeholder="结束时间" border="none">
							</u-input>
						</u-grid-item>
					</u-grid>
					<u-datetime-picker @cancel="pickerisSHow = false" :closeOnClickOverlay="true" :show="pickerisSHow"
						mode="time"></u-datetime-picker>
				</u-form-item>
				<u-form-item borderBottom>
					<u-input v-model="fromData.phone" type="number"
						prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="account"
						placeholderStyle="fontSize:14px;" placeholder="联系人" border="none">
					</u-input>
				</u-form-item>
				<u-form-item borderBottom>
					<u-input v-model="fromData.desc" prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;"
						prefixIcon="order" placeholderStyle="fontSize:14px;" placeholder="请输入备注" border="none">
					</u-input>
				</u-form-item>
				<u-form-item borderBottom>
					<view class="tag-group">
						<view class="u-page__tag-item" v-for="(item, index) in checkboxs" :key="index">
							<u-tag :text="`班组${index + 1}`" :plain="!item.checked" type="primary" :name="index">
							</u-tag>
						</view>
						<u-button size="small" class="tag-addpaln">+</u-button>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<u-button class="container-addplan" icon="plus" iconColor="rgb(0, 153, 255)"></u-button>
		<view class="bottom-fiexd flex-center">
			<text>取消</text>
			<text>保存</text>
		</view>
	
	</view>
</template>
<script>
	import {
		uniCalendar,
		uniSwiperDot
	} from '@dcloudio/uni-ui'
	export default {
		components: {
			uniCalendar,
			uniSwiperDot
		},
		data() {
			return {
				info: [{
					content: '内容 A'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
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
				selected: [{
					date: '2022-01-27',
					info: '夜班',
					data: {
						startDate: '09:00',
						endDate: '17:00',
						desc: '今天不加班',
						phone: 18804626605,
						tag: []
					}
				}]
			}
		},

		mounted() {},
		methods: {
			addClass() {
				//添加计划
			},
			addPaln() {
				//新增班组

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


<style scoped lang="scss">
	.app-container {
		background-color: #fff;
		margin-bottom: 50px;
		height: calc(100% - 70px);
		border-radius: 0 0 35px 35px;

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

		.container-addplan {
			border: none;
			margin-right: 0;
			margin-top: 8px;
			border-radius: 8px;
			width: 30px;
			min-width: 30px;
			font-size: 8px;
		}

		.tag-addpaln {
			width: 42pt;
			height: 21pt;
			min-width: 30pt;
			margin: 0;
			margin-left: 5px;
			border: 1px dashed rgb(180, 180, 180);
			color: rgb(180, 180, 180);
		}

		.bottom-fiexd {
			left: 0;
			position: fixed;
			bottom: 0;
			width: 100%;

			uni-text {
				padding: 8px 30px;
				color: rgb(32, 32, 32);
				font-weight: 650;
				font-size: 11px;
			}

		}
	}

	::v-deep .tag-group {
		max-height: 50px;
		overflow: scroll;
		display: flex;
		flex-wrap: wrap;
	}

	.u-form-item {
		.u-page__tag-item {
			::v-deep .u-tag {
				margin: 5px 0 5px 5px;

				.u-tag__text {
					white-space: nowrap;
				}
			}
		}
	}
</style>
