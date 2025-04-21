const express = require("express");
const cors = require("cors");
const router = require("./route/costRoute");
const app = express();
const PORT = process.env.PORT || 9090;

app.use(
  cors({
    origin: "https://frontend-5mx4.vercel.app/", // or "http://localhost:3000" or your frontend domain
  })
);
app.use("/api", router);
app.use(express.json());
const connectDb = require("./db/db");
app.listen(PORT, () => {
  console.log("listening on port");
});
connectDb();
