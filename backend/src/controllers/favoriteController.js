const User = require("../models/User");
const { fetchAllContests } = require("../services/contestAggregator");

// @desc    Get the logged-in user's favorite contests (hydrated with live data)
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res, next) => {
  try {
    const allContests = await fetchAllContests();
    const favoriteIds = new Set(req.user.favorites);

    const favoriteContests = allContests.filter((contest) =>
      favoriteIds.has(contest.id),
    );

    res.status(200).json({
      success: true,
      count: favoriteContests.length,
      contests: favoriteContests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a contest to favorites
// @route   POST /api/favorites/:contestId
// @access  Private
const addFavorite = async (req, res, next) => {
  try {
    const { contestId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user.favorites.includes(contestId)) {
      user.favorites.push(contestId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      favorites: user.favorites,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove a contest from favorites
// @route   DELETE /api/favorites/:contestId
// @access  Private
const removeFavorite = async (req, res, next) => {
  try {
    const { contestId } = req.params;

    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter((id) => id !== contestId);
    await user.save();

    res.status(200).json({
      success: true,
      favorites: user.favorites,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
