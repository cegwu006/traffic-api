import mongoose from 'mongoose'
const { Schema } = mongoose

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slogan: {
        type: String,
        required: true
    },
    avatar: String,
    brandOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})


export default mongoose.model('Brand', brandSchema)