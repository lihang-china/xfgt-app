<template>
	<view>
		<ui-card class="detail-header flex-column">
			<view class="flex-between item-text" v-for="(item,index) in itemList" :key="index">
				<text>{{item.title}}：</text><text v-if="item.value !== 'equStatus'">{{deviceData[item.value]}}</text>
				<u-tag plain v-else :type="deviceData[item.value] | tagType" :text="deviceData[item.value] | tagStatus">
				</u-tag>
			</view>
		</ui-card>
		<ui-card>
			<u-cell-group :border="false">
				<u-cell v-for="(item,index) in cellList" :key="index"  @click="handleSeldetail(item.value)" :border="false" :isLink="true" :title="item.title"></u-cell>
			</u-cell-group>
		</ui-card>
	</view>
</template>

<script>
	import {
		deviceList
	} from '/src/api/device'
	import {
		mcontentList
	} from '../default.js'
	import {
		itemList,
		mcontentItem
	} from './defaultItem.js'
	export default {
		filters: {
			monStatus(val) {
				if (val == 0) {
					return '完成'
				} else if (val == 1) {
					return '未完成'
				}
			},
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
		data() {
			return {
				cellList:[{title:'保养记录',value:'maintain'},{title:'维修记录',value:'inspection'}],
				queryData: {
					pageNum: 1,
					pageSize: 10,
					equCode: undefined
				},
				mcontentList: mcontentList,
				mcontentItem: mcontentItem,
				deviceData: {},
				itemList: itemList
			}
		},
		
		mounted() {
			this.initData()
		},
		methods: {
			handleSeldetail(val){
				this.$url('/pages/maintenance/index?title=' + val + '&&value=' + this.queryData.equCode )
			},
			initData() {
				this.queryData.equCode = getCurrentPages().pop().options.code
				deviceList(this.queryData).then(res => {
					this.deviceData = res.rows[0]
					console.log(this.deviceData)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-header {
		.item-text {
			margin-bottom: 6px;

			&:nth-last-child(1) {
				margin-bottom: 0;
			}

			uni-text {
				font-size: 10px;

				&:nth-child(2) {
					max-width: 100%;
					overflow: scroll;
					font-size: 9px;
					color: rgb(150, 150, 150);
				}

				&:nth-child(1) {
					white-space: nowrap;
					color: rgb(72, 72, 72);
					font-size: 10px;
				}
			}
		}
	}

	.font-black {
		color: black;
		font-weight: bold;
		font-size: 9px;
	}

	.collapse-item {
		border-bottom: 1px solid rgb(223, 224, 225);
		margin-bottom: 6px;
		padding-bottom: 4px;
		background-color: #fff;

		uni-text {
			font-size: 9px;
			margin-bottom: 3px;
			color: rgb(92, 92, 92);

			&:nth-child(2) {
				color: rgb(150, 150, 150);
			}
		}
	}

	.item-scroll {
		max-height: 170px;
		overflow: scroll;
	}

	::v-deep .u-cell__body {
		padding: 0 0 4px 0;

		uni-text {
			color: rgb(72, 72, 72);
			font-size: 10px;
		}
	}
	
</style>
