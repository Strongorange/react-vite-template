// import { PaginationType } from "@src/types/common.type"
// import { SuccessRes } from "@src/types/serviceTypes"
// import {
//   AdminBookDetailType,
//   AdminBookResponseType,
//   LibraryBookListPayload,
// } from "@src/types/book.type"
// import ApiAdminClient from "./ApiAdminClient"

// class ContentService extends ApiAdminClient {
//   constructor() {
//     super(`${import.meta.env.VITE_BASE_URL}/content`)
//     // super(`http://localhost:4567/content`)
//   }

//   uploadBook = async (payload: FormData) => {
//     const data = await this.post<SuccessRes>("/upload-book", payload, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     return data
//   }

//   getBookList = async (payload: LibraryBookListPayload) => {
//     const data = await this.get<
//       SuccessRes<PaginationType<AdminBookResponseType>>
//     >("/books", {
//       params: payload,
//     })
//     return data.data
//   }

//   getBookDetail = async (id: number) => {
//     const data = await this.get<SuccessRes<AdminBookDetailType>>(
//       "/book/detail",
//       {
//         params: {
//           id,
//         },
//       },
//     )
//     return data.data
//   }

//   editBookMetadata = async (payload: FormData) => {
//     const data = await this.patch("/update-book", payload, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     return data
//   }

//   editBookPageImage = async (payload: FormData) => {
//     const data = await this.patch("/update-book/image", payload, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     return data
//   }

//   editBookPageContent = async (payload: {
//     book_page_id: number
//     content: string
//   }) => {
//     const data = await this.patch("/update-book/page", payload)
//     return data
//   }

//   deleteBook = async (ids: number[]) => {
//     const data = await this.delete("/books", {
//       data: { book_ids: ids },
//     })
//     return data
//   }

//   addNewPage = async (payload: FormData) => {
//     const data = await this.post("/add-book-page", payload, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     return data
//   }
// }

// export default new ContentService()
