const axios = require('axios');
require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_APIKEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    throw new Error('only POST method allowed');
  }
  const values = JSON.parse(event.body);

  for (let key of Object.values(values)) {
    // here you can add filtering conditions
    if (key.trim() === '') {
      return {
        statusCode: 400,
        body: JSON.stringify({ body: 'Fields cannot be empty' }),
      };
    } else {
      try {
        const msg = {
          to: values.email, // Change to your recipient
          from: 'christophe.moreira@outlook.com', // Change to your verified sender
          subject: values.subject,
          // text: 'and easy to do anywhere, even with Node.js',
          html: `
    <p>Hello Good Friend!</p>
    <p>${values.message}</p>
    `,
        };
        const data = await sgMail.send(msg);
        console.log(data);
        return { statusCode: 200, body: JSON.stringify(data) };
      } catch (error) {
        console.log(error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed fetching images' }),
        };
      }
    }
  }
};
