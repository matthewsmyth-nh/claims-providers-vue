const express = require("express");
const { postgraphile } = require("postgraphile");
const cors = require('cors')
const app = express();

app.use(cors());
app.use(
  postgraphile(
    process.env.DATABASE_URL || "postgres://pguser:news-made-square-rhythm@localhost:5432/claims",
    "public",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    }
  )
);

app.listen(process.env.PORT || 3000);