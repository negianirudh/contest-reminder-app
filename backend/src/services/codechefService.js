const axios = require("axios");

const CODECHEF_API_URL = "https://www.codechef.com/api/list/contests/all";

const getUpcomingContests = async () => {
  const response = await axios.get(CODECHEF_API_URL, { timeout: 8000 });

  const futureContests = response.data?.future_contests || [];

  return futureContests.map((contest) => ({
    id: `codechef_${contest.contest_code}`,
    platform: "CodeChef",
    name: contest.contest_name,
    url: `https://www.codechef.com/${contest.contest_code}`,
    startTime: new Date(contest.contest_start_date_iso).toISOString(),
    durationMinutes: Math.round(
      (new Date(contest.contest_end_date_iso) -
        new Date(contest.contest_start_date_iso)) /
        60000,
    ),
  }));
};

module.exports = { getUpcomingContests };
