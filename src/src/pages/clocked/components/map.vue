<template>
	<view class="container">
		<map :scale="scale" style="width: 100%; height: 100%;" :circles="circles" :latitude="circles[0].latitude"
			:longitude="circles[0].longitude" :markers="covers">
		</map>
	</view>
</template>
<script>
	import {
		clockPath
	} from '../default.js'
	export default {
		props: {
			xyTude: {
				type: Array,
				default: () => {}
			}
		},
		data() {
			return {
				scale: 14,
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				circles: [{
					strokeWidth: '4px',
					fillColor: '#0087d53a',
					color: '#0087d53a',
					latitude: clockPath.latitude,
					longitude: clockPath.longitude,
					radius: 200
				}],
				defaultTude: {
					latitude: clockPath.latitude,
					longitude: clockPath.longitude,
					iconPath: require('@/images/location.png')
				},
				covers: []
			}
		},
		watch: {
			xyTude: {
				handler() {
					this.resetLocation()
				},
				deep: true
			}
		},
		mounted() {
			this.resetLocation()
		},
		methods: {
	
			resetLocation() {
				this.covers = [{
					...this.defaultTude
				}, {
					//动态经纬度
					latitude: this.xyTude[0],
					longitude: this.xyTude[1],
					iconPath: require('@/images/tude.png'),
					// latitude: 30.1804,
					// longitude: 120.1395
				}]
			}
		}

	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		max-height: 100%;
		padding: 0;
		margin: 0;

		.u-icon {
			top: 8px;
			right: 8px;
			z-index: 99999999;
		}
	}
</style>
