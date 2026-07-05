import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import { addFavorite, removeFavorite } from "../../api/favoriteApi";
import { useAuth } from "../../context/AuthContext";

const FavoriteButton = ({ contestId, onToggle }) => {
  const { user, updateFavorites } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFavorited = Boolean(user?.favorites?.includes(contestId));

  const handleToggle = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (isFavorited) {
        const data = await removeFavorite(contestId);
        updateFavorites(data.favorites);
        onToggle?.(contestId, false);
        toast.success("Removed from favorites");
      } else {
        const data = await addFavorite(contestId);
        updateFavorites(data.favorites);
        onToggle?.(contestId, true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error("Could not update favorites. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isSubmitting}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      className="rounded-full p-1.5 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
    >
      <Star
        size={18}
        className={
          isFavorited
            ? "fill-amber-400 text-amber-400"
            : "text-gray-400 dark:text-gray-500"
        }
      />
    </button>
  );
};

export default FavoriteButton;
