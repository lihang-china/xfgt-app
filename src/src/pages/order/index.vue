<template>
	<view class="container">
		<u-navbar title="工单管理" :autoBack="true" />
		<view class="app-container">
			<ui-card>
				<view class="banner">
				</view>
			</ui-card>
			<u-sticky zIndex="999" class="search-sticky flex-column" customNavHeight="0" :offset-top="2">
				<u-search bgColor="rgb(255,255,255)" v-model="search" inputAlign="center" @click="handleSelect"
					:disabled="true" placeholder="筛选" :showAction="false"></u-search>
			</u-sticky>
			<u-sticky zIndex="99" customNavHeight="0" :offset-top="0">
				<view class="container-nav flex-between">
					<view class="flex-flex repair">
						<u-icon @click="handleImg" color="rgb(180, 180, 180)" :name="ascImg" size="22"></u-icon>
						<text>报修</text>
					</view>
					<view class="flex-flex add" @click="handleAdd">
						<u-icon color="rgb(60, 156, 255)" name="plus-circle" :size="iconSize"></u-icon><text>添加</text>
					</view>
				</view>
			</u-sticky>
			<view class="container-card">
				<order-card />
			</view>
			<select-popup :cardEdit="initData" :navList="navList" :open.sync="open" @getData="getData"
				@open="handleSubmit" />
		</view>
	</view>
</template>

<script>
	import SelectPopup from '/src/public/components/SelectPopup.vue'
	import orderCard from '../maintenance/components/OrderCard.vue'
	import {
		navList,
		cardEdit
	} from '../maintenance/detail/defult.js'
	export default {
		components: {
			orderCard,
			SelectPopup
		},
		data() {
			return {
				ascImg: require('../../images/sm.png'),
				initData: cardEdit[this.$store.state.pageName],
				navList: navList,
				iconSize: '22',
				open: false,
				search: undefined
			}
		},
		created() {
			this.$store.state.pageName = 'repair'
		},
		methods: {
			handleImg() {
				//uni扫码功能
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			getData(data) {
				let arr = []
				data.forEach(e => {
					arr.push(e.title)
				})
				this.search = String(arr)
			},
			handleSubmit(val) {
				this.open = val
			},
			handleSelect() {
				this.open = true
			},
			handleAdd() {
				this.$url('./addOrder')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		top: 45px;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		overflow: scroll;
		height: calc(100% - 55px);

		.search-sticky {
			margin: -30px 0 0px 0;
			width: 140px;
			margin-left: calc(50% - 70px);

			.u-search {
				padding-left: calc(50% - 70px);
				margin-left: 10px;
			}
		}

		.ui-card {
			.banner {
				height: 100px;
			}

			margin-bottom: 20px;
			background-color: rgb(60, 156, 255);
		}

		.container-card {
			margin-top: 20px;
		}

		.container-nav {
			width: 100%;
			margin-left: -8px;
			background-color: rgb(243, 244, 245);
			padding: 5px 8px;
			margin-bottom: -20px;

			.repair {
				uni-text {
					margin-left: 3px;
				}
			}

			.u-badge {
				color: #fff;
			}

			.u-button {
				width: 50px;
				white-space: nowrap;
				margin-right: 8px;
				box-shadow: 0 0 2px 2px rgba(227, 227, 227, 0.1);
				background-color: rgb(255, 255, 255);
				border: 0;
				border-radius: 12px;
				font-size: 8px;
			}

			uni-text {
				font-size: 9px;
				margin-right: 12px;
			}

			.add {
				uni-text {
					margin: 0;
					margin-left: 3px;
					color: rgb(60, 156, 255);
				}
			}
		}
	}
</style>
