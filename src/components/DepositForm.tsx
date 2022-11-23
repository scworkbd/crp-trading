import React from "react"
import { useForm } from "react-hook-form"
import { trpc } from "../utils/trpc"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import { BiLoaderAlt } from "react-icons/bi"
import CustomToast from "./CustomToast"
import { useSettings } from "../hooks/useSettings"
type Props = {
  method: "bkash" | "nagad" | "upay"
}

type DepositInput = {
  amount: string
  tnx_id: string
}

const DepositForm = ({ method }: Props) => {
  const { data: session } = useSession()
  const { register, handleSubmit, reset } = useForm<DepositInput>()
  const { data: settings } = useSettings()

  const { mutate, isLoading } = trpc.useMutation(["user.deposit"], {
    onSuccess: () => {
      toast.custom(<CustomToast success message="Deposit request submitted." />)
      reset()
    },
  })

  const deposit = (values: DepositInput) => {
    const amount = Number(values.amount) || 0

    if (!settings) return

    if (!amount || amount < settings?.min_deposit || amount > 25000) {
      return toast.custom(
        <CustomToast
          message={`Minimum ${settings?.min_deposit} and Maximum 25,000 BDT`}
        />
      )
    }

    mutate({
      username: session?.user?.username as string,
      depositData: {
        method,
        amount: amount,
        tnx_id: values.tnx_id,
      },
    })
  }

  return (
    <div className="mt-20">
      <p className="mt-10 text-xl">
        {`Minimum ${settings?.min_deposit} and Maximum 25,000`}
      </p>

      <form className="mt-3" onSubmit={handleSubmit(deposit)}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Amount"
            required
            className="text-center shadow-md border-2 rounded-md border-zinc-300"
            {...register("amount", { required: true })}
          />
          <input
            type="text"
            className="text-center shadow-md border-2 rounded-md border-zinc-300"
            placeholder="TNX ID"
            {...register("tnx_id", { required: true })}
          />

          <div>
            <button
              type="submit"
              className="px-7 py-3 bg-black rounded-md text-white flex items-center justify-center gap-2"
            >
              {isLoading && <BiLoaderAlt />}
              <span>Submit</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default DepositForm
