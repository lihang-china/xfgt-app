<template>
	<u-steps :current="current" direction="column">
		<view class="item-card" :class="[current == index ? '' :'unactive-card']" @click="handleClick(item,index)"
			v-for="(item,index) in msgList" :key="index">
			<u-steps-item :title="item.title" :class="[current == index ? 'active-style' :'defualt-style']"
				:desc="item.date">
				<u-icon size="22" color="rgb(0, 115, 255)" slot="icon"
					:name="current == index ? activeIcon :'bookmark-fill' "></u-icon>
			</u-steps-item>
			<view class="card-line" v-show="current == index"></view>
		</view>
	</u-steps>
</template>

<script>
	import {
		msgList
	} from '../default.js'
	export default {
		data() {
			return {
				activeIcon: require('/src/images/tude.png'),
				current: '1',
				msgList: msgList
			}
		},
		created() {
			this.handleClick(this.msgList[Number(this.current)], this.current)
		},
		methods: {
			handleClick(row, index) {
				this.current = index
				this.$emit('handleClick', row)
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .defualt-style {
		.u-steps-item__content {
			
			margin-left: 6px !important;
		}

		span {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 175px;
		}

		.u-text__value {
			margin-bottom: 3px;

			span {
				font-size: 8px !important;
			}

		}
	}

	.unactive-card {
		transform: scale(0.95);
	}

	.item-card {
		box-shadow: 1px 1px 5px 1px rgb(220, 220, 220);
		position: relative;
		transition: all 0.2s;
		padding: 6px 12px;
		margin-bottom: 4px;
		background-color: #fff;
		border-radius: 6px;

		.card-line {
			background-color: rgb(0, 110, 255);
			height: 1px;
			position: absolute;
			left: 0px;
			top: calc(50% - 2px);
			width: calc(100% - 12px);
			margin: 0 6px;
		}
	}

	::v-deep .active-style {
		.u-steps-item__content {
			margin-left: 6px !important;

		}

		.u-text__value {
			margin-bottom: 3px;

			span {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 9px !important;
				color: rgb(0, 81, 255) !important;
				max-width: 175px;
			}
		}



	}
</style>
