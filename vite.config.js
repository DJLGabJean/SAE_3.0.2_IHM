import { defineConfig } from 'vite'

export default defineConfig({
  build:{
    rollupOptions:{
        input: {
            app:"vue/appli_sae.html"
        }
    }
  },
  server: {
    open:"vue/appli_sae.html"
  }
})