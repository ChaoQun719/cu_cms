import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: env.VITE_BASE_NAME,
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://192.168.123.216',
          changeOrigin: true,
          // secure: false,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}
