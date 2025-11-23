import { ListRow, colors, Spacing, Border, ListHeader } from 'tosslib';
import { useFormContext } from 'react-hook-form';
import type { FormInputs } from '@/pages/SavingsCalculatorPage';
import { Empty } from './Empty';
import { If } from '@/components/If';
import { formatNumber } from '@/pages/SavingsCalculatorPage/utils/formatNumber';
import { useGetSavingsProducts } from '@/pages/SavingsCalculatorPage/hooks/apis/savings-products';

export function Results() {
  const { watch } = useFormContext<FormInputs>();
  const selectedProductId = watch('selectedProductId');
  const targetAmount = watch('targetAmount') ?? 0;
  const monthlyPayment = watch('monthlyPayment') ?? 0;
  const savingsPeriod = watch('savingsPeriod');

  const { data: savingsProducts } = useGetSavingsProducts();
  const selectedProduct = savingsProducts?.find(({ id }) => id === selectedProductId);
  const annualRate = selectedProduct?.annualRate ?? 0;

  // * 예상 수익 금액: 최종 금액 = 월 납입액 * 저축 기간 * (1 + 연이자율 * 0.5)
  const expectedProfit = monthlyPayment * savingsPeriod * (1 + annualRate * 0.5);

  // * 목표 금액과의 차이: 목표 금액과의 차이 = 목표 금액 - 예상 수익 금액
  const difference = targetAmount - expectedProfit;

  // * - 추천 월 납입 금액: 월 납입액 = 목표 금액 ÷ (저축 기간 * (1 + 연이자율 * 0.5))
  const recommendedMonthlyPayment = targetAmount / (savingsPeriod * (1 + annualRate * 0.5));

  return (
    <>
      <If
        expression={selectedProductId}
        true={
          <>
            <ListRow
              contents={
                <ListRow.Texts
                  type="2RowTypeA"
                  top="예상 수익 금액"
                  topProps={{ color: colors.grey600 }}
                  bottom={`${formatNumber(expectedProfit)}원`}
                  bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                />
              }
            />
            <ListRow
              contents={
                <ListRow.Texts
                  type="2RowTypeA"
                  top="목표 금액과의 차이"
                  topProps={{ color: colors.grey600 }}
                  bottom={`${formatNumber(difference)}원`}
                  bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                />
              }
            />
            <ListRow
              contents={
                <ListRow.Texts
                  type="2RowTypeA"
                  top="추천 월 납입 금액"
                  topProps={{ color: colors.grey600 }}
                  bottom={`${formatNumber(recommendedMonthlyPayment)}원`}
                  bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
                />
              }
            />
          </>
        }
        false={<Empty />}
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={'기본 정기적금'}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={`연 이자율: 3.2%`}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={`100,000원 ~ 500,000원 | 12개월`}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        onClick={() => {}}
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={'고급 정기적금'}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={`연 이자율: 2.8%`}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={`50,000원 ~ 1,000,000원 | 24개월`}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        onClick={() => {}}
      />

      <Spacing size={40} />
    </>
  );
}
