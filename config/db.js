import mongoose from 'mongoose'

const connectDB = async() => {
    try{
        const connectedDB = await mongoose
                .connect('mongodb+srv://fred:fred@cluster0.bblz2.mongodb.net/trafficDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true})
                
        if(connectedDB){
            console.log('DB connected on ', connectedDB.connection.host)
            return connectedDB
        }
    }catch(err){
        console.log(err.message)
    }
}

export default connectDB