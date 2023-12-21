const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5001;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const phaseRouter = require("./routes/phase.js");
app.use("/phases", phaseRouter);

const taskRouter = require("./routes/task.js");
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
