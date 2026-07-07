import { ANSWER_LINK_PATTERN, bookerFaqs } from '../booker-faq';
import type { ReactNode } from 'react';

// Renders an answer string, turning [label](href) segments into inline links.
function renderAnswer(answer: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of answer.matchAll(ANSWER_LINK_PATTERN)) {
    const [full, label, href] = match;
    if (match.index > lastIndex) {
      parts.push(answer.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={href}
        className="text-(--rock-steady-yellow) underline-offset-4 hover:underline"
      >
        {label}
      </a>,
    );
    lastIndex = match.index + full.length;
  }

  if (lastIndex < answer.length) {
    parts.push(answer.slice(lastIndex));
  }

  return parts;
}

export function BookerFaq() {
  return (
    <div className="grid gap-3">
      {bookerFaqs.map((faq) => (
        <details
          key={faq.question}
          className="group border border-white/12 bg-[#101010] px-5 py-4 transition open:border-(--rock-steady-yellow)/40"
        >
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-(--rock-steady-yellow) [&::-webkit-details-marker]:hidden">
            <span className="text-lg font-black leading-6 text-white transition group-hover:text-(--rock-steady-yellow)">
              {faq.question}
            </span>
            <span
              aria-hidden="true"
              className="shrink-0 text-lg font-black text-(--rock-steady-yellow)"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">&minus;</span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl leading-7 text-white/72">
            {renderAnswer(faq.answer)}
          </p>
          {faq.links ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {faq.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  download
                  className="border border-white/15 bg-black/30 px-4 py-2 text-xs font-black uppercase text-white/88 transition hover:border-(--rock-steady-yellow) hover:text-(--rock-steady-yellow)"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </details>
      ))}
    </div>
  );
}
