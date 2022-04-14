import dotenv from 'dotenv'
import express from'express'
import DBConnection from'./config/db.js'
import { appMiddlewares } from './middlewares/appMiddlewares.js'
import fs from 'fs'
import https from 'https'
import http from 'http'
import path from 'path'
import {fileURLToPath } from 'url'
import { fbLogin, lkdinLogin, twitterLogin} from './config/passport.js'
import passport from 'passport'
import Twitter from 'twitter-lite'

dotenv.config()

fbLogin(passport)
lkdinLogin(passport)
twitterLogin(passport)

const __filename = fileURLToPath(import.meta.url)
// https options
const __dirname = path.dirname(__filename)

const options = {
        key: fs.readFileSync(__dirname + '/certs/key.pem'),
        cert: fs.readFileSync(__dirname + '/certs/cert.pem'),
}
const client = new Twitter({
  	consumer_key: process.env.TWITTER_KEY,
	consumer_secret: process.env.TWITTER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

const app = express()

// app.use(passport.initialize());
// app.use(passport.session());



app.get('/', (req, res) => res.send('hello world'))
app.get('/testing/', (req, res) => res.send('testing'))



appMiddlewares(app)

app.post('/api/post-tweet', async (req, res) => {
    try{
		await client.post('statuses/update', {status: req.body.tweet})
        return res.status(200).json({msg: "Posted tweet!"})
	}catch(err) {
        console.log(err.message)
        return res.status(400).json({msg: "Failed to  tweet!"})
	}
})

const isHttps = false

const startServer = async(port) => {
    try{
        await DBConnection()
        if (isHttps) {
         return https.createServer(options, app)
            .listen(port, () => console.log('server started ', port))

        }else{
            return http.createServer(app)
                .listen(port, () => console.log('server started ', port))
        }
    }catch(err){
        console.log(err.message)
    }
}


startServer(process.env.PORT || 5000)