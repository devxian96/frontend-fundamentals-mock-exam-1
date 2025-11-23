import { ListRow, Assets, colors } from 'tosslib';
import { useGetSavingsProducts } from '@/pages/SavingsCalculatorPage/hooks/apis/savings-products';

export function ProductsTab() {
  const { data: savingsProducts } = useGetSavingsProducts();

  return savingsProducts?.map(({ id, name, annualRate, minMonthlyAmount, maxMonthlyAmount, availableTerms }) => (
    <ListRow
      key={id}
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={name}
          topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
          middle={`연 이자율: ${annualRate}%`}
          middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
          bottom={`${minMonthlyAmount.toLocaleString()}원 ~ ${maxMonthlyAmount.toLocaleString()}원 | ${availableTerms}개월`}
          bottomProps={{ fontSize: 13, color: colors.grey600 }}
        />
      }
      right={<Assets.Icon name="icon-check-circle-green" />}
      onClick={() => {}}
    />
  ));
}
