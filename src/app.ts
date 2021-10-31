import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import 'dotenv/config'

import { apiRoutes } from './routes'

const PORT = process.env.PORT || 5454
const app = express()

// Rate Limit
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100 // 100 requests
})

app.use(limiter)
app.set('trust proxy', 1)

// Static dir
app.use(express.static('public'))

// Routes
app.use('/api', apiRoutes)

app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log(`🔥 Server is running on port ${PORT}`))
