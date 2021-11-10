import { Router } from 'express'
import { user } from '../controllers/UserController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()


router.delete('/delete/brands', (req, res) => console.log('well'))

export default router