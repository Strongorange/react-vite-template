import { ReactNode } from "react"
import ReactDOM from "react-dom"

interface IModalPortal {
  children: ReactNode
}

const ModalPortal = ({ children }: IModalPortal) => {
  const el = document.getElementById("modal")

  if (!el) return null

  return ReactDOM.createPortal(children, el)
}

export default ModalPortal
