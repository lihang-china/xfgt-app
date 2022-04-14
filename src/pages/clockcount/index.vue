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
							:disabled="item.value == 0" v-for="(item,index) in itemList" :key="index">
							<template v-slot:title>
								<view class="flex-between">
									<text>{{item.title}}</text>
									<text :style="item.value == 0 ?'color:rgb(200,200,200)' : 'color:'+ item.color"
										class="u-page__item__title__slot-title">{{item.value}}{{item.type}}</text>
								</view>
							</template>
							<view>
								<col-item :itemIndex="index" />
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</ui-card>
				<u-datetime-picker @close="show = false" :closeOnClickOverlay="true" @cancel="show = false" :show="show"
					v-model="date" mode="year-month"></u-datetime-picker>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		clockCount
	} from '/src/api/class.js'
	import colItem from "./components/collapseItem.vue"
	import {
		uniCollapse,
		uniCollapseItem,
		uniIcons
	} from '@dcloudio/uni-ui'
	import {
		clockList
	} from "../../public/js/data.js"
	export default {
		components: {
			uniIcons,
			uniCollapse,
			uniCollapseItem,
			colItem
		},
		data() {
			return {
				userInfo:{},
				rule: '标准考勤组',
				username: '李航',
				itemList: clockList,
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
			getList(){
				clockCount().then(res=>{
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
			padding: 8px 0;
			width: 100%;
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
