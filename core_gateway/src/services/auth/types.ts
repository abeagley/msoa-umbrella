export const IUserRoles = [
  'ADMIN',
  'CLIENT',
  'CONSUMER',
  'CONTRACTOR',
  'CSR'
]

export interface IUser {
  createdAt?: Date
  email?: string
  id?: string
  password?: string
  role?: string
  status?: string
  updatedAt?: Date
}

export interface IUserAuthResponse {
  token: string | null
  user: IUser | null
}

export interface IUserCreateFields {
  email: string
  password: string
  role?: string
}

export interface IUserCredentials {
  email: string
  password: string
}

export interface IUserId {
  id: string
}

export interface IUserListRequest {
  filters: IUser,
  limit?: number,
  offset?: number
}

export interface IUserListResponse {
  users: IUser[],
  limit?: number,
  offset?: number,
  total?: number
}

export interface IUserUpdateFields extends IUserId {
  email?: string
  password?: string
  role?: string
}

export interface ICoreAuthClient {
  authenticateUser (credentials: IUserCredentials): Promise<IUserAuthResponse>
  createUser (data: IUserCreateFields): Promise<IUser | null>
  deleteUser (data: IUserId): Promise<IUser | null>
  getUser (data: IUserId): Promise<IUser | null>
  getUsers (request: IUserListRequest): Promise<IUserListResponse>
  updateUser (data: IUserUpdateFields): Promise<IUser | null>
}
