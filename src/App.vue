<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useCacheStore } from '@/store/cache';
import { useGlobalStore } from '@/store/global';
import { initUserBase } from '@/utils/base/user';

onBeforeMount(async () => {
  try {
    await initUserBase({ cacheToken: true });
  } finally {
    unInitiated.value = false;
  }
});

const cacheStore = useCacheStore();
const globalStore = useGlobalStore();

const unInitiated = ref(true);
</script>

<template>
  <van-loading
    v-show="globalStore.loading || unInitiated"
    class="loading"
  />
  <router-view
    v-if="!unInitiated"
    v-show="!globalStore.loading"
    v-slot="{ Component }"
  >
    <keep-alive :include="cacheStore.keepAliveCache">
      <component
        :is="Component"
        :key="$route.fullPath"
      />
    </keep-alive>
  </router-view>
</template>
