import { useState } from 'react';
import { Tab } from 'tosslib';
import { useWatch } from 'react-hook-form';
import { ProductsTab } from '@/pages/SavingsCalculatorPage/components/SavingsCalculatorTab/ProductsTab';
import { useGetSavingsProducts } from '@/pages/SavingsCalculatorPage/hooks/apis/savings-products';
import type { FormInputs } from '@/pages/SavingsCalculatorPage';
import type { Control } from 'react-hook-form';

interface Props {
  control: Control<FormInputs>;
}

export function SavingsCalculatorTab({ control }: Props) {
  const [selected, setSelected] = useState('products');

  const { data: savingsProducts } = useGetSavingsProducts();

  const monthlyPayment = useWatch({ control, name: 'monthlyPayment' });
  const savingsPeriod = useWatch({ control, name: 'savingsPeriod' });

  const filteredSavingsProducts =
    savingsProducts?.filter(({ minMonthlyAmount, maxMonthlyAmount, availableTerms }) => {
      const hasValidMonthlyPayment =
        monthlyPayment !== undefined && Number.isFinite(monthlyPayment) && monthlyPayment > 0;
      const matchesMonthlyPayment =
        !hasValidMonthlyPayment ||
        (monthlyPayment !== undefined && minMonthlyAmount <= monthlyPayment && maxMonthlyAmount >= monthlyPayment);
      const matchesSavingsPeriod = !savingsPeriod || availableTerms === savingsPeriod;

      return matchesMonthlyPayment && matchesSavingsPeriod;
    }) ?? [];

  return (
    <>
      <Tab onChange={setSelected}>
        <Tab.Item value="products" selected={selected === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selected === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {selected === 'products' && <ProductsTab savingsProducts={filteredSavingsProducts} />}
    </>
  );
}
