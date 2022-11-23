import React, { useState } from "react"
import { toast } from "react-hot-toast"
import { useSettings } from "../hooks/useSettings"
// import CustomToast from "./CustomToast"

const CopyNumberForm = ({ method }: { method: "bkash" | "nagad" | "upay" }) => {
  const { data: settings } = useSettings()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [text, setText] = useState<"Copy" | "Copied">("Copy")

  console.log(settings)

  const copyNumber = () => {
    navigator.clipboard.writeText(inputRef.current?.value as string)
    setText("Copied")
    toast.success("Copied!")

    setTimeout(() => {
      setText("Copy")
    }, 2000)
  }

  return (
    <div className="flex items-center mt-3 w-full">
      <input
        ref={inputRef}
        type="text"
        value={
          method === "bkash"
            ? settings?.bkash
            : method === "nagad"
            ? settings?.nagad
            : settings?.upay
        }
        className="border-0 !p-0 w-full  text-black"
        disabled
      />
      <button
        onClick={copyNumber}
        className="px-5 py-2 bg-black text-white w-max rounded-md"
      >
        {text}
      </button>
    </div>
  )
}

export default CopyNumberForm
