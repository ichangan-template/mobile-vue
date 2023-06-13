import { defineStore } from 'pinia';
import type { GlobalState } from '@/types/store/global';

export const useGlobalStore = defineStore<'global', GlobalState, any, any>('global', {
  state: () => {
    return { loading: false };
  },
  actions: {
    closeLoading() {
      this.loading = false;
    },
    openLoading() {
      this.loading = true;
    },
  },
});
