<template>
	<view class="login-container">
		<image class="login-banner" :src="require('../../images/loginBg.jpg')" mode=""></image>
		<view class="login-from">
			<h2>
				信丰
			</h2>
			<u-form>
				<u-form-item borderBottom>
					<u-input color="#fff" prefixIcon="account" prefixIconStyle="margin-right:10px;font-size: 28px;color:rgb(200,200,200)"
						border="none" placeholder="请输入用户名">
					</u-input>
				</u-form-item>
				<u-form-item borderBottom>
					<u-input color="#fff" type="password" prefixIcon="lock" prefixIconStyle="margin-right:10px;font-size: 28px;color: rgb(200,200,200)"
						border="none" placeholder="请输入密码">
					</u-input>
				</u-form-item>
				<u-form-item>
					<text>忘记密码？</text>
				</u-form-item>
				<u-form-item>
					<u-button type="primary" shape="circle" @click="handelLogin()">登录</u-button>
				</u-form-item>
				<u-form-item>
					<u-button shape="circle">注册</u-button>
				</u-form-item>
			</u-form>
		</view>
	</view>
</template>
<script>
	export default {
		name: "login",
		data() {
			return {
                    username:undefined,
					password:undefined
			}
		},
		methods:{
			handelLogin(){
				uni.redirectTo({
				    url: '../index/index'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		overflow: hidden;
		height: 100%;
		width: 100%;
		h2 {
			margin-top: 30%;
			font-size: 80rpx;
			color: #fff;
		}
uni-text{
	color: rgb(220,220,220);
}
		.login-banner {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			z-index: -10;
		}

		.login-from {
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
				color:rgb(200,200,200)
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
