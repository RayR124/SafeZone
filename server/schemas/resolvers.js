const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const axios = require ('axios');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
    //    apiSearch: async () => {
            // fetch request

            // return data
    //    }
    },
    
    Mutation: {
      getLatLong: async (parent, args, ) => {
          const { address } = args;
          const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
          const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;
    
          const response = await axios(url);
          console.log("response data", response.data);
          const location = response.data.results[0].geometry.location;
          return {
            lat: location.lat,
            lng: location.lng
            //next api
          };
        }
  }
};

module.exports = resolvers;