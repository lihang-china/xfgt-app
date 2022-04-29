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
			<order-card :dataList="orderList" :selData="selData" :cardType="type" />
			<select-popup @getData="getData" :cardEdit="initData" :navList="navList" :open.sync="isShow"
				@open="handleSubmit" />
		</view>
	</view>
</template>

<script>
	import {
		patrollistTask
	} from '/src/api/patrol.js'
	import {
		listTask
	} from '/src/api/maintain.js'
	import SelectPopup from '/src/public/components/SelectPopup.vue'
	import OrderCard from '../components/OrderCard.vue'
	import {
		maintainNav,
		inspection,
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
				queryData: {
					pageSize: 10000,
					pageNum: 1,
					teamId: uni.getStorageSync('xfgt-user_team').teamId,
				},
				selData: {},
				type: undefined,
				initData: cardEdit[this.$store.state.pageName],
				orderList:[],
				isShow: false,
				navList: maintainNav,
				baseList: [{
					title: '一般',
					color: 'rgb(104, 156, 244)',
					value: 0,
					icon: "order",
					type: 0,
				}, {
					title: '紧急',
					color: 'rgb(251, 87, 84)',
					value: 0,
					icon: 'bell',
					type: 1
				}],
			}
		},
		mounted() {
			if (this.$store.state.pageName == 'maintain') {
				this.navList = maintainNav
			} else if (this.$store.state.pageName == 'inspection') {
				this.navList = inspection
			}
			this.getList()
		},
		methods: {
			async getList() {
				uni.showLoading({
					title: '加载中'
				});
				await this.getCardList().then(res => {
					//长列表优化方法
					if (res.code === 200) {
						let max = 0
						let min = 0
						res.rows.forEach(e => {
							if (e.status == '0') {
								max += 1
							} else {
								min += 1
							}
						})
						this.$lazyList(this.orderList, res.rows, 10)
						this.baseList[0].value = max
						this.baseList[1].value = min
					} else {
						uni.$u.toast(res.msg)
					}
				})
				uni.hideLoading();
			},
			getCardList() {
				let data = new Promise((resolve, reject) => {
					if (this.$store.state.pageName === 'maintain') {
						this.getMaintainlist().then(res => {
							resolve(res)
						})
					} else if (this.$store.state.pageName === 'inspection') {
						this.getPatrolList().then(res => {
							resolve(res)
						})
					}
				})
				return data
			},
			async getPatrolList() {
				let data = await patrollistTask({
					...this.queryData
				})
				return data
			},
			async getMaintainlist() {
				let data = await listTask({
					...this.queryData
				})
				return data
			},
			getData(data) {
				this.queryData = {
					...this.queryData,
					...data
				}
				this.getList()
			},

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
		height: calc(100% - 60px);
		display: flex;
		flex-direction: column;
		padding: 0;
		overflow: scroll;
		position: absolute;
		width: calc(100% - 16px) !important;

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
			padding-bottom: 40px;
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
