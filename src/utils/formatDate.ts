// convert timestap a fecha
export function formatDate(timestamp: number | string | Date): string {
  if (!timestamp) return "Fecha no disponible";

  const date = new Date(Number(timestamp));
  if (isNaN(date.getTime())) return "Fecha inválida";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
