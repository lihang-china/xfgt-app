<template>
	<u-popup :closeable="true" :round="30" :show="open" @close="handleClose">
		<view class="popup-filter">
			<text class="ui-h1">全部筛选</text>
			<view class="top-list">
				<u-collapse class="collapse" :value="[0,1,2,3,4]" :border="false" v-for="(item,index) in navList"
					:key="index">
					<u-collapse-item :name="index" :border="false" :title="item.title">
						<view v-if="!item.type">
							<view class="tag-block" @click="handleSelect(index,idx)"
								:class="[e.select ? 'tag-select' : '']" v-for="(e,idx) in item.children" :key="idx">
								<view class="flex-center">
									<text>{{e.title}}</text>
								</view>
							</view>
						</view>
						<view v-if="item.type == 'input'">
							<u-input v-model="form[item.prop]" class="sel-input" shape="circle"
								:placeholder="'请输入' + item.title"></u-input>
						</view>
						<view v-if="item.type == 'date'" class="flex-flex sel-date">
							<view @click="handleFocus(item.startDate.prop)">
								<u-input :readonly="true" v-model="form[item.startDate.prop]" size="small" class="sel-input"
									shape="circle" :placeholder="item.startDate.title">
								</u-input>
							</view>
							<text class="date-text" v-if="item.endDate">至</text>
							<view @click="handleFocus(item.endDate.prop)">
								<u-input :readonly="true" v-model="form[item.endDate.prop]" class="sel-input" shape="circle"
									:placeholder="item.endDate.title"></u-input>
							</view>
						</view>
						<view class="tree-list" v-if="item.type == 'tree'">
							<uni-data-picker v-model="form[item.prop]" :popup-title="'请选择' + item.title"
								:map="{text:'label',value:'id'}" :localdata="item.children" @nodeclick="onnodeclick">
							</uni-data-picker>
						</view>
					</u-collapse-item>
				</u-collapse>
				<u-picker @confirm="handleGetsel" @cancel="select = false" :show="select" :columns="columns"
					keyName="label"></u-picker>
				<u-datetime-picker @cancel="show = false" @confirm="handleGetdate" :show.sync="show" v-model="date"
					mode="datetime"></u-datetime-picker>
			</view>
			<view class="bottom-btngroup">
				<text @click="handleReset">重置</text><text @click="handleSubmit">确认</text>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {
		uniDataPicker,
		uniLoadMore
	} from '@dcloudio/uni-ui'
	export default {
		components: {
			uniDataPicker,
			uniLoadMore
		},
		props: {
			cardEdit: {
				select: false,
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
				btnList: [],
				selectVal: undefined,
				columns: [],
				select: false,
				form: {},
				show: false,
				date: Number(new Date()),
				type: undefined,
				initData: this.cardEdit,
				formVal: undefined,
			}
		},
		methods: {
			onnodeclick(item) {
			},
			handleGetsel(val) {
				this.form[this.selectVal] = val.value[0].value
				this.select = false
			},
			selectShow(item) {
				this.selectVal = item.prop
				this.columns.push(item.children)
				this.select = true
			},
			handleFocus(val) {
				this.show = true
				this.formVal = val
			},
			handleGetdate(val) {
				this.date = val.value
				this.form[this.formVal] = this.$moment(this.date).format('YYYY-MM-DD')
				this.show = false
			},
			handleSubmit() {
				this.$emit('open', false)
				this.$emit('getData', this.form)
			},
			handleReset() {
				this.form = {}
				this.navList.forEach(e => {
					if (e.children) {
						e.children.forEach(t => {
							t.select = false
						})
					}
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
					this.form[this.navList[index].prop] = this.navList[index].children[idx].value
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
::v-deep * {
		font-size: 9px !important;
		.u-input {
			height: 14px;
		}
	}

	::v-deep .uni-data-tree {
		width: 100%;
		background-color: rgb(241, 242, 243);
		border: 0;
		border-radius: 50px !important;
		overflow: hidden;
		padding: 0 6px;

		.selected-area {
			color: rgb(197, 200, 208);
		}

		.input-value-border {
			border: 0;
		}
	}


	.tree-list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

		.add-btn,
		.btn {
			margin: 0 4px;
			width: 60px;
			height: 18px;
		}

		.add-btn {
			width: 35px;
		}
	}

	.u-collapse {
		padding: 0 8px;
	}

	.popup-filter {
		padding: 8px 0;
		height: 80vh;
		border-radius: 20px 20px 0 0;

		.top-list {
			height: 85%;
			overflow: scroll;
		}

		.sel-input {
			border: 0;
			background-color: rgb(241, 242, 243);
		}

		.sel-date {
			.date-text {
				margin: 0 4px;
			}
		}

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
					background-color: rgb(230, 230, 230);
					color: rgb(146, 148, 150);
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
