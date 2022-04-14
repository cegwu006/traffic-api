import { Router } from 'express'
import { addUserToList } from '../controllers/mailChimpController.js'
import request from 'superagent'
import querystring from 'querystring'

const router  = Router()

const options = {
    instance: 'us6',
    uniqueId:'d6dcd7bbb6',
    apiKey:'2a5f00d4090db4e77e91f672db11d50f-us6',
}

const clientID = MAIL_CHIMP_ID
const clientSecret = process.env.MAIL_CHIMP_SECRET



router.post('/user', addUserToList)

router.get('/api/v1/mailchimp/auth/authorize',(req, res) => {
    res.redirect('https://login.mailchimp.com/oauth2/authorize?' +
           querystring.stringify({
               'response_type': 'code',
               'client_id': clientID,
               'redirect_uri': 'http://127.0.0.1:5000/api/v1/mailchimp/auth/callback'
           }));
})

router.get('/api/v1/mailchimp/auth/authorize',(req, res) => {
    res.redirect('https://login.mailchimp.com/oauth2/authorize?' +
           querystring.stringify({
               'response_type': 'code',
               'client_id': clientID,
               'redirect_uri': 'http://127.0.0.1:5000/api/v1/mailchimp/auth/callback'
           }));
})


router.get('/api/v1/mailchimp/auth/callback', function(req, res) {
 request.post('https://login.mailchimp.com/oauth2/token')
        .send(querystring.stringify({
           'grant_type': 'authorization_code',
           'client_id': clientID,
           'client_secret': clientSecret,
           'redirect_uri': 'http://127.0.0.1:5000/api/v1/mailchimp/auth/callback',
           'code': req.query.code
         }))
           .end((err, result) => {
               if (err) {
                   res.send('An unexpected error occured while trying to perform MailChimp oAuth');
               } else {
                 // we need to get the metadata for the user
                 request.get('https://login.mailchimp.com/oauth2/metadata')
                   .set('Accept', 'application/json')
                   .set('Authorization', 'OAuth ' + result.body.access_token)
                       .end((err, metaResult) => {
                           if (err) {
                               res.send('An unexpected error occured while trying to get MailChimp meta oAuth');
                           } else {
                               // save the result.body.access_token
                               // save the metadata in metaResult.body
                               // against the current user
                               var mailchimpConf = metaResult;
                               mailchimpConf.access_token = result.body.access_token;
                               res.redirect('/pick-a-list.html?email=' + mailchimpConf.body.login.email)
                               console.log(req.body.access_token)
                               console.log(result.body.access_token)
                           }
                       });
               }
           });

});


router.get('/mailchimp/lists', (req, res) => {
 request.get('https://us6.api.mailchimp.com' + '/3.0/lists')
               .set('Accept', 'application/json')
               .set('Authorization', 'OAuth ' + '535861d5435f64527a78ae2e6aa59c81')
                   .end((err, result) => {
                       if (err) {
                           res.status(500).json(err);
                       } else {
                           res.json(result.body.lists);
                       }
                   });
})


router.get('/mailchimp/list/members/:id', function(req, res) {

 request.get('https://us6.api.mailchimp.com' + '/3.0/lists/' + req.params.id + '/members')
               .set('Accept', 'application/json')
               .set('Authorization', 'OAuth ' + '535861d5435f64527a78ae2e6aa59c81')
                   .end((err, result) => {
                       if (err) {
                           res.status(500).json(err);
                       } else {
                           res.json(result.body.members);
                       }
                   });
});




export default router