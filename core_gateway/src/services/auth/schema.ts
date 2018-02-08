export const User = `
  # Enums
  enum Role {
    ADMIN
    CLIENT
    CONSUMER
    CONTRACTOR
    CSR
  }

  enum UserStatus {
    ACTIVE
    DISABLED
    INVITED
  }

  # Directives
  directive @isAuthenticated(roles: [Role]) on QUERY

  input AssignRoleToUser {
    id: String!
    role: Role!
  }

  input AuthenticateUser {
    email: String!
    password: String!
  }

  input CreateUser {
    email: String!
    password: String!
  }

  input FindUser {
    id: String
    email: String
  }

  input UpdateUser {
    email: String!
    id: String!
    password: String!
  }

  # Users
  type AuthenticateUserPayload {
    token: String
    user: User
  }

  type User {
    createdAt: DateTime!
    email: String!
    id: String!
    role: Role!
    status: UserStatus!
    updatedAt: DateTime!
  }

  extend type Query {
    currentUser: User @isAuthenticated
    users: [User!]! @isAuthenticated(roles: [ADMIN])
    user(data: FindUser!): User @isAuthenticated(roles: [ADMIN])
  }

  extend type Mutation {
    assignRoleToUser(data: AssignRoleToUser): User @isAuthenticated(roles: [ADMIN])
    authenticateUser(data: AuthenticateUser): AuthenticateUserPayload
    createUser(data: CreateUser!): User
    deleteUser(data: ById!): User @isAuthenticated(roles: [ADMIN])
    updateUser(data: UpdateUser!): User @isAuthenticated(roles: [ADMIN])
  }
`

export default () => [User]
