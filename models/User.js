import  mongoose from 'mongoose'
import  argon2 from 'argon2'
import  jwt from 'jsonwebtoken'

const  { Schema } = mongoose


const userSchema = new Schema({
   
    email: {
        type: String,
        unique: true,
        required: true,
        trim:true,
        lowercase: true
    },
    password:{
        type: String,
        required:  true
    },
    facebookId: String,
    facebookAccessToken: String,
    linkedinId: String,
    linkedinAccessToken: String,
    confirmed: {
        type: Boolean,
        default: false
    },
    confirmationToken: {
        type: String,
        default:''
    },
   
    brands: [{
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    }],
     leads: [{
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    }],
    videos: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],
    contents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Content'
        }
    ],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    name: {
        type: String,
        default: 'Name',
    },
    avatar:{
        type: String,
        default: 'https://i.ibb.co/9ycTC57/image-2021-07-07-165600.png',
    },
    username: {
        type:String,
        default: 'Username',
    }

}, {timestamps: true})

userSchema.methods.hashPassword = async function hashPassword(password){
    try{
        this.password = await argon2.hash(password)
    }catch(err){
        console.log(err.message)
    }
}

userSchema.methods.isValidPassword = async function hashPassword(password){
    try{

    return await argon2.verify(this.password, password)
    }catch(err){
        console.log(err.message)
    }
}

userSchema.methods.genAuthResponse = function genAuthResponse(){
    return {
        email: this.email,
        confirmed: this.confirmation,
        name: this.name,
        username: this.username,
        avatar: this.avatar,
        token: this.genToken(),
    }
}

userSchema.methods.genToken = function authResponse(){
    return jwt.sign({
        id: this._id,
        email: this.email,
        confirmed: this.confirmed,
    }, 'MYSECRET', {expiresIn: '1d'})
}

userSchema.methods.genConfirmationToken = function genConfirmationToken(){
    this.confirmationToken = this.genToken()
}

export default mongoose.model('User', userSchema)
