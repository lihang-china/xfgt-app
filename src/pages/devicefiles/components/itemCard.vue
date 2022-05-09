<template>
	<ui-card v-if="cardData">
		<view class="flex-column">
			<view class="card-header">
				<text>{{cardData.equCode}}</text>
			</view>
			<view class="flex-between">
				<view class="flex-column">
					<text>设备名称：<text>{{cardData.equName}}</text></text>
				</view>
					<u-icon color="rgb(150,150,150)" @click="handleView" size="26" name="arrow-right">
					</u-icon>
			</view>
			<text>所在区域：<text class="font-nowarp">{{cardData.areaName}}</text></text>
			<view class="card-bottom">
				<view class="flex-between">
					<text>{{cardData.createTime}}</text>
					<u-tag :type="cardData.equStatus | tagType" :text="cardData.equStatus | tagStatus"></u-tag>
				</view>
			</view>
		</view>
	</ui-card>
</template>

<script>
	export default {
		props: {
			cardData: {
				type: Object,
				default: () => {}
			}
		},
		filters: {
			tagType(val) {
				if (val == 0) {
					return undefined
				} else if (val == 2) {
					return 'warning'
				} else if (val == 3) {
					return 'error'
				}
			},
			tagStatus(val) {
				if (val == 0) {
					return '正常'
				} else if (val == 2) {
					return '故障'
				} else if (val == 3) {
					return '报废'
				}
			}
		},
		methods: {
			handleView() {
				console.log(this.cardData.equCode, 'asdasdads')
				this.$url('/pages/devicefiles/deviceDetail?code=' + this.cardData.equCode)
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-text {
		uni-text {
			color: rgb(150, 150, 150);
		}
	}

	.card-header {
		uni-text {
			color: rgb(42, 42, 42);
			font-weight: bold;
		}
	}

	.card-bottom {
		margin-top: 5px;
		padding-top: 5px;
		border-top: 1px solid rgb(210, 210, 210);
	
		uni-text {
				font-size: 9px;
				color: rgb(180, 180, 180);
		}
	}
</style>
