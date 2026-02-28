const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db"); 

const app = express();

app.use(express.json());
app.use(cors());


connectDB(); 
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/task"));
app.use("/api/notes", require("./routes/note"));
app.use("/api/goals", require("./routes/goal"));


app.get("/", (req, res) => {
  res.send("🚀 API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});