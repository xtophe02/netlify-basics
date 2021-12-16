const axios = require('axios');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'only POST method allowed',
    };
  }
  try {
    const { items } = JSON.parse(event.body);
    console.log(items);
    const calculateOrderAmount = (items) => {
      let total = 0;
      let fee = 400;
      items.forEach((el) => (total += el.price));

      return total + fee;
    };
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log(paymentIntent);
    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching images' }),
    };
  }
};
