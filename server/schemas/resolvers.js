const { User } = require('../models');
const axios = require('axios');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
    },
    Mutation: {
        getLatLong: async (parent, args,) => {
            const { address } = args;
            const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;

            const googleResponse = await axios(url);
            console.log("response data", googleResponse.data.results);
            const location = googleResponse.data.results[0].geometry.location;
            const { lat, lng } = location;
            console.log("location", location);

            const YELP_API_KEY = process.env.YELP_API_KEY;
            const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=food&latitude=${lat}&longitude=${lng}`;
            const yelpConfig = {
                headers: {
                    Authorization: `Bearer ${YELP_API_KEY}`
                }
            };

            const yelpResponse = await axios(yelpUrl, yelpConfig);
            const businesses = yelpResponse.data.businesses.map(business => ({
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                zipCode: business.location.zip_code,
                image: business.image_url
            }));
            console.log("Yelp response data", businesses);

            return {
                lat,
                lng,
                businesses
            };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
    }

    //    apiSearch: async () => {
    // fetch rewuest

    // return data
    //    }

};

module.exports = resolvers;