import { IServiceContext } from '../../helpers/types/service-context'
import JwtUtils from '../../helpers/jwt-auth'
import logger from '../../helpers/logger'

const { JWT_PUBLIC_KEY } = process.env

export default {
  isAuthenticated (next, _src, args, context: IServiceContext) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!context || !context.token) {
          return reject(new Error('Unauthorized'))
        }

        const decodedToken = await JwtUtils.verifyToken(context.token, JWT_PUBLIC_KEY as string)
        context.decodedToken = decodedToken

        if (!args || !args.roles) {
          return resolve(next())
        }

        const authResult = args.roles.indexOf(decodedToken.role)

        if (authResult === -1) {
          return reject(new Error('Insufficient Permissions'))
        }

        resolve(next())
      } catch (e) {
        logger.log('error', e.message)
        reject(new Error('An Unexpected Error Occurred'))
      }
    })
  }
}
