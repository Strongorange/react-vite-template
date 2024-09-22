import useModal from "@src/hooks/useModal"
import { ReactNode, useState } from "react"
import styled, { keyframes } from "styled-components"

/**
----------------------------------------------- 🛠️ 타입 🛠️ -----------------------------------------------
----------------------------------------------- 🛠️ 타입 🛠️ -----------------------------------------------
*/
interface IModalLayout {
  children?: ReactNode
}

/**
----------------------------------------------- 🎨 스타일 🎨 -----------------------------------------------
----------------------------------------------- 🎨 스타일 🎨 -----------------------------------------------
*/
const fadeIn = keyframes`
    from {
        opacity: 0;
    } 
    to  {
        opacity: 1
    }
`

const fadeOut = keyframes`
    from {
        opacity: 1;
    } to {
        opacity: 0;
    }
`

/**
----------------------------------------------- 🎨 스타일 🎨 -----------------------------------------------
----------------------------------------------- 🎨 스타일 🎨 -----------------------------------------------
*/
const Backdrop = styled.div<{ $isVisible: boolean }>`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 11;

  animation: ${({ $isVisible }) => ($isVisible ? fadeIn : fadeOut)} 0.3s
    forwards;
`

/**
----------------------------------------------- 🖼️ 렌더링 🖼️ -----------------------------------------------
----------------------------------------------- 🖼️ 렌더링 🖼️  -----------------------------------------------
*/

const ModalLayout = ({ children }: IModalLayout) => {
  const { closeLast } = useModal("")
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false) // Fade-out 애니메이션 시작
    setTimeout(() => {
      closeLast() // 애니메이션 후 모달 닫기
    }, 300) // 애니메이션 시간과 맞춤
  }

  return (
    <Backdrop $isVisible={isVisible} onClick={handleClose}>
      {children}
    </Backdrop>
  )
}

export default ModalLayout
