import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    build({
      outputDir: 'dist',
      excludeRoutes: ['/static/*', '/blog_posts_data/*']
    }),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ],
  publicDir: 'public',
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['.sandbox.novita.ai', '.sandbox.gensparksite.com', 'localhost']
  }
})
