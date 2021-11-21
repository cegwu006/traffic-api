import mongoose from 'mongoose'
const { Schema } = mongoose

const brandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide Brand name']
    },
    slogan: {
        type: String,
        required: [true, 'Please provide Brand slogan']
    },
    avatar: String,
    brandOwner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User must be included']
    }
}, {timestamps: true})


export default mongoose.model('Brand', brandSchema)
