import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/layout/Navbar";
import ContestCard from "../components/contests/ContestCard";
import SearchBar from "../components/contests/SearchBar";
import PlatformFilter from "../components/contests/PlatformFilter";
import Spinner from "../components/common/Spinner";
import EmptyState from "../components/common/EmptyState";
import { getContests } from "../api/contestApi";
import { useAuth } from "../context/AuthContext";
import useDebounce from "../hooks/useDebounce";

const Dashboard = () => {
  const { user } = useAuth();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");

  const debouncedSearch = useDebounce(search, 250);

  useEffect(() => {
    const loadContests = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getContests();
        setContests(data.contests);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          "Failed to load contests. Please try again.";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    loadContests();
  }, []);

  const filteredContests = useMemo(() => {
    return contests.filter((contest) => {
      const matchesPlatform =
        platform === "All" || contest.platform === platform;
      const matchesSearch = contest.name
        .toLowerCase()
        .includes(debouncedSearch.trim().toLowerCase());
      return matchesPlatform && matchesSearch;
    });
  }, [contests, debouncedSearch, platform]);

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome, {user?.name}
        </h1>
        <p className="mb-6 mt-1 text-gray-600 dark:text-gray-400">
          Upcoming contests across Codeforces, LeetCode, and CodeChef.
        </p>

        {!loading && !error && contests.length > 0 && (
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <PlatformFilter selected={platform} onSelect={setPlatform} />
            <SearchBar value={search} onChange={setSearch} />
          </div>
        )}

        {loading && <Spinner label="Loading upcoming contests" />}

        {!loading && error && (
          <EmptyState title="Something went wrong" message={error} />
        )}

        {!loading && !error && contests.length === 0 && (
          <EmptyState
            title="No upcoming contests"
            message="There are no upcoming contests right now. Check back soon."
          />
        )}

        {!loading &&
          !error &&
          contests.length > 0 &&
          filteredContests.length === 0 && (
            <EmptyState
              title="No matching contests"
              message="Try a different search term or platform filter."
            />
          )}

        {!loading && !error && filteredContests.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
