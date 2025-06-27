import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import typography from '@tailwindcss/typography'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    typography
  ],
})
