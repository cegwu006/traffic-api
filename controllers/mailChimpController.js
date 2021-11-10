import axios from 'axios'

const options = {
    instance:'us6',
    uniqueId:'d6dcd7bbb6',
    apiKey: '2a5f00d4090db4e77e91f672db11d50f-us6'
}


export async function addUserToList(req, res){
    
       const { email } = req.body
      
          axios.post(`https://${options.instance}.api.mailchimp.com/3.0/lists/${options.uniqueId}/members/`, {
            status: 'subscribed',
            email_address: email
         }, 
         {
            headers: {
                Authorization: `apikey ${options.apiKey}`
            }
         }
         )
            .then(response => {
                if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                    res.json({message: 'Congrats!'});
                  } else {
                    res.json({message: 'Failed!'});
                  }
            })
            .catch(err => res.json({message: 'Failed!'}))
       
         
}