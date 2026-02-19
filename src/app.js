const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "API is running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

module.exports = app;
