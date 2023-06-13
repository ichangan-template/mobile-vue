import { defineStore } from 'pinia';
import type { CacheState } from '@/types/store/cache';

export const useCacheStore = defineStore<'cache', CacheState, any, any>('cache', {
  state: () => {
    return { keepAliveCache: [] };
  },
  actions: {
    pushkeepAliveComponent(name: string) {
      this.keepAliveCache.push(name);
    },
    removekeepAliveComponent(name: string) {
      return this.keepAliveCache.indexOf(name) > -1
        ? this.keepAliveCache.splice(this.keepAliveCache.indexOf(name), 1)
        : -1;
    },
    clearkeepAliveComponent() {
      this.keepAliveCache.length = 0;
    },
  },
});
