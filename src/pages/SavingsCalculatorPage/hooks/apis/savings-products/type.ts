interface SavingsProduct {
  annualRate: number;
  availableTerms: number;
  id: `savings-${number}`;
  maxMonthlyAmount: number;
  minMonthlyAmount: number;
  name: string;
}

export type SavingsProductResponse = SavingsProduct[];
