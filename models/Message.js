import mongoose from 'mongoose'
const { Schema } = mongoose

const messageSchema = new Schema({

  message: {type: String,},
  color: {type: String,},
  style: {type: String},
  tarfficSent: {type: String},
  SocialPageUrl: {type: String},
  autoResponder: {type: String},
  autoResponder: {type: String},
  baittext: {type: String},
  successmsg: {type: String},
  preferredName: {type: String},
  signupText: {type: String},
  successMessage: {type: String},

})


export default mongoose.model('Message', messageSchema)