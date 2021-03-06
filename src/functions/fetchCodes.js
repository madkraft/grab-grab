const axios = require("axios");

exports.handler = async (event, context, callback) => {
  const pass = (body) => {
    callback(null, { statusCode: 200, body: JSON.stringify(body) });
  };
  const table = "codes";
  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_BASE}/${table}`;

  try {
    let response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_NOT_SECRET_CODE}`,
        "Content-Type": "application/json",
      },
    });
    await pass(response.data);
  } catch (err) {
    let error = {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
    await pass(error);
  }
};
