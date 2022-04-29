<template>
	<!-- 需要配合模板使用 data 为当前卡片数据 ***** <template v-slot:cards="{data}"> *****-->
	<u-popup :round="10" :show="open" @close="handleClose" mode="center">
		<uni-swiper-dot :info="itemList" field="content" mode="round">
			<swiper :current="current" ref="swiper" class="swiper-box" @change="change">
				<swiper-item v-for="(item,index) in list" :key="index">
					<view class="container-card" :class="cardIndex == index ? 'container-card' :'scale'">
						<!-- 不使用具名插槽uView插件会报错 -->
						<slot name="cards" :data="item">

						</slot>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</u-popup>
</template>

<script>
	import {
		uniSwiperDot
	} from '@dcloudio/uni-ui'
	export default {
		//itemList为slot内数据 itemList类型必须为数组
		//listIndex为卡片默认打开索引
		//open组件是否打开
		props: {
			itemList: {
				type: Array,
				default: () => {},
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
			uniSwiperDot
		},
		data() {
			return {
				cardList: [],
				list: [],
				cardIndex: 0,
				current: 0,
				mode: 'round',
				//
				active: true,
				//
				duration: 500,
			}
		},
		watch: {
			itemList(val) {
				this.cardList = val
			},
			open() {
				this.initData()
			}
		},
		mounted() {
			this.cardList = this.itemList
		},
		methods: {
			initData() {
				//防止长列表影响性能，数据默认为前后五个,'--------------'
				this.cardList[this.listIndex].index = this.listIndex //标记当前数组位置
				let arr = []
				let max = this.listIndex + 5
				let min = this.listIndex - 6
				for (let i = this.listIndex + 1; i <= max; i++) {
					if (this.cardList[i] !== undefined) {
						arr.push(this.cardList[i])
					}
					i + 1
				}
				for (let j = this.listIndex; j > min; j--) {
					if (this.cardList[j]) {
						arr.unshift(this.cardList[j])
					}
					j - 1
				}
				//返回标记数组下标
				this.current = arr.findIndex(val => {
					return val.index == this.listIndex
				})
				this.cardIndex = arr.findIndex(val => {
					return val.index == this.listIndex
				})
				this.list = arr
			},
			change(data) {
				this.cardIndex = data.detail.current
				// this.$emit('cardData', this.info[data.detail.current])
			},
			handleClose() {
				//为父组件提供窗口关闭参数
				this.$emit('popupState', false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container-card {
		margin-top: -20%;
		transition: 0.4s;
	}

	.scale {
		transform: scale(1, 0.9);
	}

	::v-deep .u-popup__content {
		background-color: rgba(0, 0, 0, 0);
	}

	.swiper-box {
		background-color: rgba(0, 0, 0, 0);
		width: 210px;
	}

	::v-deep .uni-swiper__warp {
		overflow: visible !important;
	}

	::v-deep .uni-swiper-slides {
		uni-swiper-item {
			overflow: visible !important;
		}
	}

	::v-deep uni-swiper .uni-swiper-wrapper {
		overflow: visible !important;
	}

	::v-deep uni-swiper-item {
		padding: 3px !important;
		width: calc(100% - 6px) !important;
	}

	::v-deep .uni-swiper__dots-box {
		display: none;
	}
</style>
