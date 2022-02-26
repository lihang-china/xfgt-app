<template>
	<view class="container flex-column">
		<ui-card class="container-header  flex-center">
			<view class="header-avatar flex-column">
				<u-avatar :src="userInfo.avatar" size="80" fontSize="14px" randomBgColor />
				<u-button shape="circle" size="mini" color="rgba(191, 215, 231, 0.6)" type="default"><text>编辑</text>
					<u-icon color="#fff" name="share-square"></u-icon>
				</u-button>
			</view>
		</ui-card>
		<u-cell-group>
			<u-cell iconStyle="font-size:24px;color:rgb(0, 132, 255);" :title="clockPath" icon="bookmark-fill"
				:border="false" arrow-direction="left"></u-cell>
			<u-cell iconStyle="font-size:24px;color:rgb(0, 132, 255);" :border="false" v-for="(item,index)  in itemList"
				:key="index" :icon="item.icon" :title="item.title" :value="userInfo[item.value] | sex" :isLink="true"
				arrow-direction="left"></u-cell>
		</u-cell-group>

	</view>
</template>

<script>
	import {
		itemList,
		userInfo
	} from './default.js'
	export default {
		filters: {
			sex(val) {
				if (val == '0') {
					return '男'
				} else if (val == '1') {
					return '女'
				} else {
					return val
				}
			}
		},
		data() {
			return {
				userInfo: userInfo,
				itemList: itemList,
				username: '李航',
				clockPath: '浙江源创智能'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {

		::v-deep .u-cell-group {
			margin-top: 20px;

			* {
				border-radius: 5px;
				border: 0 !important;
			}

			.u-cell {
				margin: 3px 0;
				padding: 3px 0;
				background-color: #fff;
			}
		}

		.ui-card {
			background-color: rgb(0, 104, 248);
		}

		.container-header {
			height: 100px;
			background-image: url(../../images/banner.png);
			background-repeat: no-repeat;
			background-size: 65%;
			background-position: 5% 0%;

			.header-avatar {
				align-items: center;

				.u-button {
					margin-top: 6px;

					uni-text {
						margin-right: 2px;
						font-size: 9px !important;
						color: #fff !important;
						font-weight: normal !important;
					}
				}
			}

			.u-avatar {
				box-shadow: 0px 0px 5px 2px rgba(255, 255, 255, 0.5);
				border: 2px solid #fff;
			}

			.ui-text-btn {
				margin-left: 10px;
			}

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
