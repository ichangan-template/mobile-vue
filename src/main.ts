import { createApp } from 'vue';
import router from '@/router/index';
import 'vant/lib/index.css';
import './assets/styles/normalize.css';
import './assets/styles/tailwind.css';
import App from './App.vue';
import Vant from '@/config/vant';
import ConfigProvider, { showToast } from 'vant';
import { createPinia } from 'pinia';
import SDK from '@ichangan/ica-sdk';
import { initClientId } from './utils/host';

function vueInit() {
  createApp(App).use(router).use(createPinia()).use(Vant).use(ConfigProvider).mount('#app');
}

async function sdkInit() {
  try {
    await SDK.init({
      clientId: initClientId(),
      mode: import.meta.env.MODE as 'development' | 'production',
    });
  } catch (error) {
    showToast('系统初始化错误');
  }
}

(async () => {
  try {
    if (import.meta.env.ICA_DEBUG === 'TRUE') {
      const VConsole = await import('vconsole');
      new VConsole.default({ theme: 'dark' });
    }
    await sdkInit();
  } catch (error) {
    console.error(error);
  } finally {
    vueInit();
  }
})();
