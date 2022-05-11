<template>
	<view class="container">
		<u-navbar class="container-navbar" @leftClick="leftClick" title="统计" bgColor="rgba(0,0,0,0)">
		</u-navbar>
		<view class="app-container">
			<view class="container">
				<ui-card class="container-header">
					<view class="flex-between">
						<view class="flex-between">
							<u-avatar :src="imgSrc" fontSize="18" randomBgColor></u-avatar>
							<view class="flex-column">
								<text>{{userInfo.userName}}</text>
								<text>考勤规则:{{rule}}</text>
							</view>
						</view>
						<view @click="show = true">
							<u-icon @click="" labelPos="left" :label="this.$moment(date).format('YYYY.MM')" size="18"
								name="arrow-right"></u-icon>
						</view>
					</view>
				</ui-card>
				<ui-card class="container-center">
					<uni-collapse accordion>
						<uni-collapse-item :show-arrow="true" title-border="none" :border="false"
							:disabled="!(itemList[item.list] && itemList[item.list].length > 0)"
							v-for="(item,index) in itemData" :key="index">
							<template v-slot:title>
								<view class="flex-between">
									<text>{{item.title}}</text>
									<text :style="item.value == 0 ?'color:rgb(200,200,200)' : 'color:'+ item.color"
										class="u-page__item__title__slot-title">{{itemList[item.value]}}</text>
								</view>
							</template>
							<view>
								<col-item :itemList="itemList[item.list]" />
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</ui-card>
				<u-datetime-picker @close="show = false" :closeOnClickOverlay="true" @cancel="show = false" :show="show"
					@confirm="handleSearch" v-model="date" mode="date"></u-datetime-picker>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		itemData
	} from './default.js'
	import {
		clockCount
	} from '/src/api/class.js'
	import colItem from "./components/collapseItem.vue"
	import {
		uniCollapse,
		uniCollapseItem,
		uniIcons
	} from '@dcloudio/uni-ui'
	// import {
	// 	clockList
	// } from "../../public/js/data.js"
	export default {
		components: {
			uniIcons,
			uniCollapse,
			uniCollapseItem,
			colItem
		},
		data() {
			return {
				itemData: itemData,
				userInfo: {},
				rule: '标准考勤组',
				username: '李航',
				itemList: [],
				show: false,
				date: Number(new Date()),
				imgSrc: undefined,
			}
		},
		onLoad() {
			this.getUserinfo()
			this.getList()
		},
		methods: {
			handleSearch(val) {
				this.date = this.$moment(val.value).format('YYYY-MM-DD')
				this.getList()
				this.show = false
				this.getList()
			},
			getList() {
				clockCount({
					beginrepairDate: this.$moment(this.date).format('YYYY-MM') + '-01',
					endrepairDate: this.$moment(this.date).format('YYYY-MM-DD'),
					employeesId: uni.getStorageSync('user_info').user.userId
				}).then(res => {
					this.itemList = res.data
				})
			},
			getUserinfo() {
				var data = uni.getStorageSync('user_info')
				this.userInfo = data.user
				this.imgSrc = data.user.avatar
				this.userInfo.deptName = data.user.dept.deptName
			},
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		height: 100%;

		.container {
			max-height: 100%;
			overflow: scroll;

			.container-header {
				.flex-between {
					padding: 5px;
				}
			}
		}

		uni-text {
			font-size: 11px;
			color: rgb(45, 45, 45);
		}

		.ui-card {
			border-radius: 8px;
		}

		.flex-column {
			margin: 5px;

			uni-text {
				font-size: 11px;

				&:nth-child(2) {
					font-size: 9px;
					margin-top: 2px;
					color: rgb(103, 111, 134) !important;
				}

			}
		}

		.flex-between {
			padding: 7px 10px;

			uni-text {
				&:nth-child(2) {
					color: rgb(154, 154, 154);
				}
			}

		}
	}
</style>
