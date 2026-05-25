import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MarjanCarpet/',  // مسیر پایه باید نام مخزن باشد
  plugins: [react()],
})
