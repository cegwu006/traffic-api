import mongoose from 'mongoose'
const { Schema } = mongoose

const messageSchema = new Schema({

  message: {type: String,},
  email: {type: String},
  color: {type: String,},
  style: {type: String},
  tarfficSent: {type: String},
  SocialPageUrl: {type: String},
  autoResponder: {type: String},
  baittext: {type: String},
  successmsg: {type: String},
  name: {type: String},
  signupText: {type: String},
  successMessage: {type: String},

  createdBy: {
    type: mongoose.Types.ObjectId, 
    ref: 'User',
    required: [true, 'User Must be Included']
  }

})


export default mongoose.model('Message', messageSchema)
