import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'
import svgPlugin from './plugins/svg-plugin.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/styles/main.scss'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(svgPlugin)
app.use(router)
app.use(store)

app.mount('#app')
