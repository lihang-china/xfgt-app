<template>
	<view class="container">
		<u-navbar title="添加工单" @rightClick="rightClick" :autoBack="true">
		</u-navbar>

		<view class="app-container">
			<u-form size="mini">
				<u-form-item :borderBottom="index == formList.length -1 ? false : true" v-for="(item,index) in formList"
					:key="index">
					<!-- 当不需要软键盘时 input 为只读 -->
					<view v-if="item.type !== 'upload'" class="form-input" @click="handleClick(item,index)">
						<u-input
							:readonly="item.type == 'sclassName' || item.type == 'areaName' || item.type == 'repairDate'"
							ref="input" v-model="formData[item.type]" @focus="handleFocus(item,index)"
							prefixIconStyle="color:rgb(160, 192, 232);margin-right:2px;"
							:prefixIcon="index == 0 ? '': item.icon" placeholderStyle="fontSize:16px;margin-left:8px;"
							:placeholderStyle="index == 0 ? 'fontSize:17px;' : ''" :placeholder="item.label"
							border="none" :suffixIcon="index == 0 ? 'info-circle-fill' : '' "
							suffixIconStyle="color:rgb(162, 224, 232);margin-right:2px;">
						</u-input>
					</view>
					<view class="form-upload flex-column" v-if="item.type == 'upload'">
						<u-upload :previewImage="true" :fileList="fileList" @afterRead="afterRead" @delete="deletePic"
							name="1" :maxCount="3"></u-upload>
						<text>点击上传图片（最多可上传三张图片)</text>
					</view>
				</u-form-item>
			</u-form>
			<u-picker @cancel="show = false" v-if="this.pickerData[this.pickerType]" :show="show" ref="uPicker"
				:columns="this.pickerData[this.pickerType].columns" @confirm="confirm" @change="changeHandler">
			</u-picker>
			<u-datetime-picker @cancel="timeShow = false" @confirm="handleTime" v-model="timeValue" :show="timeShow">
			</u-datetime-picker>
		</view>
		<view class="bottom-fiexd flex-center">
			<text @click="handleClose">取消</text>
			<text @click="handleSubmit">保存</text>
		</view>
	</view>
</template>

<script>
	import {
		formList,
		pickerData
	} from './default.js'
	export default {
		data() {
			return {
				pickerType: 'sclassName',
				timeValue: Number(new Date()),
				timeShow: false,
				formData: {},
				fileList: [],
				formList: formList,
				show: false,
				pickerData: pickerData
			}
		},
		methods: {
			handleSubmit() {
				uni.navigateBack({
					delta: 1
				});
			},
			handleClose() {
				uni.navigateBack({
					delta: 1
				});
			},
			handleTime(val) {
				this.formData.repairDate = this.$moment(val.value).format("YYYY-DD-MM hh:mm")
				this.timeShow = false
			},
			handleClick(item, index) {
				if (item.type == 'sclassName' || item.type == 'areaName' || item.type == 'repairDate') {
					this.handleFocus(item, index)
				}
			},
			handleFocus(item, index) {
				console.log('adksaldj')
				this.pickerType = item.type
				if (item.type == "sclassName" || item.type == 'areaName') {
					this.show = true
				} else if (item.type == 'repairDate') {
					this.timeShow = true
				}
			},
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.pickerData[this.pickerType].columnData[index])
				} else if (columnIndex === 1) {
					picker.setColumnValues(2, this.pickerData[this.pickerType].columnData2[index])
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				this.formData.sclassName = e.values.pop()[0]
				this.show = false
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
	.app-container {
		background-color: #fff;
		border-radius: 0 0 26px 26px;
		max-height: 100%;

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
