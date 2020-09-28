exports.handler = async (event, context, callback) => {
  const pass = (body) => {
    callback(null, { statusCode: 200, body: JSON.stringify(body) });
  };
  const table = "products";
  const nonEmpty = "NOT({amount} = '')";
  const baseId = "app2w1Wmd8YVKuN4L";
  const url = `https://api.airtable.com/v0/${baseId}/${table}?view=all&filterByFormula=${nonEmpty}`;

  try {
    let response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        Authorization: `Bearer keycp4qT80lAsWR5k`,
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
