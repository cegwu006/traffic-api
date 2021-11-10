import dotenv from 'dotenv'
import express from'express'
import DBConnection from'./config/db.js'
import { appMiddlewares } from './middlewares/appMiddlewares.js'

dotenv.config()

// process.on('uncaughtException', (err) => {
//     console.log('ERROR exception:', err.message)
//     process.exit(1)
// })

const app = express()
app.get('/', (req, res) => res.send('hello server'))

appMiddlewares(app)

const port = process.env.PORT || 5000

const startServer = async () => {
try{
    if (await DBConnection()){
        app.listen(port, (err) => {
            if (err) return
            console.log(`server started on port ${port}`)
     })
    } 
}catch(err){
    console.log(err.message)
}
}

startServer()
    .catch(err => console.log(err.message))