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
			margin-left: 3px;
			margin-right: 3px;
			border-radius: 10pt;
			width: calc(100% - 30px);
			background-color: #fff;
		   box-shadow: 0 0 5px 0px rgba(203, 203, 203, 0.5);
		
		}
</style>
