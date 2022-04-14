import { Router } from 'express'
const router = Router()
import passport from 'passport' 



router.get('/auth/facebook',
  passport.authenticate('facebook'))

router.get('/auth/linkedin', passport.authenticate('linkedin', (err, user, info) => {
    if (err) { return next(err) }
  }), async (req, res, next) => {
    console.log('auth/linkedin')
})


router.get('/auth/twitter',
  passport.authenticate('twitter'));

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
      successRedirect: '/auth/linkedin/redirect',
      failureRedirect: '/auth/linkedin'
    }), async (req, res, next) => {
        // console.log(req.user.dataValues)
        console.log('redirected well linkedin')
})


router.get('/auth/facebook/callback/',
  passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/test' }),
  function(req, res) {
    res.redirect('/');
});

router.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


export default router