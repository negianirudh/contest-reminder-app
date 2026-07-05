import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/layout/Navbar";
import ContestCard from "../components/contests/ContestCard";
import Spinner from "../components/common/Spinner";
import EmptyState from "../components/common/EmptyState";
import { getFavorites } from "../api/favoriteApi";

const Favorites = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFavorites();
        setContests(data.contests);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          "Failed to load favorites. Please try again.";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // Remove instantly from the visible list on un-favorite, instead of
  // waiting for a refetch — small touch, makes the UI feel responsive.
  const handleFavoriteToggle = (contestId, isNowFavorited) => {
    if (!isNowFavorited) {
      setContests((prev) => prev.filter((contest) => contest.id !== contestId));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your Favorites
        </h2>
        <p className="mb-6 mt-1 text-gray-600 dark:text-gray-400">
          Contests you've starred for quick access.
        </p>

        {loading && <Spinner />}

        {!loading && error && (
          <EmptyState title="Something went wrong" message={error} />
        )}

        {!loading && !error && contests.length === 0 && (
          <EmptyState
            title="No favorites yet"
            message="Star a contest from the dashboard to see it here."
          />
        )}

        {!loading && !error && contests.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contests.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
