<template>
		<uni-calendar :showMonth="false" :selected="selectData" ref="calendar" @change="changeInfo" />
</template>

<script>
	import {
		selectData
	} from '../../pages/attendance/defualt.js'
	export default{
		data(){
			return{
				selectData: selectData
			}
		},
		methods:{
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

<style>
</style>
