import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-brand-600 dark:text-brand-500">
        404
      </h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        This page doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white transition hover:bg-brand-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
