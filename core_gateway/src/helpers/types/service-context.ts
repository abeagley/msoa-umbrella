import { ICoreToken } from './token'

export interface IServiceContext {
  decodedToken?: ICoreToken
  token: string
}
