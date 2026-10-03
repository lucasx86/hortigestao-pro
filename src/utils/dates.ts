import type { FifoStatus } from "../types/inventory";

export function getDaysUntilExpiration(date: string): number {
  const today = new Date();
  const expiration = new Date(`${date}T23:59:59`);

  today.setHours(0, 0, 0, 0);

  return Math.ceil(
    (expiration.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function getFifoStatus(date: string): FifoStatus {
  const days = getDaysUntilExpiration(date);

  if (days <= 3) return "critical";
  if (days <= 7) return "attention";

  return "ok";
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(`${date}T12:00:00`));
}
