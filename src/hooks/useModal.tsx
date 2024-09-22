import ModalLayout from "@src/components/common/ModalLayout"
import ModalPortal from "@src/components/common/ModalPortal"
import { useAppDispatch, useAppSelector } from "@src/redux/hook"
import {
  openModal,
  closeModal,
  closeAllModals,
  closeLastModal,
} from "@src/redux/slices/modalSlice"
import { ReactNode, useEffect } from "react"

// "" 타입은 가장 최근 모달 혹은 전체 모달 끌때 사용 (어느 id를 넘겨도 closeAll 혹은 closeLast는 똑같이 동작함)
type ModalId =
  | ""
  | "startLevelTest"
  | "selectCharacter"
  | "alertModal"
  | "addShop"
  | "userInfo"
  | "coverModal"
  | "editBook"
  | "productHistoryReceipt"
  | "userInfoRegistryShop"
  | "userInfoProductUsageList"

/**
 * useModal 훅 설명:
 *
 * 이 훅은 Redux에서 관리하는 모달의 상태를 제어하고,
 * 모달의 열림/닫힘, 마지막 모달 닫기, 모든 모달 닫기 등의 기능을 제공합니다.
 * 모달이 열리면 body 스크롤을 막고, 모든 모달이 닫히면 스크롤을 다시 활성화합니다.
 *
 * @param modalId - 관리하려는 모달의 고유 ID
 * @returns { isOpen, open, close, closeAll, closeLast, renderModal }
 *
 * - isOpen: 현재 모달이 열려 있는지 여부
 * - open: 모달 열기 함수
 * - close: 모달 닫기 함수
 * - closeAll: 모든 모달을 닫는 함수
 * - closeLast: 마지막으로 열린 모달을 닫는 함수
 * - renderModal: 모달을 렌더링하는 함수로, JSX로 children을 받음
 */

const useModal = (modalId: ModalId) => {
  const dispatch = useAppDispatch()
  const modals = useAppSelector((state) => state.modal.modals)
  const isOpen = useAppSelector((state) =>
    state.modal.modals.some((modal) => modal.id === modalId && modal.isOpen),
  )

  const open = () => {
    dispatch(openModal(modalId))
  }

  const close = () => {
    dispatch(closeModal(modalId))
  }

  const closeAll = () => {
    dispatch(closeAllModals())
  }

  const closeLast = () => {
    dispatch(closeLastModal())
  }

  const renderModal = (children: ReactNode) => {
    if (!isOpen) return null

    return (
      <ModalPortal>
        <ModalLayout>{children}</ModalLayout>
      </ModalPortal>
    )
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else if (modals.length === 0) {
      document.body.style.overflow = "auto"
    }

    return () => {
      if (modals.length === 0) {
        document.body.style.overflow = "auto"
      }
    }
  }, [isOpen, modals])

  return { isOpen, open, close, closeAll, closeLast, renderModal, modals }
}

export default useModal

/**
 * 사용법:
 *
 * const { isOpen, open, close, closeAll, closeLast, renderModal } = useModal('myModalId')
 *
 * 1. 모달 열기: open()
 * 2. 모달 닫기: close()
 * 3. 마지막 모달 닫기: closeLast()
 * 4. 모든 모달 닫기: closeAll()
 * 5. 모달 렌더링:
 *    {renderModal(
 *      <div onClick={e => e.stopPropagation()}>
 *        <h2>모달 내용</h2>
 *        <button onClick={close}>Close Modal</button>
 *      </div>
 *    )}
 */
