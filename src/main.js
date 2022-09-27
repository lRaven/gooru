import { createApp } from 'vue'
import App from './App.vue'

import components from "@/components/UI";
const app = createApp(App);

Object.keys(components).forEach( componentName => {
  app.component(componentName, components[componentName]);
});
app.config.unwrapInjectedRef = true;
app.mount('#app')
