import { SuccessRes } from "@src/types/serviceTypes"
import { isAxiosError } from "axios"

export interface ApiResponse<T> {
  success: boolean
  data?: T | null // 성공 시에는 T, 실패 시에는 null이 될 수 있도록 처리
  message?: string
  status?: number // 상태 코드 추가
}

export const returnErrorMessage = (error: unknown | Error): string => {
  if (isAxiosError(error)) {
    // 서버로부터 받은 응답이 있는 경우
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message // API 응답에서 메시지 추출
    } else {
      return "서버와의 통신 중 오류가 발생했습니다." // 응답이 없을 때 기본 메시지
    }
  }

  // 일반적인 에러 처리
  if (error instanceof Error) {
    return error.message // JavaScript Error 객체의 메시지 반환
  }

  // 알 수 없는 에러 처리
  return "알 수 없는 오류가 발생했습니다."
}

export const handleError = (error: unknown): ApiResponse<null> => {
  let statusCode = 0 // 기본 상태 코드

  if (isAxiosError(error)) {
    statusCode = error.response?.status ?? 0 // 상태 코드가 있으면 설정

    if (statusCode === 500) {
      return {
        success: false,
        data: null, // 실패 시 data는 null로 반환
        message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        status: statusCode,
      }
    }

    return {
      success: false,
      data: null,
      message: returnErrorMessage(error),
      status: statusCode,
    }
  }

  return {
    success: false,
    data: null,
    message: "알 수 없는 오류가 발생했습니다.",
    status: statusCode, // 알 수 없는 오류에도 상태 코드를 0으로 반환
  }
}

export const handleApiResponse = async <T>(
  apiCall: Promise<SuccessRes<T>>,
): Promise<ApiResponse<T | null>> => {
  // T | null을 반환
  try {
    const response = await apiCall
    // console.log("성공인디!", response)
    return {
      success: true,
      data: response.data ?? null, // 데이터가 없을 경우 null 반환
      status: response.status, // 성공 시 상태 코드 추가
    }
  } catch (error) {
    // console.log("에러라고?", error)
    return handleError(error) // 실패 시 handleError의 결과 사용
  }
}
