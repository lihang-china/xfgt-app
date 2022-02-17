<template>
		<view class="ui-card">
		<view class="nav-header" v-if="title">
			<text class="ui-title">{{title}}</text>
		</view>
		<slot>
			
		</slot>
		</view>
</template>

<script>
	export default{
	props:{
		title:{
			type:String,
			default:()=>{}
		}
	}
	}
</script>

<style scoped lang="scss">
		.nav-header {
			margin-bottom: 10px;
		}
		.ui-card {
			padding: 12px;
			margin-top: 8px;
			border-radius: 10pt;
			width: calc(100% - 24px);
			background-color: #fff;
		
		}
</style>
