import type { ReactNode } from 'react';

interface Props {
  expression: unknown;
  true: ReactNode;
  false: ReactNode;
}

/**
 * 조건에 따라 다른 컴포넌트를 렌더링합니다.
 * @param expression 조건 (truthy/falsy 값으로 평가됨)
 * @param true 조건이 참일 때 렌더링할 컴포넌트
 * @param false 조건이 거짓일 때 렌더링할 컴포넌트
 * @returns 조건에 따라 다른 컴포넌트
 */
export function If({ expression, true: TrueComponent, false: FalseComponent }: Props) {
  return expression ? TrueComponent : FalseComponent;
}
