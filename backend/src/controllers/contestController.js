const { fetchAllContests } = require("../services/contestAggregator");

// @desc    Get all upcoming contests across platforms
// @route   GET /api/contests
// @access  Public
const getContests = async (req, res, next) => {
  try {
    const contests = await fetchAllContests();

    res.status(200).json({
      success: true,
      count: contests.length,
      contests,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getContests };
