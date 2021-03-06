const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context) => {
  const { id, ...productFields } = JSON.parse(event.body);
  console.log("Function `products-update` invoked", productFields);

  const product = { data: productFields };

  console.log("Updating product:", id);

  try {
    const response = await client.query(
      q.Update(q.Ref(q.Collection("products"), id), product)
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
