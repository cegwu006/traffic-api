import mongoose from 'mongoose'

const { Schema } = mongoose

const leadsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true})


export default mongoose.model('Lead', leadsSchema)