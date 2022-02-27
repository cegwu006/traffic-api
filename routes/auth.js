import { Router } from 'express'
const router = Router()
import { user } from '../controllers/UserController.js'
import { addUserToList } from '../controllers/mailChimpController.js'


router.post('/signup', user.signup)
router.post('/signin', user.login)
router.post('/user', addUserToList)


export default router