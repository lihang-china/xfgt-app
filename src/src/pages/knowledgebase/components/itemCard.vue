<template>
	<view class="flex-column container">
		<view class="flex-between container-header">
			<text>{{itemData.title}}</text>
			<view class="header-right flex-flex">
				<text>{{itemData.tag}}</text>
				<u-icon :name="tagIcon"></u-icon>
			</view>
		</view>
		<text class="u-line-1">{{itemData.desc}}</text>
		<view class="container-bottom flex-between">
			<text>存档日期:{{itemData.createTime}}</text>
			<u-icon @click="handleView(itemData.title)" color="rgb(200,200,200)" size="18" name="arrow-right"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			itemData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				eyesIcon: require('/src/images/eyes.png'),
				tagIcon: require('/src/images/tag.png')
			}
		},
		methods: {
			handleView(val) {
				uni.navigateTo({
					url: '/pages/knowledgebase/detail?title=' + val
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: rgb(247, 248, 249);
		border-radius: 6px;
		padding: 8px;
		margin: 6px;
		height: auto;

		uni-text {
			&:nth-child(2) {
				max-width: 80%;
				margin: 4px 0 4px 0;
				color: rgb(150, 150, 150);
				font-size: 9px;

			}
		}

		.container-bottom {
			uni-text {
				font-size: 9px;
			}
		}

		.container-header {
			uni-text {
				color: rgb(42, 42, 42);
				font-weight: bold;
			}

			.header-right {
				uni-text {
					color: rgb(11, 142, 248);
					font-weight: normal;
				}

				.u-icon {

					margin: 3px 0 0 2px;
				}
			}
		}
	}
</style>
