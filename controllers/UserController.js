import mongoose from 'mongoose'
import User from '../models/User.js'



export const user = {
    signup: async function(req, res, next){
        try{

        const {email, password}  = req.body
        if (!email || !password) return
        const user = await User.findOne({email})
        if (user) return res.status(400).json({message: 'User already exists'})
        const newUser = new User({email})
        newUser.genConfirmationToken()
        await newUser.hashPassword(password)
        await newUser.save()
        return res.status(201).json({user: newUser.genAuthResponse()})
        
        }catch(err){
            return res.status(400).json({errors: {global: err.message}})
        }
    
    },

    login: async function(req, res, next){
        try{
            const {email, password}  = req.body
            if (!email || !password) return
            const userExists = await User.findOne({email})
            if (userExists && await userExists.isValidPassword(password)) return res.status(200).json({user: userExists.genAuthResponse()})
            return res.status(400).json({message: 'Invalid credentials'})
        }catch(err){
            return res.status(400).json({message: err.message})
        }
        
    },
    confirmation: async function(req, res, next){
        try{

        const { token } = req.body

        const user = await User.findOneAndUpdate({confirmationToken: token}, {confirmationToken: '', confirmed: true}, {new: true})
        user ? res.json({user: user}) : res.status(400).json({})
        }catch(err){
            console.log(err.message)
        }

    },

}


