import {
//   GraphQLEnumType,
//   GraphQLInterfaceType,
  GraphQLObjectType,
//   GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean
} from 'graphql/type';

import {
  GraphQLEmail,
//   GraphQLURL,
//   GraphQLDateTime,
  GraphQLLimitedString,
  // GraphQLPassword
} from 'graphql-custom-types'; // https://github.com/stylesuxx/graphql-custom-types

import {
  createUser
} from './dynamoDB';

/* -------*/
/* MODELS */
/* -------*/

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user.', // Inspired
  fields: {
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
    verified: {
      type: GraphQLBoolean,
      description: "Indicates if the user's email has been verified.",
    },
  },
});

/* --------*/
/* QUERIES */
/* --------*/

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    
    // readUser query example:
    // { user(id: \"100\") { id, email, username, passwordHash }  }
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
  }
});


/* ----------*/
/* MUTATIONS */
/* ----------*/

const getMutationType = sourceIp => new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    
    // createUser query example:
    // mutation createUser { user: createUser (username: \"coco75\", password: \"12345678\", email: \"abc@mail.com\") { id, username, email } }
    createUser: {
      type: userType,
      description: 'Create a new user.',
      args: {
        username: {
          type: new GraphQLLimitedString(3, 15, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-')
        },
        email: {
          type: new GraphQLNonNull(GraphQLEmail)
        },
        password: {
          type: new GraphQLLimitedString(8) // GraphQLPassword is overkill
        },
      },
      resolve: (source, args) => createUser(args, sourceIp),
    }
  }
});


/* -------*/
/* SCHEMA */
/* -------*/

export default function getSchema(sourceIp) {
  return new GraphQLSchema({
    query: queryType,
    mutation: getMutationType(sourceIp), // For every mutation, the issuer ip is recorded
  });
}
