const axios = require("axios");

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

const UPCOMING_CONTESTS_QUERY = `
  query upcomingContests {
    upcomingContests {
      title
      titleSlug
      startTime
      duration
    }
  }
`;

const getUpcomingContests = async () => {
  const response = await axios.post(
    LEETCODE_GRAPHQL_URL,
    { query: UPCOMING_CONTESTS_QUERY },
    {
      timeout: 8000,
      headers: { "Content-Type": "application/json" },
    },
  );

  const contests = response.data?.data?.upcomingContests || [];

  return contests.map((contest) => ({
    id: `leetcode_${contest.titleSlug}`,
    platform: "LeetCode",
    name: contest.title,
    url: `https://leetcode.com/contest/${contest.titleSlug}`,
    startTime: new Date(contest.startTime * 1000).toISOString(),
    durationMinutes: Math.round(contest.duration / 60),
  }));
};

module.exports = { getUpcomingContests };
