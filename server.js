import dotenv from 'dotenv'
import express from'express'
import DBConnection from'./config/db.js'
import { appMiddlewares } from './middlewares/appMiddlewares.js'

dotenv.config()


const app = express()
app.get('/', (req, res) => res.send('hello server6'))
app.get('/sample', (req, res) => res.send('sample endpoint created now'))

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
