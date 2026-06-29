'use client';

import { useEffect, useRef, useState } from 'react';
import { formatShowDate, formatShowTime, type Show } from '../shows';

const INITIAL_COUNT = 5;

export function UpcomingShows({ shows }: { shows: Show[] }) {
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const shouldScrollToList = useRef(false);
  const visible = showAll ? shows : shows.slice(0, INITIAL_COUNT);
  const hasMore = shows.length > INITIAL_COUNT;

  useEffect(() => {
    if (!showAll && shouldScrollToList.current) {
      shouldScrollToList.current = false;
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showAll]);

  function handleToggleShows() {
    if (showAll) {
      shouldScrollToList.current = true;
    }

    setShowAll((prev) => !prev);
  }

  return (
    <>
      <ul ref={listRef} className="mt-4 scroll-mt-28 divide-y divide-white/10">
        {visible.map((show) => (
          <li
            key={`${show.date}-${show.venue}`}
            className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <div>
              <p className="text-lg font-black leading-tight text-white">
                {show.venue}
              </p>
              {show.city || show.note ? (
                <p className="mt-0.5 text-sm font-bold text-white/64">
                  {show.city ? `${show.city}, AZ` : ''}
                  {show.city && show.note ? ' · ' : ''}
                  {show.note ?? ''}
                </p>
              ) : null}
            </div>
            <div className="shrink-0 text-left sm:text-right">
              <p className="text-sm font-black uppercase text-[#37d67a]">
                {formatShowDate(show.date)}
              </p>
              {formatShowTime(show) ? (
                <p className="text-sm font-bold text-white/64">
                  {formatShowTime(show)}
                </p>
              ) : null}
              {show.url ? (
                <a
                  href={show.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-black text-[#ffcf33] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
                >
                  Details
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {hasMore ? (
        <button
          type="button"
          onClick={handleToggleShows}
          className="cursor-pointer mt-4 text-sm font-black uppercase text-[#ffcf33] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
        >
          {showAll ? 'Show less' : `Show all ${shows.length} dates`}
        </button>
      ) : null}
    </>
  );
}
