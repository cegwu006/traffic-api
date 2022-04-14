import { Router } from 'express'
import { trends } from '../controllers/trendsController.js'
import cache from '../cache.js'

const router = Router()


router.get('/fetch/trend', trends.getTrend)
router.get('/fetch/trends',  trends.getTrends)


export default router