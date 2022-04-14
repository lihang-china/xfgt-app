<template>
	<u-popup :closeable="true" :round="30" :show="open" @close="handleClose">
		<view class="popup-filter">
			<text class="ui-h1">全部筛选</text>
			<u-collapse :value="[0,1,2]" :border="false" v-for="(item,index) in navList" :key="index">
				<u-collapse-item :name="index" :border="false" :title="item.title">
					<view>
						<view class="tag-block " @click="handleSelect(index,idx)"
							:class="[e.select ? 'tag-select' : '']" v-for="(e,idx) in item.children" :key="idx">
							<view class="flex-center">
								<text>{{e.title}}</text>
								<u-icon color="rgb(250,250,250)" v-show="e.select == true" name="checkmark-circle" />
							</view>
						</view>
					</view>
				</u-collapse-item>
			</u-collapse>
			<view class="bottom-btngroup">
				<text @click="handleReset">重置</text><text @click="handleSubmit">确认</text>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props: {
			cardEdit: {
				type: Object,
				default: () => {}
			},
			navList: {
				type: Array,
				default: () => {}
			},
			open: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				type: undefined,
				initData: this.cardEdit
			}
		},
		methods: {
			handleSubmit() {
				let arr = []
				this.navList.forEach(e => {
					e.children.map(t => {
						if (t.select == true) {
							arr.push(t)
						}
					})
				})
				this.$emit('open', false)
				this.$emit('getData', arr)
			},
			handleReset() {
				this.navList.forEach(e => {
					e.children.forEach(t => {
						t.select = false
					})
				})
			},
			handleClose() {
				this.$emit('open', false)
			},
			handleSelect(index, idx) {
				if (this.navList[index].children[idx].select == true) {
					this.navList[index].children[idx].select = false
				} else {
					this.navList[index].children.forEach(e => {
						this.$set(e, 'select', false)
					})
					this.$set(this.navList[index].children[idx], 'select', true)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-filter {
		padding: 8px 0;
		height: 80vh;
		border-radius: 20px 20px 0 0;

		.ui-h1 {
			display: block;
			width: 100%;
			text-align: center;
			font-weight: normal;
			font-size: 10px;
			margin-bottom: 10px;
		}

		position: relative;

		.bottom-btngroup {
			width: calc(100% - 24px);
			padding: 4px 12px;
			position: fixed;
			bottom: 10px;

			uni-text {
				display: flex;
				display: inline-block;
				width: 50%;
				text-align: center;
				padding: 5px 0;
				color: #fff;
				background-color: rgb(45, 125, 244);

				&:nth-child(1) {
					background-color: rgb(191, 191, 191);
					border-radius: 10px 0 0 10px;
				}

				&:nth-child(2) {
					border-radius: 0 10px 10px 0;
				}
			}
		}

		.tag-select {
			color: rgb(250, 250, 280) !important;

			uni-text {
				color: rgb(250, 250, 280) !important;
			}

			background-color: rgb(45, 125, 244) !important;
		}

		.tag-block {
			uni-text {
				color: rgb(42, 42, 42);
				font-size: 9px;
				margin-right: 3px;
			}

			background-color: rgb(241, 242, 243);
			padding: 5px 8px;
			margin: 3px;
			width: calc(33% - 22px);
			border-radius: 10px;
			display: inline-block;
		}
	}
</style>
