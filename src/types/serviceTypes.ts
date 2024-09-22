/**
 * API 리턴 타입
 */
export interface SuccessRes<T = undefined> {
  status: number
  message: string
  data?: T
}

// 페이지가 있는 조회 타입
export type BaseListQuery = {
  perPage: number
  pageNum: number
  keyword: string
}

// keyword가 없는 조회 타입
export type PageListQuery = Omit<BaseListQuery, "keyword">

/**
 * 페이지가 있는 조회의 리턴 타입
 * <SuccessRes<PaginationListData<UserUsage>>>
 */
export interface PaginationListData<T> {
  items: T[]
  totalCnt: number
  totalPages: number
  currentPage: number
  hasPrevious: boolean
  hasNext: boolean
}
