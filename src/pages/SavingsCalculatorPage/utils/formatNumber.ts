/**
 * 숫자를 쉼표로 포맷팅하는 함수
 * @param value - 포맷팅할 숫자
 * @returns 포맷팅된 숫자
 */
export const formatNumber = (value?: number) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '';
  }
  return Math.round(value).toLocaleString('ko-KR');
};
