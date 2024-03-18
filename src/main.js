import '@/assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import store from '@/store'
import reveal from '@/extensions/reveal'

const app = createApp(App)

app.use(router).use(reveal)

app.config.globalProperties.$store = store;

app.mount('#app')
