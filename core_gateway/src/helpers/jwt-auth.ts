import * as jwt from 'jsonwebtoken'
import { ICoreToken } from '../types/token'

export default class JwtUtils {
  static verifyToken (token, pubKey): Promise<ICoreToken> {
    return new Promise((resolve, reject) => {
      try {
        jwt.verify(token, pubKey, { algorithms: ['RS512'] }, async (err, decoded: ICoreToken) => {
          if (err) { return reject(new Error(`Invalid Token`)) }
          resolve(decoded)
        })
      } catch (e) {
        reject(new Error(e.message))
      }
    })
  }
}
