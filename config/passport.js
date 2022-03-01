import passport from 'passport'
import { Strategy as FacebookStrategy }  from  'passport-facebook'
import { Strategy as  LinkedInStrategy} from 'passport-linkedin-oauth2'
import { Strategy as  TwitterStrategy} from 'passport-twitter'
import User from '../models/User.js'


export  function fbLogin(passport){
passport.use(new FacebookStrategy({
   clientID: '231936885821008',
    clientSecret: '97324eb7e77bb0add413c1afea457aea',
    callbackURL: "/auth/facebook/callback/",
    profileFields: ['id', 'displayName', 'link', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(async function () {
      //Check whether the User exists or not using profile.id
      const { id, displayName } = profile
      console.log(displayName)
     
      await User.findOneAndUpdate({email: 'tester@gmail.com'}, {facebookId: id, facebookAccessToken: accessToken}, {new: true})

    });
  }
));
}


export function lkdinLogin(passport){
  passport.use(new LinkedInStrategy({
  clientID: '77xvm70p4sz6c1',
  clientSecret: 'NiPl6s2lVOVvKSge',
  callbackURL: "/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, cb) {
  // asynchronous verification, for effect...
  process.nextTick(async function () {
    const {id  } = profile
     await User.findOneAndUpdate({email: 'tester@gmail.com'}, {linkedinId: id, linkedinAccessToken: accessToken}, {new: true})
  });
}));
}

export function twitterLogin(passport) {

passport.use(new TwitterStrategy({
    consumerKey: 'n31f9u6tB2advZKXYJUcPmLdv',
    consumerSecret: 'oFJTAwGGFHEIvOIl0vHcoqaugB6wG0NbIQoM5Jnt58ZOZpqKcA',
    callbackURL: "/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    console.log(profile)
  }

));
}

// Passport session setup.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


