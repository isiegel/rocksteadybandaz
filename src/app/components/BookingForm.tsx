'use client';

import { useState } from 'react';

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
};

const fieldClass =
  'w-full border border-white/15 bg-black/40 px-4 py-3 text-sm font-bold text-white placeholder:font-medium placeholder:text-white/40 transition focus:border-[#ffcf33] focus:outline-none focus:ring-2 focus:ring-[#ffcf33]';
const labelClass = 'mb-1.5 block text-xs font-black uppercase text-white/55';

export function BookingForm({ mailtoHref }: BookingFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

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
        role="status"
        className="border border-[#37d67a]/40 bg-[#37d67a]/10 p-6 text-center"
      >
        <p className="text-xl font-black text-white">Inquiry sent — thanks!</p>
        <p className="mt-2 text-sm font-bold leading-6 text-white/72">
          We&apos;ll get back to you soon about your date. Want to add anything?{' '}
          <a
            href={mailtoHref}
            className="text-[#ffcf33] underline-offset-4 hover:underline"
          >
            Email us directly
          </a>
          .
        </p>
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
        setStatus('success');
        form.reset();
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
    <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
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

      <div className="grid gap-4 sm:grid-cols-2">
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Best number to reach you"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="event-date" className={labelClass}>
            Event date
          </label>
          <input
            id="event-date"
            name="event date"
            type="date"
            className={`${fieldClass} [color-scheme:dark]`}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="venue" className={labelClass}>
            Venue / city
          </label>
          <input
            id="venue"
            name="venue / city"
            type="text"
            placeholder="Where's the night?"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="event-type" className={labelClass}>
            Event type
          </label>
          <select
            id="event-type"
            name="event type"
            defaultValue=""
            className={`${fieldClass} [color-scheme:dark]`}
          >
            <option value="" disabled>
              Choose one
            </option>
            <option>Bar / restaurant</option>
            <option>Private party</option>
            <option>Patio / outdoor</option>
            <option>Charity / fundraiser</option>
            <option>Corporate / company event</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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
            type="text"
            placeholder="Approx. how many people"
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

      <p
        className="text-xs font-bold leading-5 text-white/50"
        aria-live="polite"
      >
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
