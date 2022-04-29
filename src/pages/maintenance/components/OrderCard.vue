<template>
	<view>
		<uni-list v-if="dataList.length">
			<uni-list-item v-for="(item,index) in dataList" :key="index">
				<ui-card slot="body" v-show="item[initData.type] == cardType || cardType == -1">
					<view class="bottom-header">
						<text>{{$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</text>
					</view>
					<view class="bottom-center flex-between">
						<view class="flex-flex">
							<u-avatar :text="item[initData.name] ? item[initData.name].split('')[0] :'空'" fontSize="18"
								randomBgColor>
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
		<u-empty v-else iconColor="rgb(221,222,224)" mode="list">
		</u-empty>
		<order-detail-card :itemData="dataList" :listIndex="listIndex" @popupState="handleClose" :open="isShow" />
		<!-- handleClose 获取孙子组件对象 -->
	</view>
</template>

<script>
	import {
		uniList,
		uniListItem,
	} from '@dcloudio/uni-ui'
	import {
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
			dataList: {
				type: Array,
				default: () => {}
			},
			selData: {
				type: Object,
				default: () => {}
			},
			cardType: {
				type: Number,
				default: -1
			}
		},
		data() {
			return {
				initData: cardEdit[this.$store.state.pageName],
				listIndex: 0,
				isShow: false,
			}
		},
		methods: {
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
	.u-empty{
		height: 200px;
	}
	uni-text {
		font-size: 10px;
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
