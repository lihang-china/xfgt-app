<template>
	<view class="container">
		<u-navbar title="消息通知" :autoBack="true">
		</u-navbar>
		<view class="container-header flex-column">
			<view class="flex-column">
				<view class="flex-flex" v-for="(item,index) in itemList" :key="index">
					<text>{{item.title}}：</text> <text
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
		background: linear-gradient(125deg, rgb(0, 81, 255), rgb(20, 110, 255));
		margin: 0 8px 8px 8px;
		border-radius: 6px;
 min-height: 150px;
 max-height: 150px;
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
