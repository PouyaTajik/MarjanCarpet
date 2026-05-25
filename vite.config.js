import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MarjanCarpet/',  // ← این خط مسیر پایه را تنظیم می‌کند
  plugins: [react()],
})
