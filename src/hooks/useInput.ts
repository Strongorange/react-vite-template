import { ChangeEvent, useState } from "react"

interface IUseInput {
  initialValue?: string
  validate?: (...args: any) => any
  onChangeCallback?: (value: string) => void
}

/**
 * useInput 훅 설명:
 *
 * 이 훅은 입력 필드의 상태를 관리하고, 유효성 검증 및 입력값 변경 시 콜백을 실행하는 기능을 제공합니다.
 * - `initialValue`: 입력 필드의 초기값을 설정합니다.
 * - `validate`: 유효성 검증 함수로, 입력값이 변경될 때마다 검증이 실행됩니다.
 * - `onChangeCallback`: 입력값이 변경될 때 실행되는 콜백 함수입니다.
 *
 * @param {initialValue} - 입력 필드의 초기값 (기본값: 빈 문자열)
 * @param {validate} - 유효성 검증 함수
 * @param {onChangeCallback} - 입력값 변경 시 호출될 콜백 함수
 *
 * @returns { value, isValid, onChangeValue, resetValue, updateValue }
 *
 * - value: 현재 입력된 값
 * - isValid: 현재 값이 유효한지 여부 (true/false)
 * - onChangeValue: 입력값이 변경될 때 호출되는 핸들러 함수
 * - resetValue: 입력 필드의 값을 초기화하는 함수
 * - updateValue: 외부에서 값을 직접 설정하는 함수
 */

const useInput = ({
  initialValue = "",
  onChangeCallback,
  validate,
}: IUseInput) => {
  const [value, setValue] = useState(initialValue)
  const [isValid, setIsValid] = useState(true)

  const validateInput = (value: string) => {
    if (validate) {
      setIsValid(validate(value))
    }
  }

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (validate) {
      setIsValid(validate(value))
    }

    setValue(value)

    if (onChangeCallback) {
      onChangeCallback(value)
    }
  }

  const resetValue = () => {
    setValue(initialValue)
    setIsValid(true)
  }

  const updateValue = (value: string) => {
    setValue(value)
    validateInput(value)
  }

  return { value, isValid, onChangeValue, resetValue, updateValue }
}

export type UseInput = ReturnType<typeof useInput>

export default useInput

/**
 * 사용법:
 *
 * const idInput = useInput({
 *   initialValue: '',               // 초기값 설정
 *   validate: validation.signIn.id,  // 유효성 검증 함수
 *   onChangeCallback: (value) => {   // 입력 값이 변경될 때 호출되는 콜백
 *     console.log(value);
 *   }
 * });
 *
 * 1. value: 현재 입력된 값
 * 2. isValid: 유효성 검증 결과 (true/false)
 * 3. onChangeValue: 입력값이 변경될 때 호출되는 핸들러
 * 4. resetValue: 입력 필드를 초기값으로 리셋
 * 5. updateValue: 외부에서 입력값을 설정
 */
