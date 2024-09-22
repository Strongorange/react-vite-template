import { useDaumPostcodePopup } from "react-daum-postcode"

interface IUsePostCode {
  updateValue: (value: string) => void
}

const usePostCode = ({ updateValue }: IUsePostCode) => {
  const open = useDaumPostcodePopup()

  const handleComplete = (data: any) => {
    let fullAddress = data.address
    let extraAddress = ""

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : ""
    }

    updateValue(fullAddress)
    console.log(fullAddress)
  }

  const handleClick = () => {
    open({ onComplete: handleComplete })
  }

  return { handleClick }
}

export default usePostCode
