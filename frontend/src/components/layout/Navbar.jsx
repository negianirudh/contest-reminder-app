import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="text-xl font-bold text-brand-600 dark:text-brand-500"
        >
          Contest Reminder
        </Link>

        {user && (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/favorites"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 sm:flex"
            >
              <Star size={16} />
              Favorites
            </Link>

            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <span className="hidden text-sm text-gray-600 dark:text-gray-300 md:inline">
              Hi, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {user && (
        <div className="flex justify-center border-t border-gray-100 py-2 dark:border-gray-800 sm:hidden">
          <Link
            to="/favorites"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            <Star size={16} />
            Favorites
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
