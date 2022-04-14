import mongoose from 'mongoose'
import Brand from '../models/Brand.js'
import Lead from '../models/Lead.js'
import User from '../models/User.js'
import Message from '../models/Message.js'
import Content from '../models/ContentHijacked.js'
import Video from '../models/VideoHijacked.js'
import SibApiV3Sdk  from 'sib-api-v3-sdk'
import client from '@sendgrid/client'
import VideoHijacked from '../models/VideoHijacked.js'

client.setApiKey('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');

var defaultClient = SibApiV3Sdk.ApiClient.instance

var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

var apiInstance = new SibApiV3Sdk.ContactsApi();

export const user ={
     getBrands: async function(req, res){
        try{
            const { authenticatedUser: {id}} = req
            const brands = await Brand.find({brandOwner: req.authenticatedUser.id})
            
            return res.status(200).json({brands})
        }catch(err){
            console.log(err.message)
            return res.status(400).json({msg: 'something went wrong while fetching brands'})
        }
    },
    postBrand: async function(req, res){
        try{
            req.body.brandOwner = req.authenticatedUser.id
            const brand = await Brand.create(req.body)
            res.status(201).json({brand})

        }catch(err){
            console.log(err.message)
            return res.status(400).json({msg: 'something went wrong while creating brand'})
        }
    },
    getMessages: async function(req, res){
        
        try{
            const { authenticatedUser: {id}} = req
            const messages = await Message.find({createdBy: req.authenticatedUser.id})

           return res.status(200).json({messages}) 

        }catch(err){
            console.log(err.message)
            return res.status(400).json({msg: 'something went wrong while creating message'})
        }
    },
    postMessage: async function(req, res){
        try{
        //     req.body.createdBy = req.authenticatedUser.id
        //     const message = await Message.create(req.body)
        //    return res.status(201).json({message})
      
        return res.status(201).json(req.body)
        }catch(err){
            console.log(err.message)
            return res.status(400).json({msg: 'something went wrong while creating brand'})
        }
      

    },
    deleteBrand: async function(req, res){
        try{
      
            const brand = await Brand.findByIdAndRemove({
                _id: req.params.id,
                brandOwner: req.authenticatedUser.id
            })

            return res.status(200).json({})

        }catch(err){
            console.log(err.message)
            return res.status(400).json({msg: 'something went wrong while deleting brand'})
        }
    },

    deleteHijackContent: async function(req, res){
        try{
      
            const content = await Content.findByIdAndRemove({
                _id: req.params.id,
                createdBy: req.authenticatedUser.id
            })

            return res.status(200).json({})

        }catch(err){
            console.log(err.message)
            return res.status(400).json({msg: 'something went wrong while deleting brand'})
        }
    },
    deleteMessage: async function(req, res){
        try{
      
            const message = await Message.findByIdAndRemove({
                _id: req.params.id,
                createdBy: req.authenticatedUser.id
            })

            return res.status(200).json({})

        }catch(err){
            console.log(err.message)
            return res.status(400).json({msg: 'something went wrong while deleting brand'})
        }
    },

    getLeads: async function(req, res){
        try{
             const leads = await Lead.find({ owner: req.authenticatedUser.id })
             return res.status(200).json({ leads, count: leads.length })
        }catch(err){
            console.log(err.message)
        }
        
    },
    postLead: async function(req, res){

        try{
            req.body.ownder = req.authenticatedUser.id
            const lead = await Lead.create(req.body)
            res.status(201).json({lead})            

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

        req.body.createdBy = req.authenticatedUser.id
        const content = await Content.create(req.body)
        return res.status(201).json({contentData: content})

    }catch(err){
        console.log(err.message)
    }
},
    getHijackedContent: async function(req, res){
          try{
            const { authenticatedUser: {id}} = req
            const hijackedContents = await Content.find({createdBy: req.authenticatedUser.id})
           
            return res.status(200).json({hijackedContents})
        }catch(err){
            console.log(err.message)
            return res.status(400).json({errors: err.message})
        }
    },
    getSingleContent: async function(req, res){
        try{
           const { authenticatedUser: {id}, params: {contentId} } = req
           
           const content = await Content.findOne({_id: contentId, createdBy: id})
           
           if (content) return res.status(200).json(content)
           return res.status(400).json({msg: "invalid content"})
           
        }catch(err){
            console.log(err.message)
        }
    },
    saveVideoHijacked: async function(req, res){
            try{
           

        req.body.createdBy = req.authenticatedUser.id
        const videos = await Video.create(req.body)
        res.status(201).json({videos: videos})
        
     
        }catch(err){
            console.log(err.message)
        }
    },
    getHijackedVideos: async function(req, res){
        try{
            const { authenticatedUser: {id}} = req
            const videos = await VideoHijacked.find({createdBy: req.authenticatedUser.id})
            console.log(videos.length)
            
            return res.status(200).json({videos})
        }catch(err){
            console.log(err.message)
            return res.status(400).json({msg: 'something went wrong while fetching brands'})
        } 
    },

    getVideo: async function(req, res) {
        try{

        const { authenticatedUser: {id}} = req
        const video = await VideoHijacked.findOne({_id: req.params.id, createdBy: req.authenticatedUser.id})

        if (video) {
            
            return res.stauts(400).json(video)
        }else{

            return res.status(400).json({msg: "no video found"})
        }
        }catch(err){
            console.log(err.message)
        }
    },
    postLead: async function(req, res){
        try{
            req.body.owner = req.authenticatedUser.id
            const lead = await Lead.create(req.body)
            res.status(201).json({lead})

        }catch(err){
            console.log(err.message)
            return res.status(400).json({msg: 'something went wrong while creating brand'})
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
                return res.status(404).json({message: 'action not permitted'})
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
    },
    uploadUserAvatar: async function(req, res, next){
        try{
            const { authenticatedUser: {id}} = req
            
            const user = await User.findOne({_id: id})
            if (user) {
                user.avatar = req.file.path
                await user.save()
                return res.status(200).json({picture: req.file.path})
                
            }else{
                return res.status(400).json('No user found');
            }

        
        }catch(err){
            console.log(err.message)
        }
    },
    subscribeSendiBlue: async function(req, res, next){
        var createContact = new SibApiV3Sdk.CreateContact(); // CreateContact | Values to create a contact
        createContact = { 'email' :req.body.email };

    apiInstance.createContact(createContact).then(function(data) {
        return res.status(200).json({msg: 'successfully subscribed'})
    }, function(error) {
    console.error(error);
    });
},
sendGrid: async function(req, res, next) {
const data = {
  "email": req.body.email
};

const request = {
  url: `/v3/marketing/lists`,
  method: 'POST',
  body: data
}

client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
    return res.status(200).json({msg: 'successfully subscribed'})
  })
  .catch(error => {
    console.error(error);
  });

}

}
