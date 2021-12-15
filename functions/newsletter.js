const axios = require('axios');
require('dotenv').config();

const API_ROOT = 'https://api.buttondown.email/v1/subscribers';

exports.handler = async (event, context) => {
  const method = event.httpMethod;
  if (method !== 'POST') {
    throw new Error('only POST is allowed');
  }
  try {
    const { email } = JSON.parse(event.body);

    const { data } = await axios.post(
      API_ROOT,
      { email },
      {
        headers: {
          Authorization: `Token ${process.env.BUTTONDOWN_EMAIL_API_KEY}`,
        },
      }
    );
    console.log(data);
    return { statusCode: 201, body: JSON.stringify('data') };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error.response.data),
    };
  }
};
