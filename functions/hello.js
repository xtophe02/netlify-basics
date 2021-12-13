exports.handler = async function (event, context) {
  return {
    // headers: {
    //   'Access-Control-Allow-Origin': '*', // Allow from anywhere
    //   'Access-Control-Allow-Methods': '*',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // },
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
};
