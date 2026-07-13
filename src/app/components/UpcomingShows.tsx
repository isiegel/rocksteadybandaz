'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { googleCalendarUrl, showIcsPath } from '../calendar-links';
import {
  distanceMiles,
  formatShowDate,
  formatShowTime,
  showCoords,
  type Coords,
  type Show,
} from '../shows';

const INITIAL_COUNT = 5;
const EXTRA_SHOWS_ID = 'upcoming-shows-extra';
const SHOWS_COLLAPSE_MS = 420;

type GeoStatus = 'idle' | 'locating' | 'located' | 'denied' | 'unsupported' | 'error';

type RankedShow = { show: Show; distance: number | null };

function AddToCalendar({ show }: { show: Show }) {
  const linkClass =
    'text-sm font-black text-(--rock-steady-yellow) underline-offset-4 hover:underline focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)';

  return (
    <details className="group mt-0.5">
      <summary
        className="cursor-pointer list-none text-sm font-bold text-white/64 underline-offset-4 transition hover:text-(--rock-steady-yellow) hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-(--rock-steady-yellow) [&::-webkit-details-marker]:hidden"
        aria-label={`Add the ${formatShowDate(show.date)} show at ${show.venue} to your calendar`}
      >
        <span aria-hidden="true">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">&minus;</span>
        </span>{' '}
        Add to calendar
      </summary>
      <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 sm:justify-end">
        <a
          href={googleCalendarUrl(show)}
          target="_blank"
          rel="noreferrer"
          className={linkClass}
        >
          Google
        </a>
        <a href={showIcsPath(show)} className={linkClass}>
          Apple / Outlook
        </a>
      </p>
    </details>
  );
}

function ShowListItem({
  show,
  distance,
  isFirst = false,
  isLast = false,
}: RankedShow & { isFirst?: boolean; isLast?: boolean }) {
  return (
    <li
      className={`flex flex-col gap-1.5 border-white/10 ${
        isFirst ? 'pt-0' : 'border-t pt-4'
      } ${
        isLast ? 'pb-0' : 'pb-4'
      } sm:flex-row sm:items-baseline sm:justify-between sm:gap-4`}
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
            className="text-sm font-black text-(--rock-steady-yellow) underline-offset-4 hover:underline focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
          >
            Details
          </a>
        ) : null}
        <AddToCalendar show={show} />
      </div>
    </li>
  );
}

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

  const initialShows = ranked.slice(0, INITIAL_COUNT);
  const extraShows = ranked.slice(INITIAL_COUNT);
  const hasMore = extraShows.length > 0;

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
    if (showAll || !shouldScrollToList.current) return;

    shouldScrollToList.current = false;
    const scrollTimer = window.setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, SHOWS_COLLAPSE_MS);

    return () => window.clearTimeout(scrollTimer);
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
              className="cursor-pointer text-sm font-black uppercase text-(--rock-steady-yellow) underline-offset-4 hover:underline focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
            >
              Clear
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleFindNearby}
            disabled={geoStatus === 'locating'}
            className="cursor-pointer text-sm font-black uppercase text-(--rock-steady-yellow) underline-offset-4 hover:underline focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow) disabled:cursor-default disabled:no-underline disabled:opacity-60"
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

      <ul ref={listRef} className="mt-4 scroll-mt-28">
        {initialShows.map(({ show, distance }, index) => (
          <ShowListItem
            key={`${show.date}-${show.venue}`}
            show={show}
            distance={distance}
            isFirst={index === 0}
            isLast={!showAll && index === initialShows.length - 1}
          />
        ))}
      </ul>

      {hasMore ? (
        <div
          id={EXTRA_SHOWS_ID}
          className="show-dates-reveal"
          data-expanded={showAll}
          aria-hidden={!showAll}
          inert={!showAll}
        >
          <ul className="show-dates-reveal-inner">
            {extraShows.map(({ show, distance }, index) => (
              <ShowListItem
                key={`${show.date}-${show.venue}`}
                show={show}
                distance={distance}
                isLast={index === extraShows.length - 1}
              />
            ))}
          </ul>
        </div>
      ) : null}

      {hasMore ? (
        <button
          type="button"
          onClick={handleToggleShows}
          aria-expanded={showAll}
          aria-controls={EXTRA_SHOWS_ID}
          className="cursor-pointer mt-4 text-sm font-black uppercase text-(--rock-steady-yellow) underline-offset-4 hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-(--rock-steady-yellow)"
        >
          {showAll ? 'Show less' : `Show all ${shows.length} dates`}
        </button>
      ) : null}
    </>
  );
}
