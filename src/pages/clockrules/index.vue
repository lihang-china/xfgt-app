<template>
	<view class="app-container">
		<u-navbar @leftClick="leftClick" class="container-navbar" title="考勤规则" bgColor="rgba(0,0,0,0)">
		</u-navbar>
		<ui-card class="container-header flex-flex">
			<u-avatar text="北" fontSize="14px" randomBgColor />
			<view class="flex-column">
				<text>{{username}}</text>
				<text>{{clockPath}}</text>
			</view>
		</ui-card>
		<ui-card class="container-collapse">
			<u-collapse @change="handleChange" accordion :value="0" :border="false">
				<u-collapse-item :title="item.title" v-for="(item,index) in itemList" :key="index" :name="index">
					<itme-list :type.sync="item.type" />
				</u-collapse-item>
			</u-collapse>
		</ui-card>
	</view>
</template>

<script>
	import itmeList from './components/itemList.vue'
	export default {
		components: {
			itmeList
		},
		data() {
			return {
				username: '李航',
				clockPath: '浙江源创智能',
				itemList: [{
					title: '打卡范围',
					type: 'clock'
				}, {
					title: '补卡规则',
					type: 'rule'
				}, {
					title: '打卡地点',
					type: 'path'
				}]
			}
		},
		methods: {
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			handleChange(row) {},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-cell__title-text {
		color: rgb(44, 137, 229) !important;
		font-size: 10px;
	}

	.app-container {
		top: 0px;
		height: auto;
		.container-header {
			.flex-column {
				margin: 5px;

				uni-text {
					font-size: 10px;

					&:nth-child(2) {
						font-size: 8px;
						margin-top: 2px;
						color: rgb(103, 111, 134) !important;
					}
				}
			}
		}

		.container-collapse {
			padding-top: 20px;
			padding-bottom: 20px;
		}
	}
</style>
