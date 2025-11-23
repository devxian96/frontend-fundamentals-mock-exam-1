import { ListRow, Assets, colors } from 'tosslib';
import { formatNumber } from '@/pages/SavingsCalculatorPage/utils/formatNumber';
import type { FormInputs } from '@/pages/SavingsCalculatorPage';
import { useFormContext } from 'react-hook-form';
import { useGetSavingsProducts } from '@/pages/SavingsCalculatorPage/hooks/apis/savings-products';

interface Props {
  limit?: number;
  sortByRate?: boolean;
}

export function Products({ limit, sortByRate }: Props) {
  const { data: savingsProducts } = useGetSavingsProducts();

  const { setValue, watch } = useFormContext<FormInputs>();
  const monthlyPayment = watch('monthlyPayment');
  const savingsPeriod = watch('savingsPeriod');
  const selectedProductId = watch('selectedProductId');

  const filteredSavingsProducts =
    savingsProducts
      ?.filter(({ minMonthlyAmount, maxMonthlyAmount, availableTerms }) => {
        const hasValidMonthlyPayment =
          monthlyPayment !== undefined && Number.isFinite(monthlyPayment) && monthlyPayment > 0;

        const isMonthlyPaymentInRange =
          monthlyPayment !== undefined && minMonthlyAmount <= monthlyPayment && maxMonthlyAmount >= monthlyPayment;

        const matchesMonthlyPayment = !hasValidMonthlyPayment || isMonthlyPaymentInRange;
        const matchesSavingsPeriod = !savingsPeriod || availableTerms === savingsPeriod;

        return matchesMonthlyPayment && matchesSavingsPeriod;
      })
      .sort((a, b) => (sortByRate ? b.annualRate - a.annualRate : 0))
      .slice(0, limit) ?? [];

  const handleProductClick = (productId: `savings-${number}`) => () => {
    setValue('selectedProductId', productId);
  };

  return filteredSavingsProducts?.map(
    ({ id, name, annualRate, minMonthlyAmount, maxMonthlyAmount, availableTerms }) => (
      <ListRow
        key={id}
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={name}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={`연 이자율: ${annualRate}%`}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={`${formatNumber(minMonthlyAmount)}원 ~ ${formatNumber(maxMonthlyAmount)}원 | ${availableTerms}개월`}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        right={selectedProductId === id && <Assets.Icon name="icon-check-circle-green" />}
        onClick={handleProductClick(id)}
      />
    )
  );
}
