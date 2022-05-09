<template>
	<u-steps :current="current" direction="column">
		<view class="item-card" :class="[current == index ? 'unactive-card' :'item-card']"
			@click="handleClick(item,index)" v-for="(item,index) in msgList" :key="index">
			<u-steps-item :title="item.noticeTitle" :class="[current == index ? 'active-style' :'defualt-style']"
				:desc="item.createTime">
				<u-icon size="26" color="rgb(0, 115, 255)" slot="icon"
					:name="current == index ? activeIcon :'bookmark-fill' "></u-icon>
			</u-steps-item>
		</view>
	</u-steps>
</template>

<script>
	import {
		msgList
	} from '../default.js'
	import {
		noticeList
	} from '/src/api/system.js'
	export default {
		data() {
			return {
				activeIcon: require('/src/images/tude.png'),
				current: '0',
				msgList: []
			}
		},
		mounted() {
			this.getNoticeList()
		},
		methods: {
			getNoticeList() {
				noticeList().then(res => {
					this.$lazyList(this.msgList, res.rows, 10)
					this.handleClick(this.msgList[Number(this.current)], this.current)
				})
			},
			handleClick(row, index) {
				this.current = index
				this.$emit('handleClick', row)
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .unactive-card {
		// transform: scale(0.95);
		background-color: rgb(10, 96, 255) !important;

		* {
			background-color: rgb(10, 96, 255) !important;
			color: #fff !important;
			font-size: 9px;
		}
	}

	.item-card {
		box-shadow: 1px 1px 5px 1px rgb(220, 220, 220);
		position: relative;
		padding: 6px 12px;
		margin-bottom: 4px;
		background-color: #fff;
		border-radius: 6px;
		min-height: 40px;
		max-height: 40px;
	}
</style>
