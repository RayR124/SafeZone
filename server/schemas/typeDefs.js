const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        password: String
        email: String
        member: String
        payment: Int
    }

    type Query {
        users: [User]!
      }

    type LatLong {
        lat: Float
        lng: Float
        businesses: [Business]
      }
    type Business {
        name: String
        address: String
        city: String
        zipcode: String
        image: String
    }
      
    type Auth {
        token: ID!
        user: User
      }

      type LatLong {
        lat: Float
        lng: Float
        businesses: [Business]
      }
      
      type Business {
        name: String!
        address: String
        city: String
        zipcode: String
        image: String
      }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        getLatLong(address: String!): LatLong
        }
`;

module.exports = typeDefs;