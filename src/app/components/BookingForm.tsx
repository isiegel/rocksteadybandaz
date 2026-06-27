'use client';

import { useEffect, useId, useRef, useState } from 'react';

// Formspree form ID, set via NEXT_PUBLIC_FORMSPREE_FORM_ID (the ID is part of a
// public POST URL, so exposing it to the browser is expected and safe). When it
// is missing — e.g. a preview build before the env var is configured — the form
// falls back to the mailto link instead of posting to a broken endpoint.
const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
const ENDPOINT = FORM_ID ? `https://formspree.io/f/${FORM_ID}` : null;

type Status = 'idle' | 'submitting' | 'success' | 'error';

type BookingFormProps = {
  /** mailto: link used as a fallback when the form endpoint isn't configured. */
  mailtoHref: string;
  /** Cities offered in the venue/city dropdown (the site's Phoenix range). */
  cities: string[];
};

const EVENT_TYPES = [
  'Bar / restaurant',
  'Private party',
  'Patio / outdoor',
  'Charity / fundraiser',
  'Corporate / company event',
  'Other',
];

const OTHER = 'Other';

// text-base (16px) on phones, text-sm (14px) at >=640px: 16px is the threshold
// below which iOS Safari auto-zooms a focused input, so this avoids that zoom on
// mobile while keeping the original sizing on larger screens.
const fieldClass =
  'w-full border border-white/15 bg-black/40 px-4 py-3 text-base font-bold text-white placeholder:font-medium placeholder:text-white/40 transition focus:border-[#ffcf33] focus:outline-none focus:ring-2 focus:ring-[#ffcf33] sm:text-sm';
const labelClass = 'mb-1.5 block text-xs font-black uppercase text-white/55';

// Formats raw input into (xxx) xxx-xxxx as the user types, tolerating deletes.
function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 fill-current text-[#ffcf33] transition-transform ${
        open ? 'rotate-180' : ''
      }`}
    >
      <path d="M5.5 7.5 10 12l4.5-4.5z" />
    </svg>
  );
}

type CustomSelectProps = {
  id: string;
  /** Hidden field name to submit. Omit to manage the value in the parent. */
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
};

// Accessible custom dropdown (listbox) — keyboard navigable, click-outside to
// close, and styled to match the dark form. The chosen value is submitted via a
// hidden input so it still flows through FormData.
function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = `${id}-listbox`;

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    // pointerdown (not mousedown) so taps outside also close on touch devices —
    // iOS Safari doesn't fire mousedown on the document for taps on plain
    // (non-interactive) elements.
    document.addEventListener('pointerdown', onDocClick);
    return () => document.removeEventListener('pointerdown', onDocClick);
  }, [open]);

  function openMenu() {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  }

  function choose(option: string) {
    onChange(option);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (active >= 0) choose(options[active]);
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={`${fieldClass} flex items-center justify-between gap-2 text-left`}
      >
        <span className={value ? 'text-white' : 'font-medium text-white/40'}>
          {value || placeholder}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-60 w-full overflow-auto border border-white/15 bg-[#0d0d0d] py-1 shadow-[0_18px_45px_rgba(0,0,0,0.5)]"
        >
          {options.map((option, i) => {
            const selected = option === value;
            const highlighted = i === active;
            return (
              <li
                key={option}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onPointerDown={(e) => {
                  // Keep focus on the trigger, but don't select yet. Selecting
                  // on pointerdown closes the menu and unmounts this <ul> before
                  // the synthesized click fires, so on touch the click falls
                  // through to whatever is beneath — on mobile, the next
                  // CustomSelect — and opens it. Selecting on click (below)
                  // lands cleanly on this still-mounted option.
                  e.preventDefault();
                }}
                onClick={() => choose(option)}
                className={`cursor-pointer px-4 py-2.5 text-base font-bold sm:text-sm ${
                  highlighted
                    ? 'bg-[#ffcf33] text-[#111]'
                    : selected
                      ? 'bg-white/10 text-white'
                      : 'text-white/85'
                }`}
              >
                {option}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export function BookingForm({ mailtoHref, cities }: BookingFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  // Controlled fields (the custom dropdowns and the formatted phone). Kept in
  // state so they can be cleared on "send another".
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('');
  const [city, setCity] = useState('');
  const [otherCity, setOtherCity] = useState('');

  const baseId = useId();
  const successRef = useRef<HTMLDivElement>(null);

  // On success the tall form is swapped for the short confirmation card, which
  // collapses the page height — leaving the browser's scroll position parked on
  // the section below (the press kit). Pull the confirmation back into view so
  // the user stays on the form and sees that the inquiry went through.
  useEffect(() => {
    if (status === 'success') {
      successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  const cityOptions = [...cities, OTHER];
  // When "Other" is chosen the submitted value is the typed city, not "Other".
  const cityValue = city === OTHER ? otherCity : city;

  function resetFields() {
    setPhone('');
    setEventType('');
    setCity('');
    setOtherCity('');
  }

  // No endpoint configured: render the mailto fallback so the section is never
  // a dead end.
  if (!ENDPOINT) {
    return (
      <a
        href={mailtoHref}
        aria-label="Check Rock Steady availability by email"
        className="inline-flex items-center gap-2 rounded-full bg-[#ffcf33] px-6 py-3 text-sm font-black uppercase text-[#111] shadow-[0_12px_30px_rgba(255,207,51,0.24)] transition hover:bg-[#ff2b1f] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
      >
        Check availability by email
      </a>
    );
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        role="status"
        className="border border-[#37d67a]/40 bg-[#37d67a]/10 p-6 text-center"
      >
        <p className="text-xl font-black text-white">Inquiry sent — thanks!</p>
        <p className="mt-2 text-sm font-bold leading-6 text-white/72">
          We&apos;ll get back to you soon about your date.
        </p>
        <button
          type="button"
          onClick={() => {
            resetFields();
            setStatus('idle');
          }}
          className="cursor-pointer mt-5 inline-flex items-center justify-center rounded-full border border-[#ffcf33]/45 bg-black/35 px-5 py-2.5 text-sm font-black uppercase text-[#ffcf33] transition hover:bg-[#ffcf33] hover:text-[#111] focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('submitting');
    setError(null);

    try {
      const response = await fetch(ENDPOINT!, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        resetFields();
        setStatus('success');
        return;
      }

      // Formspree returns a JSON body with field-level errors on 4xx.
      const data = (await response.json().catch(() => null)) as {
        errors?: { message: string }[];
      } | null;
      setError(
        data?.errors?.map((e) => e.message).join(', ') ||
          'Something went wrong. Please try again.',
      );
      setStatus('error');
    } catch {
      setError('Network error. Please try again or email us directly.');
      setStatus('error');
    }
  }

  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <input
        type="hidden"
        name="_subject"
        value="New booking inquiry — Rock Steady"
      />
      {/* Honeypot: bots fill hidden fields; Formspree silently drops anything
          that arrives with _gotcha set. Hidden from users and assistive tech. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-[#ff2b1f]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-[#ff2b1f]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            pattern="\(\d{3}\) \d{3}-\d{4}"
            title="Enter a 10-digit phone number, e.g. (555) 123-4567"
            maxLength={14}
            className={fieldClass}
          />
        </div>
        {/* The native iOS date control enforces a min-width wider than this column
            and ignores width:100%/min-width:0, so it overflows. The two things that DO
            cap it — -webkit-appearance:none and an overflow:hidden ancestor — each
            break the iOS picker (it opens then immediately dismisses). overflow-clip
            caps the width WITHOUT creating a scroll container, so the picker survives.
            The border/background/focus ring live on the box (which fits the column)
            and the input is borderless, so the clipped edge trims empty space rather
            than the field's own right border. */}
        <div className="min-w-0">
          <label htmlFor="event-date" className={labelClass}>
            Event date
          </label>
          <div className="overflow-clip border border-white/15 bg-black/40 transition focus-within:border-[#ffcf33] focus-within:ring-2 focus-within:ring-[#ffcf33]">
            <input
              id="event-date"
              name="event date"
              type="date"
              className="w-full min-w-0 border-0 bg-transparent px-4 py-3 text-base font-bold text-white focus:outline-none sm:text-sm [color-scheme:dark]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${baseId}-city`} className={labelClass}>
            Venue / city
          </label>
          <CustomSelect
            id={`${baseId}-city`}
            value={city}
            onChange={(v) => {
              setCity(v);
              if (v !== OTHER) setOtherCity('');
            }}
            options={cityOptions}
            placeholder="Choose a city"
          />
          {/* Submit the resolved value (typed city when "Other"). */}
          <input type="hidden" name="venue / city" value={cityValue} />
          {city === OTHER ? (
            <input
              type="text"
              aria-label="Enter your city"
              placeholder="Enter your city"
              value={otherCity}
              onChange={(e) => setOtherCity(e.target.value)}
              className={`${fieldClass} mt-2`}
            />
          ) : null}
        </div>
        <div>
          <label htmlFor={`${baseId}-event-type`} className={labelClass}>
            Event type
          </label>
          <CustomSelect
            id={`${baseId}-event-type`}
            name="event type"
            value={eventType}
            onChange={setEventType}
            options={EVENT_TYPES}
            placeholder="Choose one"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="set-length" className={labelClass}>
            Set length
          </label>
          <input
            id="set-length"
            name="set length"
            type="text"
            placeholder="e.g. two 60-min sets"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="crowd-size" className={labelClass}>
            Crowd size
          </label>
          <input
            id="crowd-size"
            name="crowd size"
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            placeholder="e.g. 120"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Notes
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Anything else we should know about the night?"
          className={`${fieldClass} resize-y`}
        />
      </div>

      {status === 'error' && error ? (
        <p
          role="alert"
          className="border border-[#ff2b1f]/40 bg-[#ff2b1f]/10 px-4 py-3 text-sm font-bold text-white"
        >
          {error}{' '}
          <a
            href={mailtoHref}
            className="text-[#ffcf33] underline-offset-4 hover:underline"
          >
            Email us instead
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="cursor-pointer mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#ffcf33] px-6 py-3 text-sm font-black uppercase text-[#111] shadow-[0_12px_30px_rgba(255,207,51,0.24)] transition hover:bg-[#ff2b1f] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ffcf33] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Sending…' : 'Send booking inquiry'}
      </button>

      <p className="text-xs font-bold leading-5 text-white/50">
        Prefer email? Reach us at{' '}
        <a
          href={mailtoHref}
          className="text-[#ffcf33] underline-offset-4 hover:underline"
        >
          our inbox
        </a>
        .
      </p>
    </form>
  );
}
