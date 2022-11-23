import moment from "moment"
import React from "react"
import DashPage from "../../../components/DashPage"
import { trpc } from "../../../utils/trpc"

const History = () => {
  const { data: deposits } = trpc.useQuery(["user.depositsByUser"])

  return (
    <DashPage hideFooter>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5 text-center p-2 shadow-md border-2 rounded-md">
          Recharge History
        </h1>
        <div className="w-full overflow-y-auto flex flex-col gap-3">
          {deposits?.map((deposit) => (
            <div
              key={deposit.id}
              className="bg-zinc-800 text-zinc-200 text-xs p-3 relative rounded-md"
            >
              <p className="text-lg font-bold">{deposit.tnx_id}</p>
              <div className="text-rose-500 text-xl mt-5">
                {deposit.amount} BDT
              </div>
              <div className="absolute top-5 right-5">
                {deposit.pending ? (
                  <span className="px-3 py-1 text-xs bg-white text-black rounded-full">
                    Pending
                  </span>
                ) : deposit.approved ? (
                  <span className="px-3 py-1 text-xs bg-green-500 rounded-full">
                    Successful
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs text-red-500 rounded-full">
                    Cancelled
                  </span>
                )}
              </div>
              <div className="text-zinc-400">
                {moment(deposit.date.toISOString()).format(
                  "DD MMM, YYYY h:mm a"
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashPage>
  )
}

export default History
