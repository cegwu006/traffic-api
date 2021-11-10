import mongoose from 'mongoose'
const { Schema } = mongoose


const profileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: String,
    },
    avatar:{
        type: String
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
    
})



export default mongoose.model('Profile', profileSchema)