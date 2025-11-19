import { createApp } from 'vue'
import UserscriptApp from './components/UserscriptApp.vue'
import { sleep } from './utils/sleep.ts'
import { createPinia } from 'pinia'

export async function createVueApp() {
    const app = createApp(UserscriptApp)

    const pinia = createPinia()
    app.use(pinia)

    await sleep(0)
    return app
}
