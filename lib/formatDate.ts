export function formatDate(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("fr-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
