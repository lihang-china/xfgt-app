<template>
	<view class="app-container">
		<view class="container-from">
			<u-form size="mini">
				<u-form-item borderBottom>
					<u-input v-model="fromData.title" placeholderStyle="fontSize:16px;" placeholder="标题" border="none"
						suffixIcon="info-circle-fill" suffixIconStyle="color:rgb(162, 224, 232);margin-right:2px;">
					</u-input>
				</u-form-item>
				<u-form-item borderBottom>
					<u-grid col="3">
						<u-grid-item>
							<u-input v-model="fromData.startDate"
								prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="clock"
								placeholderStyle="fontSize:14px;" @focus="handelTimePick()" placeholder="开始时间"
								border="none">
							</u-input>
						</u-grid-item>
						<u-grid-item>
							-
						</u-grid-item>
						<u-grid-item>
							<u-input v-model="fromData.endDate" placeholderStyle="fontSize:14px;"
								@focus="handelTimePick()" placeholder="结束时间" border="none">
							</u-input>
						</u-grid-item>
					</u-grid>
					<u-datetime-picker @cancel="pickerisSHow = false" :closeOnClickOverlay="true" :show="pickerisSHow"
						mode="time"></u-datetime-picker>
				</u-form-item>
				<u-form-item borderBottom>
					<u-input v-model="fromData.phone" type="number"
						prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;" prefixIcon="account"
						placeholderStyle="fontSize:14px;" placeholder="联系人" border="none">
					</u-input>
				</u-form-item>
				<u-form-item borderBottom>
					<u-input v-model="fromData.desc" prefixIconStyle="color:rgb(162, 224, 232);margin-right:2px;"
						prefixIcon="order" placeholderStyle="fontSize:14px;" placeholder="请输入备注" border="none">
					</u-input>
				</u-form-item>
				<u-form-item borderBottom>
					<view class="tag-group">
						<view class="u-page__tag-item" v-for="(item, index) in checkboxs" :key="index">
							<u-tag :text="`班组${index + 1}`" :plain="!item.checked" type="primary" :name="index">
							</u-tag>
						</view>
						<u-button size="small" class="tag-addpaln">+</u-button>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<u-button class="container-addplan" icon="plus" iconColor="rgb(0, 153, 255)"></u-button>
		<view class="bottom-fiexd flex-center">
			<text>取消</text>
			<text>保存</text>
		</view>
	</view>
</template>
<script>
	import {
		uniCalendar,
		uniSwiperDot
	} from '@dcloudio/uni-ui'
	export default {
		components: {
			uniCalendar,
			uniSwiperDot
		},
		data() {
			return {
				info: [{
					content: '内容 A'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
				}],
				current: 0,
				mode: 'round',
				checkboxs: [{
						checked: true
					},
					{
						checked: false
					},
					{
						checked: false
					},
					{
						checked: false
					},
					{
						checked: false
					}, {
						checked: false
					},
					{
						checked: false
					},
				],
				date: this.$moment(new Date()).format('MM月DD日'),
				fromData: {},
				pickerisSHow: false,
				show: false,
				selected: [{
					date: '2022-01-27',
					info: '夜班',
					data: {
						startDate: '09:00',
						endDate: '17:00',
						desc: '今天不加班',
						phone: 18804626605,
						tag: []
					}
				}]
			}
		},

		mounted() {},
		methods: {
			addClass() {
				//添加计划
			},
			addPaln() {
				//新增班组

			},
			checkboxClick(name) {
				this.checkboxs[name].checked = !this.checkboxs[name].checked
			},
			handelView() {
				this.show = true
			},
			handelTimePick() {
				this.pickerisSHow = true
			},
			changeInfo(e) {
				this.fromData = {}
				this.date = this.$moment(e.fulldate).format("MM月DD日")
				if (Object.keys(e.extraInfo).length > 0) {
					this.show = true
					this.fromData = e.extraInfo.data
					this.fromData.title = e.extraInfo.info
					this.fromData.date = e.extraInfo.date
				}
			}
		}
	}
</script>


<style scoped lang="scss">
@import  "./style/default.scss";
</style>
