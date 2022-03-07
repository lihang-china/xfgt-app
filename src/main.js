import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import moment from 'moment'
import store from './store' //从第二步文件夹中引入的store
Vue.prototype.$store = store //将store挂载到vue原型上
import {
	uniIcons
} from '@dcloudio/uni-ui'
import uiCard from './public/components/Card.vue'
import  $lazyList from './public/js/base.js'
Vue.use($lazyList)
import  $url from './router/index.js'
import uiTabbar from './pages/tabbar/tabbar.vue'
Vue.use($url)
Vue.component('uiCard',uiCard)
Vue.component('uiTabbar',uiTabbar)
Vue.prototype.$moment = moment
// 定义全局时间戳过滤器
Vue.filter('formatDate', function(value) {
	return moment(value).format('YYYY年MM月DD日')
})
const Days = ['日', '一', '二', '三', '四', '五', '六']
Vue.filter('formatDay', function(value) {
	return '星期' + Days[Number(moment(value).day())]
})
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
