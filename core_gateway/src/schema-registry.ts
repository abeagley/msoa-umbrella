// GraphQL Tools
import { DirectiveResolverFn, IDirectiveResolvers } from 'graphql-tools/dist/interfaces'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
// import { GraphQLDateTime } from 'graphql-iso-date'
// import { merge } from 'lodash'
import { IResolvers } from 'graphql-yoga/dist/src/types'
import { join as pathJoin } from 'path'
import * as klaw from 'klaw'

export interface IRegistryItems {
  [name: string]: {
    directives?: IDirectiveResolvers<any, any>
    schema: string
    resolvers?: IResolvers[]
  }
}

class SchemaRegistry {
  schemas: IRegistryItems = {
    base: {
      schema: `
        scalar DateTime

        input ById {
          id: String!
        }

        type Query {
          _version: String
        }

        type Mutation {
          _version: String
        }

        type Subscription {
          _version: String
        }
      `
    }
  }
  resolvers: IResolvers[] = []
  directives: IDirectiveResolvers<any, any> = {}

  initApi (): Promise<GraphQLSchema> {
    return new Promise(async (resolve, reject) => {
      try {
        const resolverPaths: string[] = []
        const directivePaths: string [] = []

        klaw(pathJoin(__dirname, 'services'))
          .on('data', (file) => {
            const path = file.path

            if (path.indexOf('.resolver.ts') !== -1) {
              resolverPaths.push(path)
            } else if (path.indexOf('directives.ts') !== -1) {
              directivePaths.push(path)
            }
          })
          .on('end', () => {
            this.resolvers = resolverPaths
              .map((path): IResolvers => require(path).default)
            const directives: DirectiveResolverFn<any, any>[] = directivePaths
              .map((path): DirectiveResolverFn<any, any> => require(path).default)

            let directiveResolvers = {}
            directives.forEach((directive) => {
              directiveResolvers = Object.assign({}, directiveResolvers, directive)
            })

            this.directives = directiveResolvers

            // const schemas = await schemaLoader.load()
            resolve(this._rebuildSchema())
          })
      } catch (e) {
        reject(new Error(e.message))
      }
    })
  }

  updateSchemaRegistry (name: string, schema: string) {
    if (this.schemas.hasOwnProperty(name)) {
      this.schemas[name] = Object.assign({}, this.schemas[name], { schema })
    } else {
      this.schemas[name] = { schema }
    }

    return this._rebuildSchema()
  }

  private _rebuildSchema () {
    const schemas: string[] = Object.keys(this.schemas)
      .map((key) => key)
      .map((key) => this.schemas[key].schema)

    return makeExecutableSchema({
      typeDefs: schemas
      // resolvers: merge(
      //   {
      //     DateTime: GraphQLDateTime
      //   },
      //   ...this.resolvers
      // ),
      // directiveResolvers: this.directives
    })
  }
}

export default new SchemaRegistry()
