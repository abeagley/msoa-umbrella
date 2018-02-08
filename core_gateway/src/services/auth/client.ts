import { join as pathJoin } from 'path'
import { ICoreAuthClient } from './types'
import config from '../../config'

const caller = require('grpc-caller')
const PROTO_PATH = pathJoin(config.PROTO_PATH, 'core-auth.proto')
const { MSOA_AUTH_HOST, MSOA_AUTH_PORT } = process.env

export default caller(`${MSOA_AUTH_HOST}:${MSOA_AUTH_PORT}`, PROTO_PATH, 'CoreAuth') as ICoreAuthClient
