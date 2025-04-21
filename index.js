const express = require("express");
const cors = require("cors");
const router = require("./route/costRoute");
const app = express();
const PORT = process.env.PORT || 9090;

app.use(cors());
app.use("/api", router);
app.use(express.json());
const connectDb = require("./db/db");
app.listen(PORT, () => {
  console.log("listening on port");
});
connectDb();
