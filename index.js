const express = require("express");
const cors = require("cors");
const router = require("./route/costRoute");
const app = express();
app.use(cors());
app.use("/api", router);
app.use(express.json());
const connectDb = require("./db/db");
app.listen(9090, () => {
  console.log("listening on port");
});
connectDb();
