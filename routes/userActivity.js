import { Router } from 'express'
import { user  } from '../controllers/userActivityController.js'
import auth from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/brands',  auth, user.getBrands)
router.post('/brands',  auth, user.postBrand)
router.delete('/brands/:id',  auth, user.deleteBrand)
router.get('/brand-avatar/:id', auth, user.brandAvatar)


router.post('/messages', auth, user.postMessage)
router.get('/messages', auth, user.getMessages)

router.get('/message/:id', auth, user.hijackedMessage)

router.get('/leads',  auth, user.leadsEmails)
// router.post('/leads', auth, user.postLead)
// router.delete('/leads',   auth, user.deleteLead)

router.put('/update-profile',   auth, user.updateProfile)
router.get('/me', auth, user.me)


router.post('/hijack/video', auth, user.saveVideoHijacked)
router.get('/hijack/video',  user.getHijackedVideos)

router.get('/hijack/content', auth, user.getHijackedContent)
router.post('/hijack/content', auth, user.saveHijackedContent)

router.get('/stats/hijack', auth, user.getStats)

router.get('/hijacked/content/:id', user.getSingleContent)

export default router
