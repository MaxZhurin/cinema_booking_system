import pinia from '@/stores'
import router from '@/router'
import vuetify from './vuetify'
import { options, Toast } from './toast'

import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(Toast, options)
}
