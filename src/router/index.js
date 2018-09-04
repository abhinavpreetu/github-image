import Vue from 'vue';
import Router from 'vue-router';
import user from '../components/user/User';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: user,
    },
  ],
});
