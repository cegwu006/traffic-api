import  mongoose from 'mongoose'

const { Schema } = mongoose

const contentHijackedSchema = new Schema({
     brand_img: { type: String, },   
     trend_img: { type: String, required: true },   
     link: { type: String, required: true },   
     message: { type: String, },   
     title: {type: String, required: true},
     messageStyle: {type: String}
})


export default mongoose.model('Content', contentHijackedSchema)

