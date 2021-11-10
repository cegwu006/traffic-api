import cacheNode from 'node-cache'

const cache = new cacheNode()

export default function cacheRoutes(time){
    return function(req, res, next){
        if (req.method !== 'GET'){
            console.log('Cannot resolver request')
            return next();
        }
    
        const key = req.originalUrl
        const cachedResponse = cache.get(key)
    
        if (cachedResponse){
            console.log('Cached', key)
            res.send(cachedResponse)
        }else{
            console.log('Cache not there yet!')
            res.originalSend = res.send
            res.send = body => {
                res.originalSend(body)
                cache.set(key, body, time)
            }
    
            next()
        }
    }
}