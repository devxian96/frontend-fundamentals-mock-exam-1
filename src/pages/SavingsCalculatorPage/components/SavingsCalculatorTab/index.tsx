import { useState } from 'react';
import { Tab } from 'tosslib';
import { ProductsTab } from '@/pages/SavingsCalculatorPage/components/SavingsCalculatorTab/ProductsTab';

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

      {selected === 'products' && <ProductsTab />}
    </>
  );
}
