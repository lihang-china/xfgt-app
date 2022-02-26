<template>
	<view class="">
		<ui-card v-for="(item,index) in orderList" :key="index" v-show="item[initData.type] == cardType || cardType == -1">
			<view class="bottom-header">
				<text>{{$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</text>
			</view>
			<view class="bottom-center flex-between">
				<view class="flex-flex">
					<u-avatar :text="item[initData.name].split('').pop()" fontSize="18" randomBgColor></u-avatar>
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
					<text @click="handleView(index)" class="text-btn">查看详情</text>
				</view>
			</view>
		</ui-card>
		<order-detail-card :itemData="orderList[listIndex]" :listIndex="listIndex" @popupState="handleClose"
			:open="isShow" />
		<!-- handleClose 获取孙子组件对象 -->
	</view>
</template>

<script>
	import {
		orderList,
		cardEdit
	} from '../detail/defult.js'
	import OrderDetailCard from './OrderDetailCard.vue'
	export default {

		components: {
			OrderDetailCard
		},
		props:{
			cardType:{
				type:Number,
				default:-1	
			}
		},
		data() {
			return {
				initData: cardEdit[this.$store.state.pageName],
				orderList: orderList[this.$store.state.pageName],
				listIndex: 0,
				isShow: false,
			}
		},
		methods: {
			handleClose(data) {
				this.isShow = data
			},
			handleView(index) {
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
