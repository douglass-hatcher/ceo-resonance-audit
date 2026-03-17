import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT, buildUserPrompt, parseAnalysisResponse } from './src/lib/analyzeCore.js'

export default defineConfig(({ mode }) => {
  // Load all env vars (including non-VITE_ prefixed) from .env.local / .env
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      devApiPlugin(env),
    ],
  }
})

/**
 * Handles /api/analyze in the Vite dev server so `npm run dev` works without
 * the Vercel CLI. In production, Vercel routes this to api/analyze.js instead.
 */
function devApiPlugin(env) {
  return {
    name: 'dev-api-analyze',
    apply: 'serve', // only active during `vite dev`, never in builds

    configureServer(server) {
      server.middlewares.use('/api/analyze', async (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        try {
          // Read and parse the request body
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const body = JSON.parse(Buffer.concat(chunks).toString())
          const { auditType, visibilityData, clarityData } = body

          if (!auditType) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'auditType is required' }))
            return
          }

          const apiKey = env.ANTHROPIC_API_KEY
          if (!apiKey) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
              error: 'ANTHROPIC_API_KEY is not set. Add it to .env.local and restart the dev server.',
            }))
            return
          }

          const client = new Anthropic({ apiKey })
          const userPrompt = buildUserPrompt(auditType, visibilityData, clarityData)

          const message = await client.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: SYSTEM_PROMPT,
            messages: [{ role: 'user', content: userPrompt }],
          })

          const result = parseAnalysisResponse(message.content[0].text)

          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(result))
        } catch (err) {
          console.error('[dev-api] /api/analyze error:', err)
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: err.message || 'Analysis failed' }))
        }
      })
    },
  }
}
