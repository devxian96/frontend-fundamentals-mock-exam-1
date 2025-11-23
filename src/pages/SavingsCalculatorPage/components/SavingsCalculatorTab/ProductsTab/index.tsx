import { ListRow, Assets, colors } from 'tosslib';
import type { SavingsProductResponse } from '@/pages/SavingsCalculatorPage/hooks/apis/savings-products/type';
import { formatNumber } from '@/pages/SavingsCalculatorPage/utils/formatNumber';

interface Props {
  savingsProducts: SavingsProductResponse;
}

export function ProductsTab({ savingsProducts }: Props) {
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
          bottom={`${formatNumber(minMonthlyAmount)}원 ~ ${formatNumber(maxMonthlyAmount)}원 | ${availableTerms}개월`}
          bottomProps={{ fontSize: 13, color: colors.grey600 }}
        />
      }
      right={<Assets.Icon name="icon-check-circle-green" />}
      onClick={() => {}}
    />
  ));
}
