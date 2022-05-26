import { createApp } from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import 'animate.css'
import VueCookies from 'vue-cookies'

createApp(App).use(store).use(router).use(VueCookies).mount('#app')
