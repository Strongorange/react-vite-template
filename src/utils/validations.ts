/**
 * Input이나 기타 값들의 유효성 검증 함수를 작성하는 곳
 */

import dayjs from "dayjs"

const validation = {
  signUp: {
    id: (value: string) => /^[A-Za-z0-9]+$/.test(value) && value.length >= 6,
    password: (value: string) => /^(?=.*[0-9]).{8,}$/.test(value),
    passwordCheck: (password: string, passwordCheck: string) => {
      return password === passwordCheck
    },
    email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value: string): boolean => /^\d{3}-\d{3,4}-\d{4}$/.test(value),
    birth: (value: string) => dayjs(value, "YYYY-MM-DD", true).isValid(),
    code: (value: string): boolean => /^\d{6}$/.test(value),
  },
  signIn: {
    id: (value: string) => /^[A-Za-z0-9]+$/.test(value) && value.length >= 6,
    password: (value: string) => /^(?=.*[0-9]).{8,}$/.test(value),
  },
  findId: {
    phone: (value: string): boolean => /^\d{3}-\d{3,4}-\d{4}$/.test(value),
    email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  },
  resetPassword: {
    password: (value: string) => /^(?=.*[0-9]).{8,}$/.test(value),
    passwordCheck: (password: string, passwordCheck: string) =>
      password === passwordCheck,
  },
}

export default validation
