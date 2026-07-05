import { memo } from "react";
import CountdownTimer from "./CountdownTimer";
import FavoriteButton from "./FavoriteButton";
import { formatDateTime, formatDuration } from "../../utils/formatDate";

const platformStyles = {
  Codeforces:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  LeetCode:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  CodeChef:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

const ContestCard = ({ contest, onFavoriteToggle }) => {
  const badgeClass =
    platformStyles[contest.platform] ||
    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-800">
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
          >
            {contest.platform}
          </span>
          <div className="flex items-center gap-2">
            <CountdownTimer startTime={contest.startTime} />
            <FavoriteButton
              contestId={contest.id}
              onToggle={onFavoriteToggle}
            />
          </div>
        </div>

        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 dark:text-white">
          {contest.name}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formatDateTime(contest.startTime)} &middot;{" "}
          {formatDuration(contest.durationMinutes)}
        </p>
      </div>

      <a
        href={contest.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-brand-700"
      >
        View Contest
      </a>
    </div>
  );
};

// export default ContestCard;
// export default React.memo(ContestCard);
export default memo(ContestCard);
