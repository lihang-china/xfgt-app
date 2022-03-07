<template>
	<view class="container">
		<u-navbar title="消息通知" :autoBack="true">
		</u-navbar>
		<view class="container-header flex-column">
			<view class="flex-column">
				<view class="flex-flex" v-for="(item,index) in itemList" :key="index">
					<text>{{item.title}}：</text><text> {{cardItem[item.value]}}</text>
				</view>
			</view>
		</view>
		<view class="app-container">
			<msg-item @handleClick="handleClick" />
		</view>
	</view>
</template>

<script>
	import {
		itemList
	} from './default.js'
	import msgItem from './components/msgItem.vue'
	export default {
		components: {
			msgItem
		},
		data() {
			return {
				itemList: itemList,
				cardItem: {}
			}
		},
		methods: {
			handleClick(row) {
				this.cardItem = row
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-container {
		padding-top: 8px;
		margin-bottom: 8px;
	}

	.container-header {
		padding: 12px 8px 8px 12px;
		height: 250px;
		overflow: scroll;
		background: linear-gradient(125deg, rgb(0, 81, 255), rgb(20, 110, 255));
		margin: 0 8px 8px 8px;
		border-radius:6px;

		.flex-flex {
			uni-text {
				&:nth-child(1) {
					white-space: nowrap;
				}
			}
		}

		uni-text {
			color: rgb(240, 240, 240);
			margin-bottom: 4px;
		}
	}
</style>
