import { TransactionType, TranscationPaymentMethod } from "@prisma/client";

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [TranscationPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [TranscationPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [TranscationPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [TranscationPaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [TranscationPaymentMethod.CASH]: "money.svg",
  [TranscationPaymentMethod.PIX]: "pix.svg",
  [TranscationPaymentMethod.OTHER]: "other.svg",
};

export const TRANSACTION_CATEGORY_LABELS = {
  HOUSING: "Habitação",
  TRANSPORTATION: "Transporte",
  FOOD: "Alimentação",
  ENTERTAIMENT: "Entretenimento",
  HEALTH: "Saúde",
  UTILITY: "Utilidades",
  SALARY: "Salário",
  EDUCATION: "Educação",
  OTHER: "Outros",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  CREDIT_CARD: "Cartão de Credito",
  DEBIT_CARD: "Cartão de Debito",
  BANK_TRANSFER: "Transferência",
  BANK_SLIP: "Boleto",
  CASH: "Dinheiro",
  PIX: "Pix",
  OTHER: "Outros",
};

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
];

export const PAYMENT_METHOD_OPTIONS = Object.entries(
  TRANSACTION_PAYMENT_METHOD_LABELS,
).map(([value, label]) => ({
  value: value,
  label: label,
}));

export const TRANSACTION_CATEGORY_OPTIONS = Object.entries(
  TRANSACTION_CATEGORY_LABELS,
).map(([value, label]) => ({
  value: value,
  label: label,
}));
