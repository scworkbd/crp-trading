import React, { ChangeEvent, useState } from "react"
import type { NextPage } from "next"
import DashPage from "../../../components/DashPage"
import Image from "next/image"
import { trpc } from "../../../utils/trpc"
import { BiLoaderAlt } from "react-icons/bi"
import { useSettings } from "../../../hooks/useSettings"
import { toast } from "react-hot-toast"
import CustomToast from "../../../components/CustomToast"

const Deposit: NextPage = () => {
  const { data: settings } = useSettings()
  const [loading, setLoading] = useState<boolean>(false)
  const [amount, setAmount] = useState<string>("")
  const [image, setImage] = useState<File | null>()
  const [tnx_id, setTnxId] = useState<string>("")

  const { mutate, isLoading } = trpc.useMutation(["user.depositCrypto"], {
    onSuccess: () => {
      setLoading(false)
      setAmount("")
      setImage(null)
      setTnxId("null")
      toast.success("Deposit succesfully.")
    },
    onError: (error) => {
      setLoading(false)
      toast.error(error.message)
    },
  })

  const selectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      setImage(file)
    }
  }

  const submit = async () => {
    if (!amount || !image || !tnx_id) {
      return toast.error("Please fill the form properly")
    }

    setLoading(true)

    const formData = new FormData()
    formData.append("image", image)

    const response = await fetch(
      `https://api.imgbb.com/1/upload?expiration=0&key=2ac2ca496312f19a7aa08296f6f8347f`,
      {
        method: "POST",
        body: formData,
      }
    )

    const data = await response.json()
    const image_url = data["data"]["display_url"]
    const amt = parseFloat(amount)
    if (!settings) return
    if (amt < settings.min_deposit) {
      return toast.error(`Minimum deposit ${settings.min_deposit} USDT`)
    }
    if (image_url) {
      mutate({
        amount: parseFloat(amount),
        tnx_id,
        image_url,
      })
    }
  }

  return (
    <DashPage>
      <div className="p-5">
        <div className="flex items-center justify-center gap-3 shadow-lg p-5 rounded-lg">
          <Image src="/usdt.png" width={50} height={50} alt="usdt" />
          <p className="text-2xl font-bold">USDT(TRC20)</p>
        </div>

        <p className="text-red-500 py-5 text-xl text-center mt-5">
          Minimum recharge amount is{" "}
          <span className="font-bold">{settings?.min_deposit}</span> USDT
        </p>

        <div className="flex flex-col gap-5 items-center">
          <Image src="/qr.webp" width={400} height={400} alt="qr" />

          <p className="font-bold">
            Scan the QR code or send to the address below
          </p>
          <p className="w-full p-5 border-2 border-black text-center">
            {settings?.cryptoAddress}
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(settings?.cryptoAddress as string)
              toast.custom(<CustomToast message="Copied to clipboard" />)
            }}
            className="text-white bg-indigo-600 px-3 py-1 rounded-md"
          >
            Copy Address
          </button>

          <div className="grid grid-cols-1 gap-3 w-full p-5 bg-zinc-200 rounded-md">
            <input
              type="number"
              placeholder="Amount"
              className="w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter Transaction ID"
              className="w-full"
              value={tnx_id}
              onChange={(e) => setTnxId(e.target.value)}
            />

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="file">Screenshot</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => selectImage(e)}
              />
            </div>

            <div className="w-full">
              <button
                type="button"
                onClick={submit}
                className="px-5 py-3 bg-black text-white rounded-md flex items-center gap-2"
              >
                <BiLoaderAlt
                  className={`text-2xl animate-spin ${
                    loading || isLoading ? "" : "hidden"
                  }`}
                />
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashPage>
  )
}

export default Deposit
