<template>
	<view class="container">
		<u-navbar title="告警中心" :autoBack="true">
		</u-navbar>
		<view class="app-container">
			<ui-card class="card-box">
				<view class="charts-box">
					<qiun-data-charts @getIndex="ontap" type="line" :chartData="chartData" background="none"
						:animation="false" />
				</view>
				<u-subsection bgColor="#0068f8" inactiveColor="#ffffff" activeColor="#0068f8" @change="subChange"
					mode="button" :list="list" :current="current"></u-subsection>
			</ui-card>
			<view class="container-nav flex-between">
				<text class="ui-h3">告警列表</text>
				<u-icon size="22" :name="require('../../images/freshen.png')"></u-icon>
			</view>
			<view class="container-scroll">
				<alarm-card @cardIndex="getCardIndex" :cardData="item" v-for="(item,index) in alarmData" :key="index"
					:listIndex="index" />
			</view>
		</view>
		<swiper-card @popupState="handleClose" :open="open" :listIndex="listIndex" :listNum="3" :itemList="alarmData">
			<template v-slot:cards="{data}">
					<alarm-card :cardData="data" :detail="true"
						 />
			</template>
		</swiper-card>
	</view>
</template>

<script>
	import SwiperCard from '@/public/components/SwiperDard.vue'
	import alarmCard from './components/alarmCard.vue'
	import {
		chartData,
		alarmData
	} from './default.js'
	export default {

		components: {
			SwiperCard,
			alarmCard,
		},
		data() {
			return {
				open: false,
				listIndex: 0,
				cardIndex: [],
				alarmList: alarmData,
				alarmData: alarmData,
				list: ['全部告警', '未处理'],
				current: 0,
				chartData: {
					...chartData
				}
			}
		},
		methods: {
			handleClose(val) {
				this.open = val
			},
			getCardIndex(index) {
				this.listIndex = index
				this.open = true
			},
			ontap(data) {
				//根据ucharts tag标签索引，筛选告警等级
				let index = data.legendIndex + 1
				if (data.legendIndex !== -1) {
					this.cardIndex.includes(index) ? this.cardIndex.splice(this.cardIndex.indexOf(index), 1) : this
						.cardIndex.push(index)
					this.alarmData = this.alarmList.filter(e => {
						return this.current == 1 ? (this.cardIndex.indexOf(e.level) == -1 && e.state == 'INIT') :
							this.cardIndex.indexOf(e.level) == -1
					})
				}
			},
			subChange(index) {
				this.current = index
				this.alarmData = this.alarmList.filter(e => {
					return this.current == 1 ? (this.cardIndex.indexOf(e.level) == -1 && e.state == 'INIT') :
						this.cardIndex.indexOf(e.level) == -1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.app-container {
		top: 45px;

		.container-scroll {
			max-height: calc(100% - 20px);
			overflow: scroll;
		}

		.container-nav {
			margin-top: 8px;
		}

		.card-box {
			background-color: #0068f8;
		}

		.u-subsection {
			margin-top: 8px;
		}

		.charts-box {
			width: 100%;
			height: 130px;
		}
	}
</style>
