<template>
	<view class="container">
		<u-navbar title="设备详情" :autoBack="true">
		</u-navbar>
		<view class="app-container">
			<detail-item />
		</view>
	</view>
</template>

<script>
	import detailItem from './components/detailItem.vue'
	export default {
		components: {
			detailItem
		},
		data() {
			return {

			}
		}
	}
</script>

<style>
	
</style>
