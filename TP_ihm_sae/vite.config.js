import { defineConfig } from 'vite'

export default defineConfig({
  build:{
    rollupOptions:{
        input: {
            app:"TP_ihm_sae/appli_sae.html"
        }
    }
  },
  server: {
    open:"TP_ihm_sae/appli_sae.html"
  }
})