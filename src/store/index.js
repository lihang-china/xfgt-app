import Vue from "vue" //引入vue
import Vuex from "vuex" // 引入vuex
Vue.use(Vuex) // 让vue使用vuex
// 通过vuex构造函数创建store对象
const store = new Vuex.Store({  
    state: {  
         pageName:'repair'
    },  
    mutations: {  
        
    },
	modules: {
		shopcar: {
			state: {
				
			},
			mutations: {
				changeCheckedGoods () {
				},
				changeAllMoney (state,playload) {
					state.allMoney = playload.arguments.allMoney
				}
			}
		}
	}
}) 
export default store 
