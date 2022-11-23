import React from "react"
import DashPage from "../../../components/DashPage"
import moment from "moment"
import { useRefIncome } from "../../../hooks/useRefIncome"

const History = () => {
  const { data: deposits } = useRefIncome()

  return (
    <DashPage hideFooter>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5 text-center p-2 border-2 rounded-md shadow-md">
          Referral Income
        </h1>
        <div className="w-full overflow-y-auto">
          {!deposits && (
            <h1 className="text-2xl text-center text-red-500">No Income</h1>
          )}
          <div className="flex flex-col gap-3">
            {deposits?.map((withdraw) => (
              <div
                key={withdraw.id}
                className="bg-zinc-800 text-white p-5 rounded-md"
              >
                <div className="text-left text-xl font-bold flex items-center justify-between">
                  <span>{withdraw.referrerFullName}</span>
                  <span className="text-left text-white text-2xl">
                    {withdraw.amount} BDT
                  </span>
                </div>
                <div className="text-left text-sm flex items-center justify-between">
                  <span>Username - {withdraw.referrerUsername}</span>
                  <span className="text-left text-zinc-400 mt-2">
                    {moment(withdraw.date.toISOString()).format(
                      "DD MMM, YYYY h:mm a"
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashPage>
  )
}

export default History
