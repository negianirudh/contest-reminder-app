const axios = require("axios");

const CODEFORCES_API_URL = "https://codeforces.com/api/contest.list";

const getUpcomingContests = async () => {
  const response = await axios.get(CODEFORCES_API_URL, { timeout: 8000 });

  if (response.data.status !== "OK") {
    throw new Error("Codeforces API returned a non-OK status");
  }

  const upcoming = response.data.result.filter(
    (contest) => contest.phase === "BEFORE",
  );

  return upcoming.map((contest) => ({
    id: `codeforces_${contest.id}`,
    platform: "Codeforces",
    name: contest.name,
    url: `https://codeforces.com/contests/${contest.id}`,
    startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
    durationMinutes: Math.round(contest.durationSeconds / 60),
  }));
};

module.exports = { getUpcomingContests };
