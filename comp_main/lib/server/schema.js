import {
//   GraphQLEnumType,
//   GraphQLInterfaceType,
  GraphQLObjectType,
//   GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
} from 'graphql/type';

import {
  GraphQLEmail,
//   GraphQLURL,
//   GraphQLDateTime,
  GraphQLLimitedString,
  // GraphQLPassword
} from 'graphql-custom-types';

/* -------*/
/* MODELS */
/* -------*/

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user.', // Inspired
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The id of the user.',
    },
    username: {
      type: GraphQLString,
      description: 'The username of the user.',
    },
    email: {
      type: GraphQLString,
      description: 'The email of the user.',
    },
    passwordHash: {
      type: GraphQLString,
      description: 'The hashed password of the user.',
    },
  }),
});

/* --------*/
/* QUERIES */
/* --------*/

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    user: {
      description: 'Get user by id.',
      type: userType,
      args: {
        id: {
          description: 'id of the user.',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { id }) => ({
        id,
        username: 'admin',
        email: 'admin@admin.com',
      }),
    },
  })
});


/* ----------*/
/* MUTATIONS */
/* ----------*/

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: userType,
      description: 'Create a new user.',
      args: {
        username: {
          type: new GraphQLLimitedString(3, 15, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-')
        },
        email: {
          // type: new GraphQLPassword(/*...*/)
          type: GraphQLEmail
        },
        password: {
          // type: new GraphQLPassword(/*...*/)
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve: (source, args) => args,
    }
  }
});


/* -------*/
/* SCHEMA */
/* -------*/

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
