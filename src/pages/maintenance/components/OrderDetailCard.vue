<template>
	<view class="">
		<swiper-card :open="open" v-bind="$attrs" v-on="$listeners" :listIndex="listIndex"
	     :itemList="cardList"
			>
			<!-- 爷孙组件传参方式 v-bind="$attrs" v-on="$listeners" 绑定、监听子组件-->
			<template v-slot:cards="{data}">
				<!-- data:插槽传参 -->
				<ui-card>
					<view class="bottom-header">
						<text>{{$moment(data[initData.time]).format('YYYY-MM-DD HH:mm:ss')}}</text>
					</view>
					<view class="bottom-center flex-between">
						<view class="flex-flex">
							<u-avatar :text="data[initData.name].split('')[0]" fontSize="18px" randomBgColor>
							</u-avatar>
							<view class="flex-column">
								<text>{{data[initData.name]}}</text>
								<text>{{data[initData.phone]}}</text>
							</view>
						</view>
						<view>
							<u-tag class="center-tag" :text="initData.typeValue[Number(data[initData.type])]"
								:type="data[initData.type] == 0 ?'primary':'error'"></u-tag>
						</view>
					</view>
					<view class="block-bottom flex-column">
						<view v-for="(item,index) in initData.bottomList" :key="index">
							<text>{{item.title}}</text>
							<text :class="data[item.field] ? '' :'ui-undefined'">{{ data[item.field] ? data[item.field] : '空' }}</text>
						</view>
					</view>
				</ui-card>
			</template>
		</swiper-card>
	</view>
</template>

<script>
	import {
		cardEdit
	} from '../detail/defult.js'
	import SwiperCard from '@/public/components/SwiperDard.vue'
	export default {
		props: {
			itemData:{
				type:Array,
				default:()=>{}
			},
			listIndex: {
				type: Number,
				default: 0
			},
			open: {
				type: Boolean,
				default: false
			}
		},
		components: {
			SwiperCard
		},
		watch:{
			itemData(val){
				this.cardList = val
			},
		},
		data() {
			return {
				cardList:[],
				initData: cardEdit[this.$store.state.pageName],
				cardIndex: 0,
				current: 0,
			}
		},
    mounted(){
		this.cardList = this.itemData
	},
		methods: {
			change(data) {
				this.cardIndex = data.detail.current
			},
			handleClose() {
				this.$emit('popupState', false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		uni-text {
			font-size: 10px;
		}

		.block-bottom {
			margin: 0;
     
			uni-view {
				margin-top: 5px;
				display: flex;
				justify-content: space-between;

				&:nth-last-child(3) {
					padding-top: 5px;
					border-top: 1px solid rgb(226, 226, 226);
				}

				uni-text {
					&:nth-child(1) {
						font-size: 9px;
						color: rgb(72, 72, 72);
						white-space: nowrap;
					}

					&:nth-child(2) {
						margin-left: 20px;
						overflow: hidden;
						font-size: 8px;
						color: rgb(142, 143, 144);
						  white-space: nowrap;
						    text-overflow: ellipsis
					}
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
	}
</style>
