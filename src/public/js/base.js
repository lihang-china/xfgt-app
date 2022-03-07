import Vue from 'vue'
//长列表优化方法
var lazyTimer = true
var timer = undefined
exports.install = function() {
	Vue.prototype.$lazyList = (obj, arr, num) => {
		//num 不要太大，最好不要超过50根据设备性能修改
		//针对长列表优化，每隔一秒加载num条数据,num为步长每次刷新数据条数
		//obj为展示数据 参数必须为对象， arr必须为数组
		//lazyTimer 判断定时器是否结束，如果没有结束则清空定时器重新开始 (防止数据未加载完成后搜索导致数据混乱)
		//arr为原始数据
		if (lazyTimer == false) {
			clearInterval(timer)
		}
		if (arr && arr.length && arr.length > num) {
			obj.list.splice(0)
			let step = num
			obj.list = arr.slice(obj.list.length, step) //初始步数数据，防止定时时数据为空
			lazyTimer = false
			timer = setInterval(() => {
				if (arr.length - obj.list.length < step) {
					step += (arr.length - obj.list.length)
					obj.list.push.apply(obj.list, arr.slice(obj.list.length, step))
					//拼接剩余数组长度
					clearInterval(timer)
				} else {
					step += num
					obj.list.push.apply(obj.list, arr.slice(obj.list.length, step))
					//每次拼接步数长度的数组
				}
				if (arr.length == obj.list.length) {
					lazyTimer = true
					clearInterval(timer)
				}
			}, 800)
		} else {
			// 不符合步长的之间返回搜索数组
			obj.list = arr
		}

	}
}
