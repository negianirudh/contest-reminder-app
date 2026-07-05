import useCountdown from "../../hooks/useCountdown";

const pad = (num) => String(num).padStart(2, "0");

const CountdownTimer = ({ startTime }) => {
  const { days, hours, minutes, seconds, isPast } = useCountdown(startTime);

  if (isPast) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
        Contest started
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1 font-mono text-sm font-semibold text-brand-700 dark:text-brand-400">
      {days > 0 && <span>{days}d</span>}
      <span>{pad(hours)}h</span>
      <span>:</span>
      <span>{pad(minutes)}m</span>
      <span>:</span>
      <span>{pad(seconds)}s</span>
    </div>
  );
};

export default CountdownTimer;
