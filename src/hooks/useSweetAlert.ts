import Swal, { SweetAlertIcon } from "sweetalert2"
import "sweetalert2/src/sweetalert2.scss"

export default function useSweetAlert() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })

  const showToast = (icon: SweetAlertIcon, title: string, timer?: number) => {
    console.log(timer)
    Toast.fire({
      icon: icon,
      title: title,
      timer: timer || 3000,
    })
  }

  const showSuccess = (message: string) => {
    Swal.fire({
      title: "성공!",
      text: message,
      icon: "success",
      confirmButtonText: "Cool",
    })
  }

  const showError = (message: string) => {
    Swal.fire({
      title: "에러!",
      text: message,
      icon: "error",
      confirmButtonText: "Okay",
    })
  }

  const showConfirmation = (
    title: string,
    message: string,
    onConfirm: () => void,
  ) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm()
      }
    })
  }

  const showInputType = (
    title: string,
    message: string,
    onSubmit: (value: string) => void,
  ) => {
    Swal.fire({
      title: title,
      input: "text",
      inputLabel: message,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "공백으로 전송할 수 없습니다."
        }
      },
    }).then((result) => onSubmit(result.value))
  }

  return { showSuccess, showError, showConfirmation, showToast, showInputType }
}
