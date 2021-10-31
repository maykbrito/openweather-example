import { Router } from 'express'
import { parse, URLSearchParams } from 'url'
import apicache from 'apicache'
import axios from 'axios'

const apiRoutes = Router()
const cache = apicache.middleware

apiRoutes.get('/', cache('1 minute'), async (req, res) => {
  const { API_BASE_URL, API_KEY_NAME, API_KEY_VALUE } = process.env
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...parse(req.url, true).query
    })

    const { data } = await axios(`${API_BASE_URL}?${params}`)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
})

export { apiRoutes }
