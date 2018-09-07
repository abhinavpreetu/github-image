import Vue from 'vue';
import Router from 'vue-router';
import user from '../components/user/User';
import view from '../components/view/View';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user',
      component: user,
    },
    {
      path: '/contents*',
      name: 'contents',
      component: view,
    },
  ],
  mode: 'history',
});
