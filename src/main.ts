import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import App from './App.vue'

import 'vue-toastification/dist/index.css'
import '@/styles/global.scss'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
