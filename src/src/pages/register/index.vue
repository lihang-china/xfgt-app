<template>
	<view class="login-container">
		<view class="login-from">
			<h2>注册</h2>
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
	<u-form-item prop="password" borderBottom>
					<u-input v-model="form.password" color="#fff" type="password" prefixIcon="lock"
						prefixIconStyle="margin-right:10px;font-size: 28px;color: rgb(200,200,200)" border="none"
						placeholder="再次输入密码">
					</u-input>
				</u-form-item>
				<u-form-item>
					<!-- <u-button type="primary" shape="circle" @click="handelLogin()">登录</u-button> -->
				</u-form-item>
				<u-form-item>
					<u-button shape="circle" @click="handleReg">注册</u-button>
				</u-form-item>
			</u-form>
		</view>
		<u-modal @confirm="show = false" width="250" :show="show" :title="title" :content="content"></u-modal>
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

		methods: {
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
		background-color: rgb(17, 108, 255);

		.login-version {
			width: 100%;
			text-align: center;
			font-size: 9px !important;
			color: rgb(180, 180, 180);
		}

		h2 {
			margin-top: 30%;
			font-size: 80rpx;
			color: #fff;
		}

		uni-text {
			color: rgb(220, 220, 220);
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
