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
  createUser,
  readUserByEmailOrUsername,
} from '../dynamodb';

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
    isVerified: {
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
    // { readUser(id: \"100\") { id, email, username, passwordHash }  }
    readUser: {
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
        username: 'to_be_implemented',
        email: 'admin@admin.com',
      }),
    },
    // readUserByEmailOrUsername query example:
    // { readUserByEmailOrUsername(emailOrUsername: \"coco75\") { id, email, username, passwordHash }  }
    readUserByEmailOrUsername: {
      description: 'Get user by id.',
      type: userType,
      args: {
        emailOrUsername: {
          description: 'email or username of the user.',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { emailOrUsername }) => readUserByEmailOrUsername(emailOrUsername),
    },
  }
});


/* ----------*/
/* MUTATIONS */
/* ----------*/

const mutationType = new GraphQLObjectType({
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
      resolve: (root, args) => createUser(args, root.sourceIp),
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
