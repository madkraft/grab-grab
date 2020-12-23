const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  console.log("Function `products-create` invoked", data);

  const product = { data };

  try {
    const response = await client.query(
      q.Create(q.Collection("products"), product)
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (err) {
    console.log("error", err);
    return { statusCode: 400, body: JSON.stringify(err) };
  }
};
