import { createApp } from 'vue'
import App from './App.vue'
import './styles/reset.scss'

import router from './routers'

createApp(App).use(router).mount('#app')
