import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/Recommend/recommend';
import Rank from 'components/Rank/rank';
import Search from 'components/Search/search';
import Classify from 'components/Classify/classify';
import AppDetail from 'components/AppDetail/appDetail';
import ClassifyDetail from 'components/Classify/classifyDetail';
import More from 'components/More/more';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/recommend',
    },
    {
      name: 'recommend',
      path: '/recommend',
      component: Recommend
    },
    {
      name: 'rank',
      path: '/rank',
      component: Rank
    },
    {
      name: 'classify',
      path: '/classify',
      component: Classify
    },
    {
      name: 'classifyDetail',
      path: '/classifyDetail/:id',
      component: ClassifyDetail
    },
    {
      name: 'search',
      path: '/search',
      component: Search
    },
    {
      name: 'appDetail',
      path: '/appDetail/:id',
      component: AppDetail
    },
    {
      name: 'more',
      path: '/more/:id',
      component: More
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: 'dist'
})
