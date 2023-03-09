const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
require('dotenv').config();
const db = require("./config/connection");

const app = new express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const stripe = require('stripe')('sk_test_51Mgh8NGGno84ND8L78IKd03OnvFmjQyoMCj4p3v0MPWOyKMy99wM9CU4HMzZYhGCrISbTVxSGuc7Zb9hnArIl9cc00ct3Tb9VX');
const YOUR_DOMAIN = 'http://localhost:3000';
const price_id = 'price_1MiVhgGGno84ND8Lt0DEwfqQ'

app.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

// try {
//   const session = await stripe.checkout.sessions.create({
//     mode: "subscription",
//     line_items: [
//       {
//         price: price_id,
//         quantity: 1,
//       },
//     ],
//     // On Success the user will return here
//     success_url: `http://localhost:3000`,
//     cancel_url: `http://localhost:3000/membership`,
//     // automatic_tax: { enabled: true }
//   });
//   return res.redirect(303, session.url);
// } catch (e) {
//   res.status(400);
//   return res.send({
//     error: {
//       message: e.message,
//     },
//   });
// }

app.post('/create-portal-session', async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_3e04e927d4137714e62a17f1b7e4ef4e8478a5b961f27e7726a6b874caf5b1d6";

app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      if (paymentIntentSucceeded === 'payment_intent.succeeded') {
        console.log("its working, they paid")
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


startApolloServer(typeDefs, resolvers);


