import mongoose from 'mongoose'

const { Schema } = mongoose

const videoHijackedSchema = new Schema({
     id: { type: String, required: true },   
     videoImg: { type: String, },  
     ads: {type: String},
     description: {type: String},
     createdBy:{
          type: mongoose.Types.ObjectId, 
          ref: 'User',
          required: [true, 'User must be included']
     }
})


export default mongoose.model('Video', videoHijackedSchema)
