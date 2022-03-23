<template>
	<view class="container">
		<view >
			<u-list v-show="itemIndex !== 3"  style="background-color: rgb(250, 251, 252);height: auto;">
				<u-list-item v-for="(item,index) in list" :key="index">
					<view class="flex-between">
						<view class="flex-column">
							<text>{{item.date}}</text>
							<text>{{  item.date | formatDay}}</text>
						</view>
						<view>
							<text>{{item.value}}{{item.type}}</text>
						</view>
					</view>
				</u-list-item>
			</u-list>
			<u-list v-show="itemIndex == 3" style="background-color: rgb(250, 251, 252);height: auto;">
				<u-list-item>
					<view class="flex-between">
						<view class="flex-column">
							<text>2021-04-01 8:06</text>
							<text>上班迟到6分钟</text>
						</view>
						<view class="handel-btn">
							<text >去处理</text>
						</view>
					</view>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			itemIndex:{
				type:Number,
				default:undefined
			}
		},
		watch:{
			itemIndex(val){
				console.log(val,'INDEX')
			}
		},
		
		data() {
			return {
				Days: ['日', '一', '二', '三', '四', '五', '六'],
				list: [{
					date: "2021-01-01",
					value: 7,
					type: "小时"
				}, {
					date: "2021-01-02",
					value: 6,
					type: "小时"
				}, {
					date: "2021-01-03 8:10",
					value: 5,
					type: "分钟"
				},
				{
					date: "2021-01-03 8:10",
					value: 6,
					type: "分钟"
				}, {
				date: "2021-01-03 8:10",
					value: 5,
					type: "分钟"
				}]
			}

		},
	}
</script>

<style lang="scss" scoped>
	.handel-btn{
		uni-text{
			 color: rgb(85, 170, 255) !important;
			 font-size: 10px;
		}
	}
	.container {
		uni-text {
			font-size: 10px;
		}
     
		.flex-between {
			padding: 5px 10px;
          uni-text{
			  color: rgb(180,180,180);
		  }
			.flex-column {
				uni-text{
					font-size: 10px;
					color: rgb(72, 72, 72);
					&:nth-child(2){
						font-size: 9px;
							color: rgb(130, 130, 130);
					}
				}
				
			}
		}
	}
</style>
