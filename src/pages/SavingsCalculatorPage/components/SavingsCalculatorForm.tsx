import type { ChangeEvent } from 'react';
import { TextField, SelectBottomSheet, Spacing } from 'tosslib';
import type { FormInputs } from '@/pages/SavingsCalculatorPage';
import type { UseFormSetValue, Control } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { formatNumber } from '@/pages/SavingsCalculatorPage/utils/formatNumber';

interface Props {
  setValue: UseFormSetValue<FormInputs>;
  control: Control<FormInputs>;
}

export function SavingsCalculatorForm({ setValue, control }: Props) {
  const savingsPeriod = useWatch({ control, name: 'savingsPeriod' });
  const targetAmount = useWatch({ control, name: 'targetAmount' });
  const monthlyPayment = useWatch({ control, name: 'monthlyPayment' });

  const handleNumberChange = (fieldName: 'targetAmount' | 'monthlyPayment') => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const numericValue = event.target.value.replace(/,/g, '').replace(/[^0-9]/g, '');

      if (numericValue === '') {
        setValue(fieldName, undefined);
      } else {
        const numberValue = parseInt(numericValue, 10);
        setValue(fieldName, numberValue);
      }
    };
  };

  return (
    <>
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={formatNumber(targetAmount)}
        onChange={handleNumberChange('targetAmount')}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={formatNumber(monthlyPayment)}
        onChange={handleNumberChange('monthlyPayment')}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={savingsPeriod}
        onChange={value => setValue('savingsPeriod', value)}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>
    </>
  );
}
