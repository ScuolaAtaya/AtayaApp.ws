'use strict'

import morgan from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import errorHandler from 'errorhandler'
import logger from './logger'
import cors from 'cors'
import expressRequestId from 'express-request-id'
import config from './environments'

export default (app) => {

  app.use(new expressRequestId())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(cors({credentials: true, origin: config.cors.origin}))
  app.use(morgan('combined', {'stream': logger.stream}))
  app.use(errorHandler())
}