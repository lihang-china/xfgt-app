<template>
	<view class="container">
		<u-navbar title="消息通知" :autoBack="true">
		</u-navbar>
		<view class="container-header flex-column">
			<view class="flex-column">
				<view class="flex-between" v-for="(item,index) in itemList" :key="index">
					<text v-if="item.title">{{item.title}}：</text> <text
						v-if="item.value == 'noticeType'">{{cardItem[item.value] | filterType}}</text> <text
						v-else>{{cardItem[item.value]}}</text>
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
		filters: {
			filterType(val) {
				if (val === "0") {
					return '公告'
				} else if (val === "1") {
					return '通知'
				}
			},
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
		overflow: scroll;
		background-color: rgb(253, 253, 253);
		box-shadow: 0 0px 5px 2px rgba(212, 212, 212, 0.5);
		// background: linear-gradient(125deg, rgb(0, 81, 255), rgb(20, 110, 255));
		margin: 8px;
		border-radius: 6px;
		min-height: 150px;
		max-height: 150px;
 
		.flex-between {
			&:nth-last-child(1) {
				margin-top: 10px;
				border-radius: 10px;
				// border-top: 1px solid rgba(193, 193, 193, 0.5);
				padding: 8px;
				flex-direction: column;
				align-items: flex-start;
				height: 50px;
				overflow-y: scroll;
				background-color: rgb(241, 242, 243);

				uni-text {
					font-size: 9px;
					font-weight: normal !important;
					color: #737373;
				}
			}

			uni-text {
				&:nth-child(1) {
					font-weight: bold;
					white-space: nowrap;
				}

				&:nth-child(2) {
					// font-weight: bold;
					font-size: 9.5px;
					white-space: nowrap;
				}
			}
		}

		uni-text {
			color: rgb(75, 75, 75);
			margin-bottom: 4px;
		}
	}
</style>
