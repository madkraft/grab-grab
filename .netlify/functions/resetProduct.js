exports.handler = async (event, context, callback) => {
  const pass = (body) => {
    callback(null, { statusCode: 200, body: JSON.stringify(body) });
  };
  const table = "products";
  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_BASE}/${table}`;

  try {
    let response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_NOT_SECRET_CODE}`,
        "Content-Type": "application/json"
      },
      body: event.body
    });
    let data = await response.json();
    await pass(data);
  } catch (err) {
    let error = {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message })
    };
    await pass(error);
  }
};
