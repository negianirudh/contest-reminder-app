const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const contestRoutes = require("./routes/contestRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/favorites", favoriteRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
