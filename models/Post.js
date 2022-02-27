import mongoose from 'mongoose'
const {  Schema } = mongoose

const postSchema = new Schema({
    user_id : String,
    message : String,
    media : String,
    schedule_time : String,
    page_id : String,
    page_name : String,
    published : Boolean,
    type_of : String,
    publish_id : String
})

export default mongoose.model('Post', postSchema)