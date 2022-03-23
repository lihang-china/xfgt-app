<template>
	<view class="login-container">
		<image class="login-banner" :src="require('../../images/loginBg.jpg')" mode=""></image>
		<view class="login-from">
			<h2>
				{{this.$APP_SET.title}}
			</h2>
			<u-form ref="uForm" :rules="rules" :model="form">
				<u-form-item prop="username" borderBottom>
					<u-input v-model="form.username" color="#fff" prefixIcon="account"
						prefixIconStyle="margin-right:10px;font-size: 28px;color:rgb(200,200,200)" border="none"
						placeholder="请输入用户名">
					</u-input>
				</u-form-item>
				<u-form-item prop="password" borderBottom>
					<u-input v-model="form.password" color="#fff" type="password" prefixIcon="lock"
						prefixIconStyle="margin-right:10px;font-size: 28px;color: rgb(200,200,200)" border="none"
						placeholder="请输入密码">
					</u-input>
				</u-form-item>
				<u-form-item>
					<view class="radio-group flex-between">
						<u-checkbox-group v-model="radiovalue" placement="column">
							<u-checkbox labelColor="rgb(255,255,255)" :label="radio.name" :name="radio.value">
							</u-checkbox>
						</u-checkbox-group><text class="text-btn">忘记密码？</text>
					</view>
				</u-form-item>
				<u-form-item>
					<u-button type="primary" shape="circle" @click="handelLogin()">登录 / 注册</u-button>
				</u-form-item>
				<!-- 		<u-form-item>
				<u-button shape="circle" @click="handleReg">注册</u-button> 
				</u-form-item> -->
				<u-form-item>
					<text class="login-desc">未注册用户会自动注册，注册成功自动登录</text>
				</u-form-item>
			</u-form>
		</view>
		<u-modal @confirm="show = false" width="250" :show="show" :title="title" :content="content"></u-modal>
		<text class="login-version">Version {{this.$APP_SET.version}}</text>
	</view>
</template>
<script>
	import {
		setToken
	} from '/src/request/token.js'
	export default {
		name: "login",
		data() {
			return {
				radio: {
					name: '记住密码',
					value: true
				},
				radiovalue: [],
				title: '验证失败',
				content: '用户名密码错误',
				show: false,
				rules: {
					username: {
						required: true,
						message: '请输入用户名',
						trigger: ['change', 'blur'],
					},
					password: {
						required: true,
						message: '请输入密码',
						trigger: ['change', 'blur'],
					}
				},
				form: {
					username: undefined,
					password: undefined
				}
			}
		},
		onLoad() {
			this.initForm()
		},
		methods: {
			handleReg() {
				this.$url('/pages/register/index')
			},
			initForm() {
				this.form = {
					...uni.getStorageSync('user_info')
				}
				if (uni.getStorageSync('user_info').password) {
					this.radiovalue[0] = true
				}
			},
			async getLogin() {
				if (this.form.username == 'admin' && this.form.password == 'admin') {
					setToken('test').then(() => {
						let data = JSON.parse(JSON.stringify(this.form))
						if (!this.radiovalue[0]) {
							data.password = undefined
						}
						uni.setStorage({
							key: 'user_info',
							data: {
								...data
							}
						});
						this.$url('/pages/homepage/index', 1)

					})
				} else {
					this.show = true
				}
			},
			handelLogin() {
				this.$refs.uForm.validate().then(res => {
					this.getLogin()
				}).catch(errors => {
					uni.$u.toast('用户名密不能为空')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		overflow: hidden;
		height: 100%;
		width: 100%;
		min-height: 350px;
position: relative;
		.login-version {
			width: 100%;
			text-align: center;
			font-size: 9px !important;
			color: rgb(180, 180, 180);
			bottom: 6px;
			position: absolute;
		}

		h2 {
			margin-top: 30%;
			font-size: 80rpx;
			color: #fff;
		}

		uni-text {
			color: rgb(220, 220, 220);
		}

		.login-banner {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			z-index: -10;
		}

		.login-from {
			.radio-group {
				width: 100%;
			}

			position: fixed;
			width: 100%;
			height: 100%;
			backdrop-filter: saturate(100%) blur(6px);
			display: flex;
			justify-content: center;
			background-color: rgba(200, 200, 200, 0.1);
		}
	}

	::v-deep .u-form {
		width: 80%;
		position: absolute;
		top: 35%;

		.login-desc {
			letter-spacing: 2px;
			font-size: 8px;
			color: rgba(250, 250, 250, 0.8);
		}

		.u-form-item {
			margin-top: 5px;

			text {
				color: rgb(200, 200, 200)
			}

			&:nth-child(5) {
				.u-button {
					background-color: rgba(150, 150, 150, 0.5);
					color: #fff;
					border: 1px solid rgba(150, 150, 150, 0.5);
				}
			}

		}
	}
</style>
