import moment from "moment"
import React from "react"
import DashPage from "../../components/DashPage"
import { useAccount } from "../../hooks/useAccount"
import { trpc } from "../../utils/trpc"

const History = () => {
  const { data: account } = useAccount()
  const { data: pack } = trpc.useQuery([
    "admin.packageById",
    { packId: account?.current_pack as string },
  ])

  const { data: works } = trpc.useQuery(["user.myorks"])

  return (
    <DashPage hideFooter>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4 text-center p-2 rounded-md shadow-md border-2">
          Work history
        </h1>
        <div className="flex flex-col gap-3">
          {works?.map((work) => (
            <div
              key={work.id}
              className="p-5 rounded-md bg-zinc-800 text-zinc-200"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">Video</h1>
                <h1 className="text-xl font-bold text-white">
                  {pack?.per_click} USDT
                </h1>
              </div>
              <p className="text-right">
                {moment(work.date.toISOString()).format("DD MMM, YYYY h:mm a")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashPage>
  )
}

export default History
