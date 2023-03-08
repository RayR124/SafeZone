const stripe = require('stripe')('sk_test_51Mgh8NGGno84ND8L78IKd03OnvFmjQyoMCj4p3v0MPWOyKMy99wM9CU4HMzZYhGCrISbTVxSGuc7Zb9hnArIl9cc00ct3Tb9VX');
const priceId = '{{PRICE_ID}}';

const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');

const mainRouter = require("./controllers");
const db = require("./config/connection");

const app = new express();
const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../community-compass/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../community-compass/build/index.html'));
});


const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };

//Stripe

app.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.post("/create-checkout-session", async (req, res) => {
//  const domainURL = process.env.DOMAIN;
  const { priceId } = '{{PRICE_ID}}';

  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the form
  // [automatic_tax] - to automatically calculate sales tax, VAT and GST in the checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,

        },
      ],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `http://localhost:3000`,
      cancel_url: `http://localhost:3000/membership`,
      // automatic_tax: { enabled: true }
    });

    return res.redirect(303, session.url);
  } catch (e) {
    res.status(400);
    return res.send({
      error: {
        message: e.message,
      }

    });

  }
  
});



  startApolloServer(typeDefs, resolvers);

  
