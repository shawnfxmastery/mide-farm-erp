export function getTodayNigeria() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
  }).format(new Date());
}