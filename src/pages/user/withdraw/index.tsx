import React, {  useState } from "react"
import type { NextPage } from "next"
import DashPage from "../../../components/DashPage"
import Image from "next/image"
import { useAccount } from "../../../hooks/useAccount"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { trpc } from "../../../utils/trpc"
import { useSettings } from "../../../hooks/useSettings"
import { BiChevronRight } from "react-icons/bi"

type Methods = "bkash" | "nagad" | "upay"

const Withdraw: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<{
    amount: number
    method: Methods
    mobile_number: string
  }>()
  type WithData = {
    amount: number
    method: "bkash" | "nagad" | "upay"
    mobile_number: string
    fees: number
  }

  const { data: settings } = useSettings()
  const [withData, setWithData] = useState<WithData>()
  const { data: account, refetch } = useAccount()
  const { mutate, isLoading: wLoading } = trpc.useMutation(["user.withdraw"], {
    onSuccess: () => {
      toast.success("Withdraw request has been submitted and pending")
      reset()
      refetch()
      setMethod(null)
      setWithData(undefined)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [method, setMethod] = useState<"bkash" | "nagad" | "upay" | null>()

  const submitWithdrawal = (values: {
    amount: number
    mobile_number: string
  }) => {
    const amount = Number(values.amount) || 0

    if (!settings) return

    console.log(amount, settings.min_withdraw)

    if (amount < settings.min_withdraw || amount > settings.max_withdraw) {
      return toast.error(
        `Minimum withdraw ${settings.min_withdraw} BDT to maximum ${settings.max_withdraw} BDT`
      )
    }

    if (amount > (account ? account?.balance : 0)) {
      return toast.error("Not enough balance")
    }

    if (amount && method && account && settings) {
      setWithData({
        amount: Number(values.amount),
        mobile_number: values.mobile_number,
        method: method,
        fees:
          (Number(values.amount) / 100) * settings.bkash_percentage +
          (method === "bkash" ? 10 : 0),
      })
    }
  }

  const executeWithdraw = () => {
    if (withData && account && !wLoading) {
      mutate({
        userId: account.id,
        amount: Number(withData.amount) || 300,
        method: withData.method,
        mobile_number: withData.mobile_number,
      })
    }
  }

  return (
    <>
      <DashPage hideFooter>
        {!account || !account.current_pack ? (
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-5 text-center p-2 shadow-md border-2 rounded-md">
              Withdraw
            </h1>
            <h1 className="text-2xl text-center text-red-500 font-bold">
              Please buy a package to withdraw money
            </h1>
          </div>
        ) : (
          <div className="p-5">
            <div>
              {!settings?.cashout_enabled ? (
                <>
                  <h1 className="text-2xl font-bold mb-5 text-center p-2 shadow-md border-2 rounded-md">
                    Notice
                  </h1>
                  <span className="w-full px-10 py-5 border-2 border-rose-600 block">
                    {settings?.cashout_notice}
                  </span>
                </>
              ) : (
                <h1 className="text-2xl font-bold mb-5 text-center p-2 shadow-md border-2 rounded-md">
                  Withdraw
                </h1>
              )}
            </div>
            {settings?.cashout_enabled && (
              <>
                {!method && (
                  <div className="grid grid-cols-1 gap-5">
                    <div
                      onClick={() => setMethod("bkash")}
                      className="flex items-center justify-center bg-zinc-100 shadow-md p-5 gap-5 rounded-lg"
                    >
                      <div>
                        <Image
                          src="/icons/bkash.png"
                          width={50}
                          height={50}
                          alt="bkash"
                        />
                      </div>

                      <p className="text-2xl font-bold uppercase">Bkash</p>
                      <BiChevronRight className="text-2xl ml-auto" />
                    </div>

                    <div
                      onClick={() => setMethod("nagad")}
                      className="flex items-center bg-zinc-100 shadow-md p-5 gap-5 rounded-lg"
                    >
                      <div>
                        <Image
                          src="/icons/nagad.png"
                          width={50}
                          height={50}
                          alt="bkash"
                        />
                      </div>

                      <p className="text-2xl font-bold uppercase">Nagad</p>

                      <BiChevronRight className="text-2xl ml-auto" />
                    </div>
                  </div>
                )}

                {method && !withData && (
                  <>
                    <h2 className="text-2xl font-bold">Method: {method}</h2>

                    <p className="text-red-500">
                      Minimum withdraw {settings.min_withdraw} BDT and Maximum{" "}
                      {settings.max_withdraw} BDT
                    </p>
                    <form
                      onSubmit={handleSubmit(submitWithdrawal)}
                      className="flex flex-col gap-2 mt-3"
                    >
                      <input
                        type="text"
                        placeholder={`${method} Number`}
                        {...register("mobile_number")}
                      />
                      <input
                        type="text"
                        placeholder="Amount"
                        {...register("amount")}
                      />

                      <div className="mt-5 flex gap-2 items-center">
                        <button
                          type="submit"
                          className="px-5 py-3 text-sm bg-black text-white"
                        >
                          Withdraw
                        </button>

                        <button
                          onClick={() => {
                            setMethod(null)
                          }}
                          className="px-5 py-3 bg-red-600 text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {withData && (
                  <>
                    <h2 className="text-2xl">
                      Method:{" "}
                      <span className="font-semibold capitalize">
                        {withData.method}
                      </span>
                    </h2>

                    <h2 className="text-2xl">Amount: {withData.amount} BDT</h2>
                    <h2 className="text-2xl">Fees: {withData.fees} BDT</h2>
                    <h2 className="text-2xl">
                      You get: {withData.amount - withData.fees} BDT
                    </h2>

                    <div className="mt-5 flex gap-2 items-center">
                      <button
                        onClick={() => executeWithdraw()}
                        className="px-5 py-3 bg-green-600 text-white"
                      >
                        Submit
                      </button>

                      <button
                        onClick={() => {
                          setWithData(undefined)
                        }}
                        className="px-5 py-3 bg-red-600 text-white"
                      >
                        Back
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </DashPage>
    </>
  )
}

export default Withdraw
