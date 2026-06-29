'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  distanceMiles,
  formatShowDate,
  formatShowTime,
  showCoords,
  type Coords,
  type Show,
} from '../shows';

const INITIAL_COUNT = 5;

type GeoStatus = 'idle' | 'locating' | 'located' | 'denied' | 'unsupported' | 'error';

type RankedShow = { show: Show; distance: number | null };

export function UpcomingShows({ shows }: { shows: Show[] }) {
  const [showAll, setShowAll] = useState(false);
  const [origin, setOrigin] = useState<Coords | null>(null);
  const [geoStatus, setGeoStatus] = useState<GeoStatus>('idle');
  const listRef = useRef<HTMLUListElement>(null);
  const shouldScrollToList = useRef(false);

  // When we have the user's location, attach each show's distance and sort
  // nearest-first; otherwise keep the chronological order coming in via props.
  const ranked = useMemo<RankedShow[]>(() => {
    const withDistance: RankedShow[] = shows.map((show) => {
      const coords = showCoords(show);
      return {
        show,
        distance: origin && coords ? distanceMiles(origin, coords) : null,
      };
    });

    if (!origin) return withDistance;

    return [...withDistance].sort((a, b) => {
      if (a.distance == null) return 1;
      if (b.distance == null) return -1;
      return a.distance - b.distance;
    });
  }, [shows, origin]);

  const visible = showAll ? ranked : ranked.slice(0, INITIAL_COUNT);
  const hasMore = ranked.length > INITIAL_COUNT;

  function handleFindNearby() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGeoStatus('unsupported');
      return;
    }

    setGeoStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOrigin({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setGeoStatus('located');
      },
      (err) => {
        setGeoStatus(err.code === err.PERMISSION_DENIED ? 'denied' : 'error');
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  }

  function handleClearNearby() {
    setOrigin(null);
    setGeoStatus('idle');
  }

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
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        {geoStatus === 'located' ? (
          <>
            <span className="text-sm font-black uppercase text-[#37d67a]">
              Sorted by distance
            </span>
            <button
              type="button"
              onClick={handleClearNearby}
              className="cursor-pointer text-sm font-black uppercase text-[#ffcf33] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
            >
              Clear
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleFindNearby}
            disabled={geoStatus === 'locating'}
            className="cursor-pointer text-sm font-black uppercase text-[#ffcf33] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#ffcf33] disabled:cursor-default disabled:no-underline disabled:opacity-60"
          >
            {geoStatus === 'locating' ? 'Locating…' : '📍 Find shows near me'}
          </button>
        )}
        {geoStatus === 'denied' ? (
          <span className="text-sm font-bold text-white/64">
            Location access denied — showing by date.
          </span>
        ) : null}
        {geoStatus === 'unsupported' || geoStatus === 'error' ? (
          <span className="text-sm font-bold text-white/64">
            Couldn’t get your location — showing by date.
          </span>
        ) : null}
      </div>

      <ul ref={listRef} className="mt-4 scroll-mt-28 divide-y divide-white/10">
        {visible.map(({ show, distance }) => (
          <li
            key={`${show.date}-${show.venue}`}
            className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <div>
              <p className="text-lg font-black leading-tight text-white">
                {show.venue}
              </p>
              {show.city || show.note || distance != null ? (
                <p className="mt-0.5 text-sm font-bold text-white/64">
                  {show.city ? `${show.city}, AZ` : ''}
                  {show.city && show.note ? ' · ' : ''}
                  {show.note ?? ''}
                  {distance != null ? (
                    <span className="text-[#37d67a]">
                      {(show.city || show.note ? ' · ' : '') +
                        `${Math.round(distance)} mi away`}
                    </span>
                  ) : null}
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
