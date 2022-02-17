<template>
	<view class="container">
		<view>
			<ui-card class="container-top">
				<u-grid :border="true" :col="2">
					<u-grid-item v-for="(item,index) in baseList" :key="index">
						<u-badge max="99" :value="item.value" :absolute="true" :offset="[0,35]"></u-badge>
						<view @click="hadnleChange(item)" class="grid-text flex-column">
							<view class="grid-crile flex-center">
								<u-icon :color="item.color" :name="item.icon" size="42"></u-icon>
							</view> <text>{{initData.typeValue[index]}}</text>
						</view>
					</u-grid-item>
				</u-grid>
			</ui-card>
			<view class="container-nav flex-between">
				<view>
					<text>{{initData.listType}}</text>
				</view>
				<view class="flex-center">
					<image :src="require('/src/images/filter.png')" mode=""></image><text
						@click="isShow = true">筛选</text><text @click="type = -1">刷新</text>
				</view>
			</view>
		</view>
		<view class="container-bottom">
			<order-card :cardType="type" />
			<select-popup :cardEdit="initData" :navList="navList" :open.sync="isShow" @open="handleSubmit" />
		</view>
	</view>
</template>

<script>
	import SelectPopup from '/src/public/components/SelectPopup.vue'
	import OrderCard from '../components/OrderCard.vue'
	import {
		navList,
		orderList,
		cardEdit
	} from './defult.js'
	export default {
		components: {
			OrderCard,
			SelectPopup
		},
		data() {
			return {
				type: undefined,
				initData: cardEdit[this.$store.state.pageName],
				orderList: orderList,
				isShow: false,
				navList: navList,
				baseList: [{
					title: '一般',
					color: 'rgb(104, 156, 244)',
					value: 22,
					icon: "order",
					type: 0,
				}, {
					title: '紧急',
					color: 'rgb(251, 87, 84)',
					value: 3,
					icon: 'bell',
					type: 1
				}],
			}
		},
		methods: {
			hadnleChange(row) {
				this.type = row.type
			},
			handleSubmit(val) {
				this.isShow = val
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 0;

		::v-deep .u-cell__title-text {
			font-size: 10px;
		}

		.container-nav {
			uni-text {
				padding: 0 5px;
				font-size: 9px;

				&:nth-child(1) {
					font-size: 10px;
					color: rgb(0, 133, 249);
				}

				&:nth-child(2) {
					padding-left: 2px;
					border-right: 1px solid rgb(200, 200, 200);
				}

			}

			uni-image {
				width: 14px;
				height: 14px;
				margin: 5px 0;
			}
		}

		.container-bottom {
			margin-top: -4px;
			padding-bottom: 20px;
			flex-grow: 1;
			overflow: scroll;
		}

		.container-top {
			margin-top: 8px;

			.grid-text {
				align-items: center;

				uni-text {
					margin: 3px;
				}

				.grid-crile {
					background-color: rgb(240, 240, 240);
					padding: 0;
					border-radius: 50%;
					width: 50px;
					height: 50px;
				}
			}
		}
	}
</style>
