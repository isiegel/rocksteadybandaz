export type BookerFaqLink = {
  label: string;
  href: string;
};

export type BookerFaq = {
  question: string;
  answer: string;
  /** Optional download/related links shown under the answer (not in schema). */
  links?: BookerFaqLink[];
};

const stagePlotLink: BookerFaqLink = {
  label: 'Stage plot PDF',
  href: '/press-kit/rock-steady-stage-plot.pdf',
};

const inputListLink: BookerFaqLink = {
  label: 'Input list PDF',
  href: '/press-kit/rock-steady-input-list.pdf',
};

/** Matches [label](href) inline links in answer text. */
export const ANSWER_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Answer with inline links reduced to their labels, for FAQPage schema text. */
export function plainAnswerText(answer: string): string {
  return answer.replace(ANSWER_LINK_PATTERN, '$1');
}

// Answers drive both the visible FAQ and the FAQPage structured data. They
// support [label](href) inline links, which render as links on the page and
// collapse to plain text in the schema — no other markup.
export const bookerFaqs: BookerFaq[] = [
  {
    question: 'Do you bring your own sound system?',
    answer:
      'Yes — we bring our own [professional PA](/press#production) and run it ourselves: full, clear, and dialed in to fit your room. If your room has house production, we are happy to coordinate with your sound team instead. The stage plot and input list are available on this page.',
    links: [stagePlotLink, inputListLink],
  },
  {
    question: 'How long do you play?',
    answer:
      'Set lengths are flexible — up to three sets across a typical 8 PM to midnight night, with breaks timed to keep the room moving. Tell us your schedule and we will build the night around it.',
  },
  {
    question: 'What kind of music can we expect?',
    answer:
      "Classic rock, sing-alongs from the '70s to today, and dance-floor bar favorites — Joan Jett, Heart, ZZ Top, AC/DC, Tom Petty and more — played with faithful arrangements that sound like the records. A sample song list is available on this page, and the full set bends to the room.",
  },
  {
    question: 'What kinds of events do you play?',
    answer:
      'Bars and restaurants, patios and outdoor spaces, private parties, corporate events, charity nights, and neighborhood events across the Phoenix area.',
  },
  {
    question: 'How far will you travel?',
    answer:
      'We play all across the Valley — Phoenix, Scottsdale, Tempe, Mesa, Chandler, Gilbert, Glendale, Peoria, and the surrounding communities. If you are nearby but not on that list, ask — the answer is usually yes.',
  },
  {
    question: 'How much does it cost to book the band?',
    answer:
      'Every night is a little different — pricing depends on the date, location, set length, and sound needs. Send the details through the booking form and we will come back with a straightforward quote.',
  },
  {
    question: 'How much space does the band need?',
    answer:
      'We are a full band, but we adapt to real rooms — indoor stages, corners, and patios. The downloadable stage plot on this page shows our ideal layout; if your space is tight, email us and we will figure out what works.',
    links: [stagePlotLink],
  },
  {
    question: 'How far in advance should we book?',
    answer:
      'Weekend dates fill first — some venues book us months out. If your date is coming up fast, ask anyway; if it is open, we will make it easy.',
  },
];
