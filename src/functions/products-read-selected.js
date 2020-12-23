const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

exports.handler = async (event, context) => {
  console.log("Function `products-read-selected` invoked");

  try {
    const response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_products_by_amount"), 1)),
        q.Lambda(
          "prodRef",
          q.Let(
            {
              prodDoc: q.Get(q.Var("prodRef")),
            },
            {
              id: q.Select(["ref", "id"], q.Var("prodDoc")),
              name: q.Select(["data", "name"], q.Var("prodDoc")),
              category: q.Select(["data", "category"], q.Var("prodDoc")),
              amount: q.Select(["data", "amount"], q.Var("prodDoc")),
            }
          )
        )
      )
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
