<template>
	<view class="container">
		<u-navbar title="添加工单" @rightClick="rightClick" :autoBack="true">
		</u-navbar>
		<view class="app-container">
			<u-form ref="myForm" size="mini" :model="formData" :rules="rules">
				<u-form-item :prop="item.type" :borderBottom="index == formList.length -1 ? false : true"
					v-for="(item,index) in formList" :key="index">
					<!-- 当不需要软键盘时 input 为只读 -->
					<view v-if="item.type !== 'upload'" class="form-input">
						<view v-if="item.type !== 'sclassId' && item.type !== 'scardOrigin' && item.type !== 'areaId'">
							<u-input ref="input" v-model="formData[item.type]" @focus="handleFocus(item,index)"
								prefixIconStyle="color:rgb(160, 192, 232);margin-right:2px;"
								:prefixIcon="index == 0 ? '': item.icon"
								placeholderStyle="fontSize:16px;margin-left:8px;"
								:placeholderStyle="index == 0 ? 'fontSize:17px;' : ''" :placeholder="item.label"
								border="none" :suffixIcon="index == 0 ? 'info-circle-fill' : '' "
								suffixIconStyle="color:rgb(162, 224, 232);margin-right:2px;">
							</u-input>
						</view>
						<uni-data-picker v-model="formData[item.type]" :map="{text:'label',value:'id'}"
							:localdata="item.children" @change="onnodeclick" @nodeclick="changeData(item)" v-else
							class="picker" ref="picker" :popup-title="'请选择' + item.label">
							<view>
								<u-input v-model="formData[item.type  + 's']" :readonly="true"
									prefixIconStyle="color:rgb(160, 192, 232);margin-right:2px;"
									:prefixIcon="index == 0 ? '': item.icon"
									placeholderStyle="fontSize:16px;margin-left:8px;"
									:placeholderStyle="index == 0 ? 'fontSize:17px;' : ''" :placeholder="item.label"
									border="none" :suffixIcon="index == 0 ? 'info-circle-fill' : '' "
									suffixIconStyle="color:rgb(162, 224, 232);margin-right:2px;">
								</u-input>
							</view>
						</uni-data-picker>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<view class="bottom-fiexd flex-center">
			<text @click="handleClose">取消</text>
			<text @click="handleSubmit">保存</text>
		</view>
	</view>
</template>

<script>
	import {
		uniDataPicker,
		uniLoadMore
	} from '@dcloudio/uni-ui'
	import {
		addCard
	} from '/src/api/repair.js'
	import {
		formList
	} from './default.js'
	export default {
		components: {
			uniDataPicker
		},
		data() {
			return {
				pickerType: undefined,
				timeValue: Number(new Date()),
				timeShow: false,
				formData: {},
				fileList: [],
				formList: formList,
				show: false,
				rules: {
					sclassId: [{
						required: true,
						message: '请选择维修分类',
						trigger: ['change']
					}],
					scardOrigin: [{
						required: true,
						message: '请选择维修来源',
						trigger: ['change']
					}],
					repairContacts: [{
						required: true,
						message: '请选择联系人',
						trigger: ['blur', 'change']
					}],
					repairPhone: [{
						required: true,
						message: '请输入联系人',
						trigger: ['blur', 'change']
					}],
					areaId: [{
						required: true,
						message: '请选择报修区域',
						trigger: ['change']
					}],
				}
			}
		},
		onShow() {
			this.initData()
		},
		methods: {
			changeData(row) {
				this.pickerType = row.type
			},
			onnodeclick(row) {
				this.$nextTick(() => {
					row.detail.value.forEach(e => {
						if (e.value == this.formData[this.pickerType]) {
							this.$set(this.formData, this.pickerType + 's', e.text)
							this.$set(this.formData, this.pickerType, String(e.value))
						}
					})
				})
			},
			initData() {
				let user = uni.getStorageSync('user_info').user
				this.formData = {
					userId: user.userId,
					repairDate: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
					deptId: user.deptId
				}
			},
			handleSubmit() {
				this.$refs.myForm.validate().then(res => {
					let data = JSON.parse(JSON.stringify(this.formData))
					delete data.areaIds
					delete data.sclassIds
					delete data.scardOrigins
					addCard(data).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: '提交成功'
							})
							setTimeout(() => {
								this.handleClose()
							}, 500)
						} else {
							uni.showToast({
								title: '提交失败',
								icon: 'error'
							})
						}
					})
				})

			},
			handleClose() {
				uni.navigateBack({
					delta: 1
				});
			},
			handleFocus(item, index) {
				if (item.type == "sclassName" || item.type == 'areaName') {
					this.show = true
				} else if (item.type == 'repairDate') {
					this.timeShow = true
				}
			},
			// 删除图片
			deletePic(event) {
				this.fileList.splice(event.index, 1)
			},
			async afterRead(event) {
				this.fileList.push({
					...event.file,
					// status: 'uploading',
					// message: '上传中'
				})
			},
		}
	}
</script>
<style scoped lang="scss">
	::v-deep .u-form-item {
		position: relative;
		height: 35px;
	}

	::v-deep .u-form-item__body__right__message {
		width: 100px;
		position: absolute;
		right: 0;
		top: 10px;
		height: 0;
	}

	.app-container {
		background-color: #fff;
		border-radius: 0 0 26px 26px;
		max-height: 100%;
		padding: 6px 8px;
		width: calc(100% - 16px);

		.form-input {
			width: 100%;
		}

		::v-deep .uni-swiper__warp {
			overflow: visible !important;
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

	}

	.bottom-fiexd {
		width: 100%;

		uni-text {
			padding: 8px 30px;
			color: rgb(42, 42, 42);
			font-size: 12px;
			font-weight: bold;
		}

	}

	.u-form-item {
		&:nth-child(1) {
			margin-bottom: 16px;
		}

		.form-upload {
			width: 100%;
			align-items: center;
			padding: 8px;
			margin-top: 8px;

			uni-text {
				color: rgb(200, 200, 200);
			}
		}

		.u-page__tag-item {
			::v-deep .u-tag {
				margin: 5px 0 5px 5px;

				.u-tag__text {
					white-space: nowrap;
				}
			}
		}
	}
</style>
