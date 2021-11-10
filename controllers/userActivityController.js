import mongoose from 'mongoose'
import Brand from '../models/Brand.js'
import Lead from '../models/Lead.js'
import User from '../models/User.js'
import Message from '../models/Message.js'
import Content from '../models/ContentHijacked.js'
import Video from '../models/VideoHijacked.js'

export const user ={
    getBrands: async function(req, res){
        try{
            const user = await User.findById({_id: req.authenticatedUser.id})

            const id = user._id
           if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);

           const { brands } = await User.findById(id).populate('brands')

           return res.status(200).json({brands}) 

        }catch(err){
            console.log(err.message)
        }
    },
   
    postBrand: async function(req, res){
        try{
            const newBrand = new Brand(req.body)

           const userId = await User.findById({_id: req.authenticatedUser.id})
           const id  = userId._id
          if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);
           const brand = await newBrand.save()
          
            const userBrand = await User.findById(id).populate('brands').select('-password')
             userBrand.brands.push(brand) 

             await userBrand.save()
            
          res.status(201).json({brands: userBrand.brands})
        console.log(id)
        
        }catch(err){
            console.log(err.message)
        }
    },
    getMessages: async function(req, res){
        
        try{
            const user = await User.findById({_id: req.authenticatedUser.id})

            const id = user._id
           if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);

           const { messages } = await User.findById(id).populate('messages')

           return res.status(200).json({messages}) 

        }catch(err){
            console.log(err.message)
        }
    },
    postMessage: async function(req, res){
        try{
           
            const newMessageContent = new Message(req.body)
            console.log(req.body)

           const userId = await User.findById({_id: req.authenticatedUser.id})
           const id  = userId._id
           if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);
            const message = await newMessageContent.save()
          
            const userMessages = await User.findById(id).populate('messages')
            userMessages.messages.unshift(message) 

             await userMessages.save()
            
           res.status(201).json({messages: userMessages.messages})
      
        }catch(err){
            console.log(err.message)
        }
      

    },
    deleteBrand: async function(req, res){
        try{

            const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Brand with id: ${id}`);
        await Brand.findByIdAndRemove(id)
        res.json({})
      

        }catch(err){
            console.log(err.message)
        }
    },

    getLeads: async function(req, res){
        try{
             const user = await User.findById({_id: req.authenticatedUser.id})

            const id = user._id
           if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);

           const { leads } = await User.findById(id).populate('leads')

           return res.status(200).json(leads) 
        }catch(err){
            console.log(err.message)
        }
        
    },
    postLead: async function(req, res){

        try{
            const newLead = new Lead(req.body)

           const userId = await User.findById({_id: req.authenticatedUser.id})
           const id  = userId._id
           if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);
            const lead = await newLead.save()
          
            const userLead = await User.findById(id).populate('leads')
            userLead.leads.unshift(lead) 

             await userLead.save()
            
           res.status(201).json(userLead)

        }catch(err){
            console.log(err.message)
        }
    },
    deleteLead: async function(req, res){
        try{

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Brand with id: ${id}`);
        await Lead.findByIdAndRemove(id)
        res.json({})
      
        }catch(err){
            console.log(err.message)
        }
    },
    updateProfile: async function(req, res){
        try{
            let userFound = await User.findById(req.authenticatedUser.id)
            
             if (!userFound) return res.status(400).json({success: false, message: 'User not found'})

              userFound = await User.findByIdAndUpdate(userFound._id, req.body, {new: true, runValidators: true, useFindAndModify: true})

             return res.status(200).json({user: userFound})
 
        }catch(err){
            console.log(err.message)
        }
    },
    leadsEmails: async function(req,res){
        try{
            const emailLeads = []
            const user = await User.findById({_id: req.authenticatedUser.id})

            const id = user._id
           if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);

           const { messages } = await User.findById(id).populate('messages').select('baittext')

           for (let i = 0; i < messages.length; i++ ){
               emailLeads.push(messages[i].baittext)
           }
           return res.status(200).json(emailLeads) 

        }catch(err){
            console.log(err.message)
        }
        

    },
    me: async function(req, res){

        try{
            let userFound = await User.findById({_id: req.authenticatedUser._id})
            
            if (!userFound) return res.status(400).json({success: false, message: 'User not found'})

            const userReponse = {
                email: userFound.email,
                name: userFound.name,
                username: userFound.username,
                avatar: userFound.avatar,
            } 
            return res.status(200).json({user: userReponse})
            
        }catch(err){
            console.log(err.message)
        }
    },
    saveHijackedContent: async function(req, res){
            try{
           
            const content = new Content(req.body)

           const userId = await User.findById({_id: req.authenticatedUser.id})
           const id  = userId._id
           if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);
            const contents = await content.save()
          
        const userContents = await User.findById(id).populate('contents')
            userContents.contents.push(contents) 

             await userContents.save()
            
           res.status(201).json({contentData: userContents.contents})
      
        }catch(err){
            console.log(err.message)
        }
    },
    getHijackedContent: async function(req, res){
          try{
             const user = await User.findById({_id: req.authenticatedUser.id})

            const id = user._id
           if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);

           const { contents } = await User.findById(id).populate('contents')

           return res.status(200).json(contents) 
        }catch(err){
            console.log(err.message)
            return res.status(400).json({errors: err.message})
        }
    },
    getSingleContent: async function(req, res){
        try{
            const contentId = req.params.id
           if (!mongoose.Types.ObjectId.isValid(contentId)) return res.status(404).send(`Invalid content id`);
            const content = await Content.findById(contentId)

            res.status(200).json(content)
        }catch(err){
            console.log(err.message)
        } 
    },
    saveVideoHijacked: async function(req, res){
            try{
           
            const video = new Video(req.body)

            const userId = await User.findById({_id: req.authenticatedUser.id})
              const id  = userId._id
              if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);
            const videos = await video.save()
         
          const userVideos = await User.findById(id).populate('videos')
            userVideos.videos.push(videos) 

             await userVideos.save()
            
          res.status(201).json({videos: userVideos.videos})
        
     
        }catch(err){
            console.log(err.message)
        }
    },
    getHijackedVideos: async function(req, res){
          try{

           const  videos  = await Video.find({}) 

           return res.status(200).json(videos) 
        }catch(err){
            console.log(err.message)
        }
    },
    brandAvatar: async function(req, res){
        try{
            const user = await User.findById({_id: req.authenticatedUser.id})

            const userId = user._id
           
            if(userId){
                const brand = await Brand.findById(req.params.id)
                res.status(200).json({avatar: brand.avatar})
            }else{
                res.status(404).json({message: 'action not permitted'})
            }

        }catch(err){
            console.log(err.message)
        }
    },
    hijackedMessage: async function(req, res){
        try{
            const user = await User.findById({_id: req.authenticatedUser.id})

            const userId = user._id
           
            if(userId){
                const savedMessage = await Message.findById(req.params.id)
                res.status(200).json(savedMessage)
            }else{
                res.status(404).json({message: 'action not permitted'})
            }

        }catch(err){
            console.log(err.message)
        }
    },
    getStats: async function(req, res){
        try{
            const user = await User.findById({_id: req.authenticatedUser.id})

            const userId = user._id 

            if(userId){
                 const { contents } = await User.findById(userId).populate('contents')
                 const { messages} = await User.findById(userId).populate('messages')
                const { brands } = await User.findById(userId).populate('brands')

                 console.log(messages.length)
                 res.status(200).json({
                     hijacks: {
                         title: 'Hijacked Content',
                         amount: contents.length
                     },
                     user_messages: {
                        title: 'Messages',
                         amount:messages.length
                        },
                     user_brands: {
                        title: 'Brands',
                         amount:brands.length,
                        }
                 })
            }else{
                res.status(404).json({message: 'action not permitted'})
            }
        }catch(err){
            console.log(err.message)
        }
    }
}
