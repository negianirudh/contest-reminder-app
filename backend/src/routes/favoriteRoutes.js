const express = require("express");
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favoriteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Every route in this file requires a valid JWT.
router.use(protect);

router.get("/", getFavorites);
router.post("/:contestId", addFavorite);
router.delete("/:contestId", removeFavorite);

module.exports = router;
