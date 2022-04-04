const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type Query {
    "Find the logged in user."
    me: User
    users: [User]
    user(username: String!): User
    plants: [Plant]
    plantsByZipcode(zipCode: Int!): [Plant]
    plant(plantId: ID!): Plant
  }

  type Mutation {
    createUser(email: String!, password: String!, username: String!): Auth
    login(email: String!, password: String!): Auth
    addFavorite(plantId: ID!): User
    removeFavorite(plantId: ID!): User
    addPlant(plantDescription: String!, plantName: String!, plantAuthor: String!, plantImage: String!, zipCode: Int!): Plant
    addComment(plantId: ID!, commentText: String!, commentAuthor: String!): Plant
    removePlant(plantId: ID!): Plant
    removeComment(plantId: ID!, commentId: ID!): Plant
  }

  type Auth {
    token: String!
    user: User!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    plants: [Plant]
    favorites: [Plant]
  }

  type Plant {
    _id: ID
    plantDescription: String!
    plantName: String!
    plantAuthor: String!
    plantImage: String!
    zipCode: Int!
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String!
    commentAuthor: String!
  }
`;

module.exports = typeDefs;
