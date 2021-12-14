const Airtable = require('airtable-node');
require('dotenv').config();
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app2Zpt5q8NebBddy')
  .table('survey');

exports.handler = async (event, context) => {
  const method = event.httpMethod;
  if (method === 'GET') {
    try {
      const { records } = await airtable.list().then((resp) => {
        return resp;
      });
      const data = records.map((pilot) => ({
        id: pilot.id,
        pilots: pilot.fields.pilots,
        votes: pilot.fields.votes,
        image: pilot.fields.image[0].url,
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
  if (method === 'PUT') {
    try {
      const { id, votes } = JSON.parse(event.body);
      const data = await airtable.update(id, {
        fields: { votes: Number(votes) + 1 },
      });
      console.log(data);
      return {
        statusCode: 200,
        body: JSON.stringify({ votes: data.fields.votes }),
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed fetching data' }),
      };
    }
  }
  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'HTTP method not allowed' }),
  };
};
