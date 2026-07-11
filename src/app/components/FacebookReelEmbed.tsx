'use client';

import { track } from '@vercel/analytics';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type FacebookReelEmbedProps = {
  reelUrl: string;
  title: string;
};

export function FacebookReelEmbed({ reelUrl, title }: FacebookReelEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (playing) iframeRef.current?.focus();
  }, [playing]);

  if (playing) {
    const embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(reelUrl)}&show_text=false&autoplay=true`;

    return (
      <iframe
        ref={iframeRef}
        title={title}
        src={embedUrl}
        className="aspect-[9/16] w-full bg-black"
        loading="eager"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        track('Video Start', { platform: 'Facebook', video: 'Dubliner reel' });
        setPlaying(true);
      }}
      aria-label={`Play video: ${title}`}
      className="group relative flex aspect-[9/16] w-full items-center justify-center overflow-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-(--rock-steady-yellow)"
    >
      <Image
        src="/images/show-11.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 1024px) 28vw, 80vw"
        className="object-cover opacity-75 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-90"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />
      <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-(--rock-steady-red) text-white shadow-[0_10px_30px_color-mix(in_srgb,var(--rock-steady-red)_40%,transparent)] transition group-hover:scale-105 group-hover:bg-(--rock-steady-yellow) group-hover:text-[#111]">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-7 w-7 fill-current">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="absolute inset-x-5 bottom-5 z-10 text-left text-sm font-black uppercase text-white">
        Quick look: live at The Dubliner
      </span>
    </button>
  );
}
