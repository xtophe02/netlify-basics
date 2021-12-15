const axios = require('axios');
require('dotenv').config();

const callAPI = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;

exports.handler = async (event, context) => {
  try {
    const { data } = await axios.get(callAPI(JSON.parse(event.body).city));

    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.log(error.response.data);
    return {
      statusCode: error.response.data.code,
      body: JSON.stringify({ error: error.response.data.message }),
    };
  }
};
