/**
 * 111-2222-3333 형식으로 핸드폰 번호 변경
 */
export const toKoreanPhoneNumber = (rawNumber: string | number): string => {
    const formattedNumber = String(rawNumber).replace(
      /(\d{3})(\d{4})(\d{4})/,
      "$1-$2-$3",
    )
    return formattedNumber
  }
  