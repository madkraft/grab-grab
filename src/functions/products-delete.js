const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context) => {
  const { id } = JSON.parse(event.body);

  console.log("Function `products-delete` invoked. Delete id", id);

  try {
    const response = await client.query(
      q.Delete(q.Ref(q.Collection("products"), id))
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
