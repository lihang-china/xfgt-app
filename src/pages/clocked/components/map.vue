<template>
	<view class="container">
		<map :scale="scale" style="width: 100%; height: 100%;" :circles="circles" :latitude="latitude"
			:longitude="longitude" :markers="covers">
		</map>
	</view>
</template>

<script>
	export default {
		props: {
			xyTude: {
				type: Array,
				default: () => {}
			}
		},
		data() {
			return {
				scale: 17,
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				circles: [{
					strokeWidth: '4px',
					fillColor: '#0087d53a',
					color: '#0087d53a',
					latitude: 30.1806,
					longitude: 120.139,
					radius: 100
				}],
				latitude: 30.1806,
				longitude: 120.139,
				defaultTude: {
					latitude: 30.1806,
					longitude: 120.139,
					iconPath: require('@/images/location.png')
				},
				covers: [{
						latitude: 30.1806,
						longitude: 120.139,
						iconPath: require('@/images/location.png')
					}

				]
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

		methods: {
			resetLocation() {
				this.covers = [{
					...this.defaultTude
				}, {
					//动态经纬度
					// latitude:this.xyTude[0],
					// longitude: this.xyTude[1],
					iconPath: require('@/images/tude.png'),
					latitude: 30.1810,
					longitude: 120.139
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
