const codeforcesService = require("./codeforcesService");
const leetcodeService = require("./leetcodeService");
const codechefService = require("./codechefService");

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

let cache = {
  data: null,
  timestamp: 0,
};

const fetchAllContests = async () => {
  const now = Date.now();

  // Serve from cache if still fresh — avoids hammering 3 external APIs
  // on every dashboard load.
  if (cache.data && now - cache.timestamp < CACHE_TTL_MS) {
    return cache.data;
  }

  const providers = [
    { name: "Codeforces", fetcher: codeforcesService.getUpcomingContests },
    { name: "LeetCode", fetcher: leetcodeService.getUpcomingContests },
    { name: "CodeChef", fetcher: codechefService.getUpcomingContests },
  ];

  const results = await Promise.allSettled(
    providers.map((provider) => provider.fetcher()),
  );

  let allContests = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      allContests = allContests.concat(result.value);
    } else {
      // One provider failing must never break the whole endpoint.
      console.error(
        `[contestAggregator] ${providers[index].name} fetch failed: ${
          result.reason?.message || result.reason
        }`,
      );
    }
  });

  allContests.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  cache = { data: allContests, timestamp: now };

  return allContests;
};

module.exports = { fetchAllContests };
