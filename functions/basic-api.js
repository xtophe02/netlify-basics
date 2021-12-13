const axios = require('axios');
require('dotenv').config();

const API_ROOT = 'https://api.unsplash.com';

exports.handler = async (event, context) => {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    const doggoEndpoint = `${API_ROOT}/photos/random?client_id=${accessKey}&count=10&collections='3816141,1154337,1254279'`;
    const { data } = await axios.get(doggoEndpoint);

    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching images' }),
    };
  }
};
