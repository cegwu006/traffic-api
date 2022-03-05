import express from 'express'
import helmet  from 'helmet'
import cors from 'cors'
import userRoutes from '../routes/auth.js'
import mailChimpRoute from '../routes/mailchimpRoute.js'
import userActivityRoute from '../routes/userActivity.js'
import profileRoute from '../routes/userRoute.js'
import metrics from 'strong-express-metrics';
import trendsRoute from '../routes/trendsRoute.js'
import chalk from 'chalk'
import compression from 'compression'
import morgan from 'morgan'
import socialAuths from '../routes/socialAuths.js'

export const appMiddlewares = (app) => {
    
    // middlewares
    app.use(express.json({limit: '50mb'}))
    app.use(helmet())
    app.use(cors({
      origin: '*',
      credentials: true
    }))
    app.use(metrics())
    app.use(compression())
    app.use(morgan('dev'))
 

    // routes
    app.use('/api/user', userRoutes)
    app.use('/', socialAuths)

    app.use('/', mailChimpRoute)
    app.use('/api/edit', profileRoute)
    app.use('/api/user/activity', userActivityRoute)
    app.use('/api/trends', trendsRoute)
  
    app.get('/', (req, res) => res.json({msg: 'Hey'}))


    app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError'){
          res.status(401).json({error: err.name + ':' + err.message})
        }
    })

    app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).send();
});

metrics.onRecord(function(data) {
  // simple statsd output
  console.log(chalk.green('url:%s|1|c'), chalk.blue(data.request.url));
  console.log(chalk.green('status:%s|1|c'), chalk.blue(data.response.status));
  console.log(chalk.green('response-time|%s|ms'), chalk.blue(data.response.duration))
}); 

}
