import { useEffect, useRef, MutableRefObject } from "react"

// useScrollToBottom 커스텀 훅
const useScrollToBottom = (
  deps: any[] = [],
): MutableRefObject<HTMLDivElement | null> => {
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, deps)

  return chatEndRef
}

export default useScrollToBottom
