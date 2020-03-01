const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/routes");

app.use("/", router);

app.use(express.static("statics"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "statics", "index.html"));
});

app.listen(process.env.PORT || 5000);
