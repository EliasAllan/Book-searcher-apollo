
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID!
  username: String!
  email: String!
  bookCount: Int!
  savedbooks: [Book]
}
  type Book {
    bookId: ID!
    authors: [String!]
    description:String!
    image:String
    link:String
    title:String!
  }

  type Auth {
    token: String
    user: [User]
  }
  
  type Query {
    me: [User]
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

    saveBook(author: [String], description: String, title: String!, bookId: String!, image: String, link: String): User
    
    removeBook(bookId: String!): User
  }
  `;
  
  
  module.exports = typeDefs;
  
