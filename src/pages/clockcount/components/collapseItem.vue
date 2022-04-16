<template>
	<view class="container">
		<view >
			<u-list style="background-color: rgb(250, 251, 252);height: auto;">
				<u-list-item v-for="(item,index) in itemList" :key="index">
					<view class="flex-between">
						<view class="flex-column">
							<text>{{$moment(item).format('YYYY-MM-DD HH:mm:ss')}}</text>
							<text>{{  item | formatDay}}</text>
						</view>
						<!-- <view>
							<text>{{item.value}}{{item.type}}</text>
						</view> -->
					</view>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			itemList:{
				type:Array,
				default:()=>{}
			}
		}
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
