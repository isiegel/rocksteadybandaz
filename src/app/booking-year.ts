export function getBookingYear(date = new Date()) {
  const phoenixYear = Number(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Phoenix',
      year: 'numeric',
    }).format(date),
  );

  return phoenixYear + 1;
}

export const bookingYear = getBookingYear();
