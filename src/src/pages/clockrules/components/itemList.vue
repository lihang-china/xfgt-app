<template>
	<view class="flex-column">
		<view v-for="(item,index) in itemList" :key="index">
			<view v-if="type == item.type" class="flex-column" v-for="(e,idx) in item.children" :key="idx">
				<text class="item-title">{{e.title}}</text>
				<text v-for="(it,i) in e.value" :key="i">
					{{it}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		itemList
	} from '../defult.js'
	export default {
		props: {
			type: {
				type: String,
				default: undefined
			}
		},
		data() {
			return {
				itemList: itemList,
			}
		}

	}
</script>

<style lang="scss" scoped>
	uni-text {
		margin: 2px 0;
		font-size: 10px;
		line-height: 12px;
	}

	.item-title {
		color: rgb(42, 42, 42);
		margin: 5px 0;
		font-weight: bold;
	}
</style>
