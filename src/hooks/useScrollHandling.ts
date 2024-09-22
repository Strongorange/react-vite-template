import { useEffect, RefObject } from "react"
import throttle from "lodash/throttle"

const useScrollHandling = (
  fetchNextPage: () => void,
  hasNextPage: boolean,
  deps: any[] = [],
  contentRef: RefObject<HTMLDivElement>,
) => {
  // 스크롤 맨 아래로 이동
  const scrollToBottom = (type: "instant" | "smooth" = "instant") => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: type,
      })
    }
  }

  // 스크롤이 상단 25% 이내일 때 이전 페이지 페칭
  const fetchPrev = throttle(() => {
    if (!contentRef.current) return
    const { scrollTop, scrollHeight } = contentRef.current
    if (scrollTop <= scrollHeight * 0.25 && hasNextPage) {
      fetchNextPage()
    }
  }, 300)

  useEffect(() => {
    if (!contentRef.current) return

    const handleScroll = () => {
      fetchPrev()
    }

    const ref = contentRef.current
    ref.addEventListener("scroll", handleScroll)

    return () => {
      ref.removeEventListener("scroll", handleScroll)
    }
  }, [hasNextPage, fetchNextPage, ...deps])

  return { contentRef, scrollToBottom }
}

export default useScrollHandling
