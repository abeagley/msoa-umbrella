import { IResolvers } from 'graphql-yoga/dist/src/types'
import { IServiceContext } from '../../../helpers/types/service-context'
import { IGenericData } from '../../../helpers/types/generic'
import { IUser, IUserCreateFields, IUserListRequest, IUserAuthResponse, IUserCredentials,
  IUserId, IUserUpdateFields } from '../types'
import logger from '../../../helpers/logger'
import { clone } from 'lodash'

import authClient from '../client'

export default {
  Query: {
    currentUser (_doc, _args, context: IServiceContext, info): Promise<IUser | null> {
      return new Promise(async (resolve, reject) => {
        try {
          console.log(context)

          if (!context.decodedToken) {
            return reject(new Error('Invalid user id'))
          }

          const user = await authClient.getUser({ id: context.decodedToken.id })
          resolve(user)
        } catch (e) {
          logger.log('error', e)
          reject(new Error(e.message))
        }
      })
    },

    users (_doc, args: IGenericData<IUserListRequest>, context: IServiceContext, _info): Promise<IUser[]> {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await authClient.getUsers(clone(args.data))
          resolve(resp ? resp.users : [])
        } catch (e) {
          reject(new Error(e.message))
        }
      })
    },

    user (_doc, args: IGenericData<IUserId>, _context, _info): Promise<IUser | null> {
      return new Promise(async (resolve, reject) => {
        try {
          const user = await authClient.getUser(clone(args.data))
          resolve(user)
        } catch (e) {
          reject(new Error(e.message))
        }
      })
    }
  },

  Mutation: {
    assignRoleToUser (_doc, args: IGenericData<IUser>, _context: IServiceContext, _info): Promise<IUser | null> {
      return new Promise(async (resolve, reject) => {
        try {
          const updatedUser = await authClient.updateUser(clone(args.data))
          resolve(updatedUser)
        } catch (e) {
          reject(new Error(e.message))
        }
      })
    },

    authenticateUser (_doc, args: IGenericData<IUserCredentials>, _context: IServiceContext, _info): Promise<IUserAuthResponse> {
      return new Promise(async (resolve, reject) => {
        try {
          const resp = await authClient.authenticateUser(clone(args.data))
          resolve(resp)
        } catch (e) {
          reject(new Error(e.message))
        }
      })
    },

    createUser (_doc, args: IGenericData<IUserCreateFields>, _context, _info): Promise<IUser | null> {
      return new Promise(async (resolve, reject) => {
        try {
          const createdUser = await authClient.createUser(clone(args.data))
          resolve(createdUser)
        } catch (e) {
          reject(new Error(e.message))
        }
      })
    },

    deleteUser (_doc, args: IGenericData<IUserId>, _context, _info): Promise<IUser | null> {
      return new Promise(async (resolve, reject) => {
        try {
          const deletedUser = await authClient.deleteUser(clone(args.data))
          resolve(deletedUser)
        } catch (e) {
          reject(new Error(e.message))
        }
      })
    },

    updateUser (_doc, args: IGenericData<IUserUpdateFields>, _context, _info): Promise<IUser | null> {
      return new Promise(async (resolve, reject) => {
        try {
          const updatedUser = await authClient.updateUser(clone(args.data))
          resolve(updatedUser)
        } catch (e) {
          reject(new Error(e.message))
        }
      })
    }
  }
} as IResolvers
