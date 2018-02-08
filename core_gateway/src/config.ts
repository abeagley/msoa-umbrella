import { resolve as pathResolve } from 'path'

export default {
  PROTO_PATH: (process.env.NODE_ENV === 'production') ? '/protos' : pathResolve(__dirname, '..', '..', 'go_rpc')
}
