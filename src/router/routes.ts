import Home from '@/views/home/index.vue';

export const routes = [
  {
    path: '/',
    component: Home,
    name: Home.name,
    meta: {
      title: '首页',
      keepAlive: false,
    },
  },
];
