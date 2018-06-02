import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueLazyLoad from 'vue-lazyload';
import Navigation from 'vue-navigation';

import zoom from 'common/js/zoom.js'; 
import 'common/css/index.scss';
import 'swiper/dist/css/swiper.css';
import 'common/css/index.scss';
Vue.use(VueLazyLoad,{
	loading: ''
})

Vue.config.productionTip = false;

Vue.use(VueAwesomeSwiper);

Vue.use(Navigation, {router, store})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
