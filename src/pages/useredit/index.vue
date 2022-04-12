<template>
	<view class="container">
		<view class="tabbar flex-column">
			<ui-card class="container-header  flex-center">
				<view class="header-avatar flex-column">
					<u-upload :maxCount="1" @afterRead="afterRead" :deletable="false" :fileList="fileList" name="1">
						<image :src="imgSrc" mode="widthFix"></image>
					</u-upload>
					<u-icon size="24px" class="image-icon" color="#ffffff" name="share-square"></u-icon>
				</view>
			</ui-card>
			<u-cell-group>
				<u-cell iconStyle="font-size:24px;color:rgb(0, 132, 255);" :title="clockPath" icon="bookmark-fill"
					:border="false" arrow-direction="left"></u-cell>
				<u-cell @click="handleClick(item.value)" iconStyle="font-size:24px;color:rgb(0, 132, 255);"
					:border="false" v-for="(item,index)  in itemList" :key="index" :icon="item.icon" :title="item.title"
					:value="userInfo[item.value] | sex" :isLink="true" arrow-direction="left"></u-cell>
				</u-cell>
				<u-cell icon="level" iconStyle="font-size:24px;color:rgb(0, 132, 255);" :isLink="true" title="关于我们"
					:border="false" arrow-direction="left" :value="$APP_SET.version">
				</u-cell>
				<u-cell class="flex-center" @click="outShow = true" titleStyle="color:red;"
					iconStyle="font-size:24px;color:rgb(0, 132, 255);" title="退出登录" :border="false"
					arrow-direction="left">
				</u-cell>
			</u-cell-group>
		</view>
		<item-edit :formData="userInfo" :isShow="show" @popupStatus="handleClose" :cellValue="cellValue" />
		<u-modal width="250" showCancelButton :show="outShow" content='是否退出登录?' @confirm="handleOut()"
			@cancel="outShow = false"></u-modal>
		<ui-tabbar />
	</view>
</template>

<script>
	import itemEdit from './components/itemEdit.vue'
	import {
		itemList,
		userInfo
	} from './default.js'
	export default {
		components: {
			itemEdit
		},
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

				imgSrc: undefined,
				fileList: [],
				outShow: false,
				cellValue: undefined,
				show: false,
				userInfo: {},
				itemList: itemList,
				clockPath: '浙江源创智能'
			}
		},
		onLoad() {
			this.getUserinfo()
		},
		methods: {
			getUserinfo() {
				var data = uni.getStorageSync('user_info')
				this.userInfo = data.user.user
				this.imgSrc = data.user.user.avatar
				this.userInfo.deptName = data.user.user.dept.deptName
			},
			deletePic(event) {
				this.fileList.splice(event.index, 1)
			},
			async afterRead(event) {
				this.imgSrc = event.file.url
				// this.fileList.push({
				// 	...event.file,
				// 	// status: 'uploading',
				// 	// message: '上传中'
				// })
			},
			handleOut() {
				uni.removeStorage({
					key: 'token'
				})
				this.$url('/pages/login/index')
				this.outShow = false
			},
			handleClose(val) {
				this.show = val
			},
			handleClick(val) {
				this.show = true
				this.cellValue = val
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar {
		::v-deep .u-cell-group {
			uni-view {
				border-radius: 5px;
				border: 0 !important;
			}

			.u-cell {
				margin: 4px 0;
				padding: 3px 0;
				background-color: #fff;
			}
		}

		.container-header {
			background-color: rgb(0, 104, 248);
			height: 100px;
			background-image: url(../../images/banner.png);
			background-repeat: no-repeat;
			background-size: 65%;
			background-position: 5% 0%;
			margin-bottom: 12px;

			.header-avatar {
				align-items: center;
				position: relative;

				uni-image {
					width: 55px;
					height: 55px;
					max-width: 55px;
					max-height: 55px;
					border-radius: 50%;
					box-shadow: 0px 0px 6px 3px rgba(229, 229, 229, 0.5);
					border: 1px solid rgba(150, 150, 150, 0.5);
				}

				.image-icon {
					position: absolute;
					bottom: 4px;
					right: 0;
					z-index: 999999999999;
				}

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
