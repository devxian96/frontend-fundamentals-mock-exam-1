import { useState } from 'react';
import { Tab } from 'tosslib';
import { Products } from '@/pages/SavingsCalculatorPage/components/SavingsCalculatorTab/Products';
import { Results } from '@/pages/SavingsCalculatorPage/components/SavingsCalculatorTab/Results';

export function SavingsCalculatorTab() {
  const [selected, setSelected] = useState('products');

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

      {selected === 'products' && <Products />}
      {selected === 'results' && <Results />}
    </>
  );
}
