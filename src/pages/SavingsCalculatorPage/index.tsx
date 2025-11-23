import { FormProvider, useForm } from 'react-hook-form';
import {
  Border,
  // ListHeader,
  NavigationBar,
  Spacing,
} from 'tosslib';
import { SavingsCalculatorForm } from '@/pages/SavingsCalculatorPage/components/SavingsCalculatorForm';
import { SavingsCalculatorTab } from '@/pages/SavingsCalculatorPage/components/SavingsCalculatorTab';

export interface FormInputs {
  targetAmount?: number;
  monthlyPayment?: number;
  savingsPeriod: number;
  selectedProductId: `savings-${number}`;
}

export function SavingsCalculatorPage() {
  const methods = useForm<FormInputs>({
    defaultValues: { savingsPeriod: 12 },
  });

  return (
    <FormProvider {...methods}>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <SavingsCalculatorForm />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <SavingsCalculatorTab />

      <Spacing size={8} />
    </FormProvider>
  );
}
