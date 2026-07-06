'use client';

import Image from 'next/image';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from 'react';

type SampleSongListCardProps = {
  imagePath: string;
  previewImagePath?: string;
  variant?: 'feature' | 'pressKit';
};

const imageAlt = 'Rock Steady sample song list';
const modalFadeMs = 180;

export function SampleSongListCard({
  imagePath,
  previewImagePath = imagePath,
  variant = 'feature',
}: SampleSongListCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const isFeature = variant === 'feature';

  const openModal = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setIsOpen(true);
  };

  const closeModal = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setIsVisible(false);
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = null;
    }, modalFadeMs);
  };

  useEffect(() => {
    if (!isOpen) return;

    const triggerElement = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    const animationFrame = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      triggerElement?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const closeOnBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeModal();
  };

  return (
    <div
      className={
        isFeature
          ? 'border border-white/12 bg-black/32 p-5 shadow-[0_16px_38px_rgba(0,0,0,0.2)]'
          : 'flex flex-col border border-white/12 bg-[#101010] p-6'
      }
    >
      <p
        className={
          isFeature
            ? 'text-sm font-black uppercase text-(--rock-steady-red)'
            : 'text-sm font-black uppercase text-[#ffcf33]'
        }
      >
        {isFeature ? 'Full sample song list' : 'Sample song list'}
      </p>
      {isFeature ? (
        <p className="mt-2 text-sm font-bold leading-6 text-white/68">
          Download the venue-friendly one-sheet with more of the Rock Steady
          catalog.
        </p>
      ) : null}

      <button
        ref={triggerRef}
        type="button"
        onClick={openModal}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="View Rock Steady sample song list full size"
        className={`group relative block aspect-[3/2] w-full cursor-pointer overflow-hidden border border-white/12 bg-[#f4f1eb] transition hover:border-[#ffcf33] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33] ${
          isFeature ? 'mt-5' : 'mt-4'
        }`}
      >
        <Image
          src={previewImagePath}
          alt={imageAlt}
          fill
          sizes={
            isFeature
              ? '(min-width: 1024px) 36vw, 100vw'
              : '(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw'
          }
          className="cursor-pointer object-cover object-top transition duration-300 group-hover:scale-[1.02]"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/78 px-3 py-2 text-[0.68rem] font-black uppercase text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition group-hover:bg-[#ffcf33] group-hover:text-[#111]">
          View full size
        </span>
      </button>

      <div
        className={
          isFeature ? 'mt-4 flex flex-wrap gap-2' : 'mt-auto flex flex-wrap gap-2 pt-5'
        }
      >
        <a
          href={imagePath}
          download
          className={
            isFeature
              ? 'inline-flex rounded-full bg-(--rock-steady-red) px-5 py-3 text-xs font-black uppercase text-white transition hover:bg-[#ffcf33] hover:text-[#111] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]'
              : 'border border-white/15 bg-black/30 px-4 py-2 text-xs font-black uppercase text-white/88 transition hover:border-[#ffcf33] hover:text-[#ffcf33]'
          }
        >
          {isFeature ? 'Download PNG' : 'Song list PNG'}
        </a>
        {isFeature ? (
          <button
            type="button"
            onClick={openModal}
            className="inline-flex cursor-pointer rounded-full border border-white/18 bg-black/30 px-5 py-3 text-xs font-black uppercase text-white/88 transition hover:border-[#ffcf33] hover:text-[#ffcf33] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]"
          >
            View full size
          </button>
        ) : null}
      </div>

      {isOpen ? (
        <div
          className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/86 p-3 backdrop-blur-sm transition-opacity duration-[180ms] ease-out sm:p-6 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          onMouseDown={closeOnBackdrop}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="w-full max-w-[1536px]"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3
                id={titleId}
                className="text-sm font-black uppercase text-white sm:text-base"
              >
                Rock Steady sample song list
              </h3>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={imagePath}
                  download
                  className="rounded-full bg-(--rock-steady-red) px-4 py-2 text-xs font-black uppercase text-white transition hover:bg-[#ffcf33] hover:text-[#111] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]"
                >
                  Download PNG
                </a>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  aria-label="Close sample song list"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-black/58 text-white transition hover:border-[#ffcf33] hover:text-[#ffcf33] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="h-5 w-5"
                  >
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex justify-center border border-white/18 bg-[#f4f1eb] shadow-[0_24px_80px_rgba(0,0,0,0.58)]">
              <Image
                src={imagePath}
                alt={imageAlt}
                width={1536}
                height={1024}
                sizes="(min-width: 1536px) 1536px, 96vw"
                className="h-auto max-h-[calc(100svh-7rem)] w-auto max-w-full"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
