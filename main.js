import Vue from 'vue'
import App from './App'
import store from '@/store';

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

const app = new Vue({
	store,
    ...App
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js';
Vue.use(httpApi, app);


Vue.prototype.checkLogin = function(backpage, backtype){
	if(this.$u.test.isEmpty(this.vuex_token)){
		this.$u.route('/pages/login/index4', {
			backpage: backpage,
			backtype: backtype
		});
		return false;
	}
	return true;
}

Vue.prototype.getCurPage = function(){
		    let pages = getCurrentPages();
		    let curPage = pages[pages.length-1];
			let curParam = curPage.options || curPage.$route.query;
		    return curParam
		}

app.$mount()
