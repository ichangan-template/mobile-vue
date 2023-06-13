import * as VueRouter from 'vue-router';
import { routes } from './routes';
import { useCacheStore } from '@/store/cache';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

// 路由全局后置首位
router.afterEach((to, from) => {
  // keep alive 缓存队列
  const cacheStore = useCacheStore();

  to.meta.keepAlive &&
    to.name &&
    cacheStore.keepAliveCache.indexOf(to.name as string) === -1 &&
    cacheStore.pushkeepAliveComponent(to.name);
});

export default router;
