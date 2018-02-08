import { GraphQLServer, Options } from 'graphql-yoga'
import { IServiceContext } from './helpers/types/service-context'
import logger from './helpers/logger'
import * as bodyparser from 'body-parser'

import schemaRegistry from './schema-registry'

const { NODE_ENV, MSOA_PROD_PORT, MSOA_GATEWAY_PORT, MSOA_REG_KEY } = process.env

if (NODE_ENV === 'production') {
  require('@google-cloud/trace-agent').start()
  require('@google-cloud/debug-agent').start()
}

async function run () {
  try {
    const schema = await schemaRegistry.initApi()

    const options = {
      port: (NODE_ENV === 'production') ? MSOA_PROD_PORT : MSOA_GATEWAY_PORT,
      endpoint: '/graphql',
      subscriptions: '/subscriptions',
      playground: (process.env.NODE_ENV === 'production') ? false : '/playground'
    } as Options

    const server = new GraphQLServer({
      schema,
      context: (type): IServiceContext => ({
        token: type.request.headers.authorization as string
      })
    })

    server.express.use(logger.requestLogger)
    server.express.use(logger.errorLogger)

    server.express.post('/service-registry', bodyparser.json(), async (req, res) => {
      const data = req.body as { token: string, schema: string, service: string }

      if (!data || data === {} || !data.hasOwnProperty('token') || data.token !== MSOA_REG_KEY) {
        return res.sendStatus(401)
      }

      // Update GraphQL Schema
      server.executableSchema = schemaRegistry.registerSchema(data.service, data.schema)

      return res.send(200)
    })

    server.start(options,() =>
      logger.log('info', `Server started, listening on port ${options.port} for incoming requests.`))
  } catch (e) {
    logger.log('error', 'Unable to boot gateway service:', e.message)
  }
}

run()
