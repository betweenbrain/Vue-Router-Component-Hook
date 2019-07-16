import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const routes = [{
  path: '/',
  name: 'home',
  component: Home,
},
{
  path: '/about',
  name: 'about',
  component: () => import('./views/About.vue'),
},
];

export function createRouter() {
  return new Router({
    mode: 'history',
    routes,
  });
}
