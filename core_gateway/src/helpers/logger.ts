import * as winston from 'winston'
import * as expressWinston from 'express-winston'
import { LoggingWinston as StackdriverTransport } from '@google-cloud/logging-winston'

const colorize = (process.env.NODE_ENV !== 'production')

const requestLogger = expressWinston.logger({
  transports: [
    new StackdriverTransport(),
    new winston.transports.Console({
      json: false,
      colorize
    })
  ],
  expressFormat: true,
  meta: false
})

const errorLogger = expressWinston.errorLogger({
  transports: [
    new StackdriverTransport(),
    new winston.transports.Console({
      json: true,
      colorize
    })
  ]
})

export default {
  requestLogger: requestLogger,
  errorLogger: errorLogger,
  error: winston.error,
  warn: winston.warn,
  info: winston.info,
  log: winston.log,
  verbose: winston.verbose,
  debug: winston.debug,
  silly: winston.silly
}
