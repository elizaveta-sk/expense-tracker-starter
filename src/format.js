const wholeDollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const withCents = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

export function formatMoney(amount) {
  return Number.isInteger(amount) ? wholeDollars.format(amount) : withCents.format(amount);
}

const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

// "YYYY-MM-DD" is parsed as local time so the day doesn't shift across time zones.
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return shortDate.format(new Date(year, month - 1, day));
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
