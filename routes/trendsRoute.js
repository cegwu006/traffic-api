import { Router } from 'express'
import { trends } from '../controllers/trendsController.js'
import cache from '../cache.js'


const router = Router()


router.get('/fetch/trend', cache(5000000), trends.getTrend)
router.get('/fetch/trends', cache(5000000), trends.getTrends)


export default router