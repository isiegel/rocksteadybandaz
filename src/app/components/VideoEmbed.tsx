"use client";

import { track } from '@vercel/analytics';
import { useEffect, useRef, useState } from "react";

type VideoEmbedProps = {
  videoId: string;
  title: string;
};

// Click-to-play facade: the YouTube iframe (and all of its scripts) only loads
// after the visitor clicks. Until then we show the video thumbnail with a play
// button, which keeps the initial page load light.
export function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // The play button unmounts when the iframe mounts, so move keyboard focus to
  // the player to keep the tab order sensible.
  useEffect(() => {
    if (playing) iframeRef.current?.focus();
  }, [playing]);

  if (playing) {
    return (
      <iframe
        ref={iframeRef}
        title={title}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`}
        className="aspect-video w-full"
        loading="eager"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        track('Video Start', { platform: 'YouTube', video: videoId });
        setPlaying(true);
      }}
      aria-label={`Play video: ${title}`}
      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-(--rock-steady-yellow)"
    >
      {/* YouTube thumbnail. A plain <img> is intentional: it's a single remote
          image that YouTube already serves pre-sized, so routing it through the
          next/image optimizer adds cost for no gain. maxresdefault isn't
          generated for every upload, so fall back to the always-present
          hqdefault if it 404s. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        onError={(event) => {
          const img = event.currentTarget;
          img.onerror = null;
          img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        }}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Play button over the thumbnail */}
      <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-(--rock-steady-red) text-white shadow-[0_10px_30px_color-mix(in_srgb,var(--rock-steady-red)_40%,transparent)] transition group-hover:scale-105 group-hover:bg-(--rock-steady-yellow) group-hover:text-[#111]">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-7 w-7 fill-current">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
