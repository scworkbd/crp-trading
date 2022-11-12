import React, { useEffect, useState } from "react"
import type { NextPage } from "next"
import DashPage from "../../../components/DashPage"
import { useAccount } from "../../../hooks/useAccount"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { trpc } from "../../../utils/trpc"
import { useSettings } from "../../../hooks/useSettings"
import { useRouter } from "next/router"
import CustomToast from "../../../components/CustomToast"
import Image from "next/image"
import { BiLoaderAlt } from "react-icons/bi"

const CryptoWithdraw: NextPage = () => {
  const router = useRouter()
  const { data: settings } = useSettings()
  const { data: account, refetch } = useAccount()

  // States
  const [amount, setAmount] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const enableButton = Boolean(parseFloat(amount) || 0)

  // Mutator
  const { mutate, isLoading } = trpc.useMutation(["user.withdrawCrypto"], {
    onSuccess: () => {
      toast.success("Withdraw request submitted")
      setAmount("")
      setAddress("")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    if (account) {
      if (!account.current_pack) {
        toast.custom(
          <CustomToast message="PLease purchase a package to activate your account" />
        )
        router.push("/user/dashboard")
      }
    }
  }, [account, router])

  const submitWithdraw = () => {
    if (!account || !settings || !address) return

    const amt = parseFloat(amount)

    if (amt > account.balance) {
      return toast.custom(<CustomToast message="Not enough balance" />)
    }

    if (amt < settings.min_withdraw) {
      toast.custom(
        <CustomToast
          message={`Minimum withdraw is ${settings.min_withdraw} USDT`}
        />
      )
    }

    mutate({
      amount: amt,
      address,
    })
  }

  return (
    <DashPage hideFooter>
      <div className="p-5">
        {!settings?.cashout_enabled ? (
          <>
            <h1 className="text-3xl font-black text-black mb-5 mt-10 text-center">
              Notice
            </h1>

            <span className="w-full px-10 py-5 border-2 border-black block">
              {settings?.cashout_notice}
            </span>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-black text-black text-center mb-3">
              Withdraw
            </h1>
            <div className="flex items-center justify-center gap-3 shadow-lg p-5 rounded-lg border-2">
              <Image src="/usdt.png" width={50} height={50} alt="usdt" />
              <p className="text-2xl font-bold">USDT (TRC20)</p>
            </div>

            <p className="text-red-500 text-xl text-center mt-5">
              Minimum withdraw amount is{" "}
              <span className="font-bold">{settings.min_withdraw}</span> USDT
            </p>

            <div className="w-full flex flex-col gap-3 mt-10">
              <input
                type="number"
                placeholder="Amount $USDT"
                className="w-full"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value || "")
                }}
              />

              <input
                type="text"
                placeholder="USDT(TRC20) address"
                className="w-full"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value.trim())
                }}
              />

              {parseFloat(amount) > 1 && (
                <div className="text-2xl">
                  <p className="flex justify-between items-center">
                    <span className="font-bold">Network Fee: </span>
                    <span className="text-red-500">$1</span>
                  </p>

                  <p className="flex justify-between items-center">
                    <span className="font-bold">You will get: </span>
                    <span className="text-green-600">${+amount - 1}</span>
                  </p>
                </div>
              )}
              <button
                onClick={() => {
                  submitWithdraw()
                }}
                disabled={
                  !enableButton ||
                  !address ||
                  parseFloat(amount) < settings.min_withdraw
                }
                className="py-3 text-xl bg-black disabled:bg-zinc-600 disabled:cursor-not-allowed text-white flex items-center justify-center gap-2"
              >
                {isLoading && <BiLoaderAlt className="text-2xl" />}
                Submit
              </button>
            </div>
          </>
        )}

        <div></div>
      </div>
    </DashPage>
  )
}

export default CryptoWithdraw
