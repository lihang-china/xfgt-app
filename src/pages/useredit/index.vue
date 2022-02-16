<template>
	<view class="container">
		<ui-card class="container-header  flex-flex">
			<u-avatar text="北" fontSize="14px" randomBgColor />
			<view class="flex-column">
				<text>{{username}}</text>
				<view class="flex-flex">
					<text>{{clockPath}}</text>
					<u-icon size="16px" name="list-dot" /> 
				</view>
			</view>
		</ui-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '李航',
				clockPath: '浙江源创智能'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.container-header {
			.flex-column {
				margin-left: 8px;

				uni-text {
					&:nth-child(1) {
						font-weight: bold;
						font-size: 11px;
						color: rgb(42, 42, 42);
					}

				}

				.flex-flex {
					.u-icon {
						margin-left: 3px;
					}

					uni-text {
						padding: 0;
						font-size: 9px;
						font-weight: normal;
						color: rgb(72, 72, 72);
					}
				}
			}
		}
	}
</style>
