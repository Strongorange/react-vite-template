/**
 * 딜레이 함수입니다. await를 붙혀서 사용합니다.
 */
export const delay = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay))
