<template>
	<view>
		<u-picker @cancel="handleClose" :show="isShow"
			v-if="cellValue == 'deptName' && this.pickerData[this.pickerType]" ref="uPicker"
			:columns="this.pickerData[this.pickerType].columns">
		</u-picker>
		<u-popup v-if="cellValue !== 'deptName'" round="8" mode="center" @close="handleClose" :show="isShow"
			:closeOnClickOverlay="true" :closeable="true">
			<view class="popup-card">
				<u-form>
					<u-form-item v-if="cellValue == 'userName'" label="昵称">
						<u--input v-model="formData.userName" border="surround"></u--input>
					</u-form-item>
					<u-form-item v-if="cellValue == 'sex'" label="性别">
						<u-radio-group v-model="formData.sex" placement="column">
							<view class="flex-flex">
								<u-radio :customStyle="{marginRight: '16px'}" v-for="(item, index) in radiolist"
									:key="index" :label="item.name" :name="item.value">
								</u-radio>
							</view>
						</u-radio-group>
					</u-form-item>
					<u-form-item labelWidth="70" v-if="cellValue == 'phonenumber'" label="手机号码">
						<u--input v-model="formData.phonenumber" border="surround"></u--input>
					</u-form-item>
				</u-form>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		pickerData
	} from '../default.js'
	export default {
		props: {
			formData: {
				type: Object,
				default: () => {}
			},
			cellValue: {
				type: String,
				default: () => {}
			},
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				fileList: [],
				pickerData: pickerData,
				pickerType: 'sclassName',
				radiolist: [{
						name: '男',
						value: '0',
						disabled: false
					},
					{
						name: '女',
						value: '1',
						disabled: false
					}
				],
				radiovalue: '',
			}
		},
		mounted() {
			this.fileList.push({
				url: this.formData.avatar
				// status: 'uploading',
				// message: '上传中'
			})
		},
		methods: {
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
			handleClose() {
				this.$emit('popupStatus', false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-card {
		padding: 20px;
	}
</style>
