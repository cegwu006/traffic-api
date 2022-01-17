import dotenv from 'dotenv'
import express from'express'
import DBConnection from'./config/db.js'
import { appMiddlewares } from './middlewares/appMiddlewares.js'

dotenv.config()


const app = express()
app.get('/', (req, res) => res.send('hello world'))
app.get('/testing/', (req, res) => res.send('testing'))


appMiddlewares(app)


const startServer = async (port) => {

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

startServer(process.env.PORT || 5000)
    .catch(err => console.log(err.message))
