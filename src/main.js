import { createApp } from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import VueCookies from 'vue-cookies'
import VueSocialSharing from "vue-social-sharing"
import Toast, { POSITION } from "vue-toastification"
import "vue-toastification/dist/index.css"

import components from '@/components/UI'

const app = createApp(App)

for (const key in components) {
	if (Object.hasOwnProperty.call(components, key)) {
		app.component(key, components[key]);
	}
}

app.use(store)
app.use(router)
app.use(VueCookies)
app.use(VueSocialSharing)
app.use(Toast, {
	position: POSITION.BOTTOM_RIGHT,
	newestOnTop: false,
});

app.mount('#app')