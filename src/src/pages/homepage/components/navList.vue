<template>
	<ui-card class="nav-list" :title="title">
		<view>
			<u-grid :border="false" col="5">
				<u-grid-item v-for="(item,index) in navList" :key="index">
					<view @click="handleBtn(item)" class="nav-bar">
						<u-icon color="#fff" :name="item.icon" size="22px"></u-icon>
					</view>
					<text class="grid-text">{{item.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
	</ui-card>
</template>

<script>
	export default {
		props: {
			navList: {
				type: Array,
				default: () => {}
			},
			gridList: {
				type: Array,
				default: () => {}
			},
			title: {
				type: String,
				default:()=>{}
			}
		},
		methods: {
			handleBtn(row) {
				if (row.url) {
					this.$url(row.url)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-list {
		.u-grid-item{
			margin-bottom: 12px;
		}
		.grid-text {
			font-size: 8px;
		}
	}
</style>
