<template>
	<view>
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
					<u-form-item labelWidth="70" v-if="cellValue == 'email'" label="电子邮箱">
						<u--input v-model="formData.email" border="surround"></u--input>
					</u-form-item>
				</u-form>
				<view class="btn-group">
					<text @click="handleClose">取消</text><text @click="handleSubmit">保存</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getInfo
	} from '/src/api/login.js'
	import {
		profile
	} from '/src/api/system.js'
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
		methods: {
			handleSubmit() {
				profile(this.formData).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '修改成功'
						})
						getInfo().then(info=>{
							uni.setStorage({
								key: 'user_info',
								data: {
									user:{
										...info.user
									}
								}
							});
						})
						this.handleClose()
					} else {
						uni.showToast({
							title: res.msg
						})
					}

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

	.btn-group {
		margin-top: 8px;
		width: 100%;
		display: flex;
		justify-content: space-around;

		uni-text {
			font-size: 9px;
			color: rgb(0, 123, 255);
		}
	}
</style>
