<template>
	<view class="container">
		<view>
			<ui-card class="container-top">
				<u-grid :border="true" :col="2">
					<u-grid-item v-for="(item,index) in baseList" :key="index">
						<u-badge max="99" :value="item.value" :absolute="true" :offset="[0,35]"></u-badge>
						<view class="grid-text flex-column">
							<view class="grid-crile flex-center">
								<u-icon :color="item.color" :name="item.icon" size="42"></u-icon>
							</view> <text>{{initData.typeValue[index]}}</text>
						</view>
					</u-grid-item>
				</u-grid>
			</ui-card>
			<u-popup :closeable="true" :round="30" :show="isShow" @close="isShow = false" @open="isShow = true">
				<view class="popup-filter">
					<text class="ui-h1">全部筛选</text>
					<u-collapse :value="[0,1,2]" :border="false" v-for="(item,index) in navList" :key="index">
						<u-collapse-item :name="index" :border="false" :title="item.title">
							<view>
								<text class="tag-block" v-for="(e,idx) in item.children" :key="idx">{{e.title}}</text>
							</view>
						</u-collapse-item>
					</u-collapse>
					<view class="bottom-btngroup">
						<text>重置</text><text>确认</text>
					</view>
				</view>
			</u-popup>
			<view class="container-nav flex-between">
				<view>
					<text>{{initData.listType}}</text>
				</view>
				<view class="flex-center">
					<image :src="require('../../images/filter.png')" mode=""></image><text
						@click="isShow = true">筛选</text><text>更多</text>
				</view>
			</view>
		</view>
		<view class="container-bottom">
			<order-card />
		</view>
	</view>
</template>

<script>
	import OrderCard from './components/OrderCard.vue'
	import {
		navList,
		orderList,
		cardEdit
	} from './defult.js'
	export default {
		components: {
			OrderCard
		},
		data() {
			return {
				initData: cardEdit[this.$store.state.pageName],
				orderList: orderList,
				isShow: false,
				navList: navList,
				baseList: [{
					title: '一般',
					color: 'rgb(104, 156, 244)',
					value: 22,
					icon: "order"
				}, {
					title: '紧急',
					color: 'rgb(251, 87, 84)',
					value: 3,
					icon: 'bell'
				}],
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

		.popup-filter {
			padding: 8px 0;
			height: 80vh;
			border-radius: 20px 20px 0 0;

			.ui-h1 {
				display: block;
				width: 100%;
				text-align: center;
				font-weight: normal;
				font-size: 10px;
				margin-bottom: 10px;
			}

			position: relative;

			.bottom-btngroup {
				width: calc(100% - 24px);
				padding: 4px 12px;
				position: fixed;
				bottom: 10px;

				uni-text {
					display: flex;
					display: inline-block;
					width: 50%;
					text-align: center;
					padding: 5px 0;
					color: #fff;
					background-color: rgb(105, 154, 244);

					&:nth-child(1) {
						background-color: rgb(251, 87, 84);
						border-radius: 10px 0 0 10px;
					}

					&:nth-child(2) {
						border-radius: 0 10px 10px 0;
					}
				}
			}

			.tag-block {
				color: rgb(42, 42, 42);
				background-color: rgb(241, 242, 243);
				padding: 5px 8px;
				font-size: 9px;
				margin: 3px;
				width: calc(33% - 22px);
				border-radius: 10px;
				text-align: center;
				display: inline-block;
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
