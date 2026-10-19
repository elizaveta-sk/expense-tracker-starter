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

// Today's date as "YYYY-MM-DD" in local time. toISOString() would use UTC and can be a day off.
export function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
