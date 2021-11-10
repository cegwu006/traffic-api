import mongoose from 'mongoose'

const { Schema } = mongoose

const videoHijackedSchema = new Schema({
     id: { type: String, required: true },   
     videoImg: { type: String, },  
     owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    } 
})


export default mongoose.model('Video', videoHijackedSchema)
