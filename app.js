const express = require('express');
const cors = require('cors');
const connectDb = require("./config/dbConnection");
const app = express();

require("dotenv").config();
const PORT = 5000;
connectDb();
app.use(cors());

app.use(express.json());

app.use("/api/food", require("./routes/foodRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/calculator", require("./routes/calculatorRoutes"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)
);