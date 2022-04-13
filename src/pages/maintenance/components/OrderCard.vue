<template>
	<view>
		<uni-list>
			<uni-list-item v-for="(item,index) in orderList.list" :key="index">
				<ui-card slot="body" v-show="item[initData.type] == cardType || cardType == -1">
					<view class="bottom-header">
						<text>{{$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</text>
					</view>
					<view class="bottom-center flex-between">
						<view class="flex-flex">
							<u-avatar :text="item[initData.name].split('').pop()" fontSize="18" randomBgColor>
							</u-avatar>
							<view class="flex-column">
								<text>{{item[initData.name]}}</text>
								<text
									:class="[item[initData.phone] ? '' :'ui-undefined']">{{item[initData.phone] ?item[initData.phone] : '空'}}</text>
							</view>
						</view>
						<view class="center-tag">
							<u-tag class="center-tag" :text=" initData.typeValue[Number(item[initData.type])]"
								:type="item[initData.type] == 0 ?'primary':'error'"></u-tag>
						</view>
					</view>
					<view class="block-bottom flex-between">
						<view class="flex-flex">
							<text>{{initData.bottomList[0].title}}：</text>
							<text>{{item[initData.bottomList[0].field]}}</text>
						</view>
						<view>
							<text @click="handleView(index,item)" class="text-btn">查看详情</text>
						</view>
					</view>
				</ui-card>
			</uni-list-item>
		</uni-list>

		<order-detail-card :itemData="itemList" :listIndex="listIndex" @popupState="handleClose" :open="isShow" />
		<!-- handleClose 获取孙子组件对象 -->
	</view>
</template>

<script>
	import {
		listCard
	} from '/src/api/repair.js'
	import {
		patrollistTask
	} from '/src/api/patrol.js'
	import {
		listTask
	} from '/src/api/maintain.js'
	import {
		uniList,
		uniListItem,
	} from '@dcloudio/uni-ui'
	import {
		orderList,
		cardEdit
	} from '../detail/defult.js'
	import OrderDetailCard from './OrderDetailCard.vue'
	export default {

		components: {
			OrderDetailCard,
			uniListItem,
			uniList
		},
		props: {
			cardType: {
				type: Number,
				default: -1
			}
		},
		watch: {
			'orderList.list': function(val) {
				this.itemList = val
			},
		},
		data() {
			return {
				itemList: [],
				queryData: {
					pageSize: 10000,
					pageNum: 1,
					teamId: 2
				},
				initData: cardEdit[this.$store.state.pageName],
				orderList: {
					list: []
				},
				listIndex: 0,
				isShow: false,
			}
		},
		created() {
			this.getCardList().then(res => {
				//长列表优化方法
				if (res.code === 200) {
					this.$lazyList(this.orderList, res.rows, 20)
				} else {
					uni.$u.toast(res.msg)
				}
			})
		},
		methods: {
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
					} else if (this.$store.state.pageName === 'repair') {
						this.getRepairList().then(res => {
							resolve(res)
						})
					}
				})
				return data
			},
			async getRepairList() {
				let data = await listCard({
					...this.queryData
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
			handleClose(data) {
				this.isShow = data
			},
			handleView(index, item) {
				this.listIndex = index
				this.isShow = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-text {
		font-size: 9px;
	}

	.uni-list {
		background-color: rgba(0, 0, 0, 0);
	}

	.block-bottom {
		overflow: hidden;
		width: 100%;

		.flex-flex {
			max-width: 70%;
		}

		uni-text {
			white-space: nowrap;

			&:nth-child(2) {
				overflow: hidden;
				text-overflow: ellipsis;
			}

		}
	}

	.bottom-header {
		border-bottom: 1px solid rgb(226, 226, 226);
		padding-bottom: 5px;
	}

	.bottom-center {
		margin: 8px 0;

		uni-text {
			margin-top: 2px;
		}
	}

	.flex-column {
		margin-left: 5px;
	}
</style>
