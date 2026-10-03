export function currency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function number(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function daysUntil(date: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(`${date}T00:00:00`);
  target.setHours(0, 0, 0, 0);

  return Math.ceil(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function expirationStatus(date: string) {
  const days = daysUntil(date);

  if (days < 0) return "expired";
  if (days <= 3) return "critical";
  if (days <= 7) return "attention";
  return "normal";
}

export function expirationLabel(date: string) {
  const days = daysUntil(date);

  if (days < 0) return `Vencido há ${Math.abs(days)}d`;
  if (days === 0) return "Vence hoje";
  if (days === 1) return "Vence amanhã";

  return `${days} dias`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR").format(
    new Date(`${date}T00:00:00`)
  );
}
