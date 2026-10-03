export type InventoryUnit = "kg" | "un" | "cx";

export type FifoStatus =
  | "critical"
  | "attention"
  | "ok"
  | "expired";

export type MovementType = "entrada" | "saida" | "ajuste" | "perda";

export type LossReason =
  | "validade"
  | "avaria"
  | "deterioracao"
  | "furto"
  | "descarte";

export interface InventoryBatch {
  id: string;
  productId: string;
  product: string;
  category: string;
  batchCode: string;
  quantity: number;
  unit: InventoryUnit;
  entryDate: string;
  expirationDate: string;
  unitCost: number;
  supplier: string;
  status: FifoStatus;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  unit: InventoryUnit;
  minimumStock: number;
  currentStock: number;
  averageCost: number;
  salePrice: number;
  active: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  city: string;
  active: boolean;
}

export interface StockMovement {
  id: string;
  type: MovementType;
  product: string;
  quantity: number;
  unit: InventoryUnit;
  date: string;
  description: string;
  responsible: string;
}

export interface LossRecord {
  id: string;
  product: string;
  quantity: number;
  unit: InventoryUnit;
  reason: LossReason;
  date: string;
  value: number;
  responsible: string;
}

export interface FinancialTransaction {
  id: string;
  description: string;
  type: "entrada" | "saida";
  category: string;
  value: number;
  date: string;
  status: "pago" | "pendente";
}
