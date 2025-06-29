const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // ✅ This is needed to parse JSON from frontend

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
