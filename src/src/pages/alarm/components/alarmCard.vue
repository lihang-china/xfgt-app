<template>
	<ui-card>
		<view class="container-header flex-between">
			<text>{{cardData.eventName}}</text>
			<u-icon size="24" :name="alarmIcon[cardData.level - 1]"></u-icon>
		</view>
		<view class="card-container flex-column">
			<text v-if="cardData.state !== 'INIT' ">处理账号：{{cardData.transactor}}</text>
			<view class="flex-flex">
				<u-tag size="mini" :text="cardData.state | filterState" :type="cardData.state | tagState" plain></u-tag>
				<text v-if="cardData.state !== 'INIT' " class="handle-time">( 处理时间：{{cardData.processed}} )</text>
			</view>
		</view>

		<view class="alarm-bottom flex-between">
			<text>告警时间：</text>
			<view class="flex-flex">
				<text class="alarm-date">{{cardData.create}}</text>
				<u-icon v-if="!detail" @click="handleView" size="22" :name="require('../../../images/eyes.png')">
				</u-icon>
			</view>
		</view>
		<view v-if="detail" class="container-detail">
			<view class="flex-between">
				<text>告警编号：</text><text>{{cardData.id}}</text>
			</view>
			<view class="flex-column">
				<text>告警内容：</text>
				<view class="detail-textarea">
					<text v-if="cardData.alarmData">{{cardData.alarmData}}</text>
					<view v-else class="alarmData-icon flex-center">
						<view class="flex-column">
							<u-icon :name="require('../../../images/smicon.png')" size="48"></u-icon>
							<text>告警内容暂为空</text>
						</view>
					</view>
				</view>

			</view>
		</view>
	</ui-card>
</template>

<script>
	export default {
		filters: {
			tagState(val) {
				if (val == 'FINISHED') {
					return undefined
				} else if (val == 'IGNORE') {
					return 'warning'
				} else if (val == 'INIT') {
					return 'error'
				}
			},
			filterState(val) {
				if (val == 'FINISHED') {
					return '已处理'
				} else if (val == 'IGNORE') {
					return '已忽略'
				} else if (val == 'INIT') {
					return '未处理'
				}
			}
		},
		props: {
			detail: {
				type: Boolean,
				default: false
			},
			listIndex: {
				type: Number,
				default: 0
			},
			cardData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				alarmIcon: [require('../../../images/alarm1.png'), require('../../../images/alarm2.png'), require(
					'../../../images/alarm3.png')]
			}
		},
		methods: {
			handleView() {
				this.$emit('cardIndex', this.listIndex)
			},
		}
	}
</script>

<style scoped lang="scss">
	uni-text {
		color: rgb(100, 101, 118);
		margin-bottom: 2px;
	}

	.container-detail {
		.detail-textarea {
			height: 80px;
			overflow: scroll;
			border-radius: 8px;
			background-color: rgb(250, 251, 252);
			padding: 6px;
			margin-top: 4px;

			uni-text {
				white-space: normal !important;
			}

			.alarmData-icon {
				height: 100%;
				uni-view {
					justify-content: center;
					uni-text {
						white-space: normal !important;
						color: rgb(200, 200, 200);
					}
				}
			}

			uni-text {
				font-size: 9px;
				text-indent: 9px;
				line-height: 12px;
				word-break: break-all;
				color: rgb(180, 180, 180);
			}

		}

		uni-view {
			margin-top: 4px;

			uni-text {
				&:nth-child(1) {
					white-space: nowrap;
				}
				&:nth-child(2) {
					color: rgb(180, 180, 180);
					font-size: 9px;
					max-height: 100%;
					text-align: right;
					overflow: scroll;
				}
			}
		}

	}

	.container-header {
		margin-bottom: 5px;

		uni-text {
			font-size: 11px;
			font-weight: bold;
			color: rgb(42, 42, 42);
		}
	}

	.card-container {
		margin-top: 6px;

		.flex-flex {
			margin: 3px 0;
		}

		.handle-time {
			color: rgb(180, 180, 180);
			margin-left: 4px;
			font-size: 9px;
		}
	}

	.alarm-bottom {
		margin-top: 4px;
		padding-top: 3px;
		border-top: 1px solid rgb(200, 200, 200);

		.alarm-date {
			font-size: 9px;
			color: rgb(180, 180, 180);
		}

		uni-text {
			font-weight: normal;
			margin: 0;
			margin-right: 4px;

		}
	}
</style>
