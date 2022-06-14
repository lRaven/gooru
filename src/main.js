import { createApp } from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import 'animate.css'
import VueCookies from 'vue-cookies'
import VueSocialSharing from "vue-social-sharing"

const app = createApp(App)

app.use(store);
app.use(router);
app.use(VueCookies);
app.use(VueSocialSharing);
app.mount('#app');