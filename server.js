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

const app = express()

// app.use(passport.initialize());
// app.use(passport.session());


app.get('/', (req, res) => res.send('hello world'))
app.get('/testing/', (req, res) => res.send('testing'))



appMiddlewares(app)

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