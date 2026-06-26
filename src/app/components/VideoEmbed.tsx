"use client";

import { useState } from "react";

type VideoEmbedProps = {
  videoId: string;
  title: string;
};

// Click-to-play facade: the YouTube iframe (and all of its scripts) only loads
// after the visitor clicks. Until then we show the video thumbnail with a play
// button, which keeps the initial page load light.
export function VideoEmbed({ videoId, title }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
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
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffcf33]"
    >
      {/* YouTube thumbnail. A plain <img> is intentional: it's a single remote
          image that YouTube already serves pre-sized, so routing it through the
          next/image optimizer adds cost for no gain. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Play button over the thumbnail */}
      <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#ff2b1f] text-white shadow-[0_10px_30px_rgba(255,43,31,0.4)] transition group-hover:scale-105 group-hover:bg-[#ffcf33] group-hover:text-[#111]">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-7 w-7 fill-current">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
