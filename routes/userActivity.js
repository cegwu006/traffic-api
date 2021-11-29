import { Router } from 'express'
import { user  } from '../controllers/userActivityController.js'
import auth from '../middlewares/authMiddleware.js'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'


cloudinary.config({
  cloud_name: "dtnak5416",
  api_key: "835991936374554",
  api_secret: "SoB00_UUlI3TM41RFGkfkAIBnRw",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "uploads",
  },
});

const upload = multer({ storage: storage });

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

router.post('/upload/profile', auth, upload.single('avatar'),  user.uploadUserAvatar)

router.post('/subscribe/sendiblue', user.subscribeSendiBlue)

export default router
