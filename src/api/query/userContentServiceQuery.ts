// import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
// import UserContentService from "../UserContentService"
// import { LibraryBookListPayload } from "@src/types/book.type"

// export const BOOK_QUIZ_QUERY_KEY = ["bookQuiz"]

// export const useLibraryBookList = (payload: LibraryBookListPayload) => {
//   const { perPage, category, unit, keyword } = payload
//   return useInfiniteQuery({
//     queryKey: ["library-book-list", perPage, category, unit, keyword],
//     queryFn: ({ pageParam = 1 }) =>
//       UserContentService.getLibraryBookList({ ...payload, pageNum: pageParam }),
//     getNextPageParam: (lastPage, pages) => {
//       console.log(lastPage)
//       return lastPage?.hasNextPage ? lastPage.currentPage / 1 + 1 : undefined
//     },
//     initialPageParam: 1,
//   })
// }

// export const useBookInformation = (id: number) => {
//   return useQuery({
//     queryKey: ["book-information", id],
//     queryFn: () => UserContentService.getBookInformation(id),
//   })
// }

// export const useBookReadData = (id: number) => {
//   return useQuery({
//     queryKey: ["book-read", id],
//     queryFn: () => UserContentService.getBookRead(id),
//   })
// }

// export const useBookQuiz = (bookId: number) => {
//   return useQuery({
//     queryKey: [...BOOK_QUIZ_QUERY_KEY],
//     queryFn: () => UserContentService.getBookQuiz(bookId),
//   })
// }
