const Airtable = require('airtable-node');
require('dotenv').config();
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app2Zpt5q8NebBddy')
  .table('products');

exports.handler = async (event, context) => {
  if (event.queryStringParameters.id) {
    try {
      const {
        id,
        fields: { description, name, price, image },
      } = await airtable.retrieve(event.queryStringParameters.id);

      return {
        statusCode: 200,
        body: JSON.stringify({
          id,
          description,
          name,
          price,
          image: image[0].url,
        }),
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Please to provide an ID' }),
      };
    }
  } else {
    try {
      const { records } = await airtable.list().then((resp) => {
        return resp;
      });
      const data = records.map((product) => ({
        id: product.id,
        name: product.fields.name,
        price: product.fields.price,
        image: product.fields.image[0].url,
      }));
      return { statusCode: 200, body: JSON.stringify(data) };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed fetching data' }),
      };
    }
  }
};
