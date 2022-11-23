import React from "react"
import { TbRecharging } from "react-icons/tb"
import { HiOutlineCash } from "react-icons/hi"
import { useAccount } from "../hooks/useAccount"
import { FaHandHoldingUsd } from "react-icons/fa"
import { useRouter } from "next/router"
import { trpc } from "../utils/trpc"

const Balance = () => {
  const { data: user } = useAccount()
  const { data: pack } = trpc.useQuery([
    "admin.packageById",
    { packId: `${user?.current_pack}` },
  ])
  // const { data: deposits } = trpc.useQuery(["user.depositsByUser"])
  const router = useRouter()

  return (
    <div className="grid grid-cols-2 gap-3 p-5">
      <div className="col-span-2 p-5 bg-indigo-600 flex items-center justify-between rounded-md">
        <div className="flex flex-col justify-center">
          <p className="text-xl text-gray-300">Total Balance</p>
          <p className="text-white text-4xl font-bold">৳ {user?.balance}</p>

          {user && pack && (
            <p className="mt-5">
              <p className="text-zinc-200">
                <span className="font-bold">Current Pack: </span>
                {pack.name}
              </p>
            </p>
          )}
        </div>
        <div className="grid place-items-center text-white">
          <FaHandHoldingUsd className="text-7xl" />
        </div>
      </div>

      <div
        onClick={() => router.push("/user/deposit")}
        className="p-5 bg-green-400 text-lg flex items-center justify-between text-white rounded-md"
      >
        <p className="font-bold">Recharge</p>
        <TbRecharging className="text-4xl" />
      </div>
      <div
        onClick={() => router.push("/user/withdraw")}
        className="p-5 bg-indigo-400 text-white text-lg flex items-center justify-between rounded-md"
      >
        <p className="font-bold">Withdraw</p>
        <HiOutlineCash className="text-4xl" />
      </div>
    </div>
  )
}

export default Balance
