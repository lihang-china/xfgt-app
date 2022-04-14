<template>
	<view class="container">
		<u-navbar @leftClick="leftClick" class="container-navbar" title="考勤规则" bgColor="rgba(0,0,0,0)">
		</u-navbar>

	<view class="app-container">
	
		<ui-card class="container-header flex-flex">
			<u-avatar :src="imgSrc" fontSize="14px" randomBgColor />
			<view class="flex-column">
				<text>{{userInfo.userName}}</text>
				<text>{{clockPath}}</text>
			</view>
		</ui-card>
		<ui-card class="container-collapse">
			<u-collapse @change="handleChange" accordion :value="0" :border="false">
				<u-collapse-item :title="item.title" v-for="(item,index) in itemList" :key="index" :name="index">
					<itme-list :itemData="itemData" :type.sync="item.type" />
				</u-collapse-item>
			</u-collapse>
		</ui-card>
	</view>
		</view>
</template>

<script>
	import {
		selectRule
	} from '/src/api/rule.js'
	import itmeList from './components/itemList.vue'
	export default {
		components: {
			itmeList
		},
		data() {
			return {
				itemData:[],
				userInfo:{},
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
		onLoad(){
					this.getRules()
			this.getUserinfo()
		},
		methods: {
			getRules() {
				selectRule().then(res => {
					if (res.code == 200) {
						this.itemData = [{
							type: 'clock',
							children: [{
									title: '上下班时间',
									value: [res.data[0].clockScope.workTime]
								},
								{
									title: '弹性规则',
									value: [res.data[0].clockScope.elasticRole]
								}, {
									title: '迟到规则',
									value: [res.data[0].clockScope.lateRole]
								}
							]
						}, {
							type: 'rule',
							children: [{
								title: res.data[0].clockRole.roleOne.roleName,
								value: [res.data[0].clockRole.roleOne.roleValue]
							}]
						}, {
							type: 'path',
							children: [{
								title: res.data[0].clockSpace.spaceName,
								value: [res.data[0].clockSpace.spaceValue]
							}]
						}]
					}
				})
			},
		getUserinfo() {
			var data = uni.getStorageSync('user_info')
			this.userInfo = data.user
			this.imgSrc = data.user.avatar
			this.userInfo.deptName = data.user.dept.deptName
			},
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
		height: auto;
		.container-header {
			.flex-column {
				margin: 5px;

				uni-text {
					font-size: 11px;

					&:nth-child(2) {
						font-size: 9px;
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
