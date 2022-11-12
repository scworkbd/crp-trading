import moment from "moment"
import React from "react"
import DashPage from "../../../components/DashPage"
// import { useWithdraw } from "../../../hooks/useWithdraw"
import { trpc } from "../../../utils/trpc"

const History = () => {
  const { data: withdraws } = trpc.useQuery(["user.usersWithdrawCrypto"])

  return (
    <DashPage hideFooter>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5 text-center p-2 shadow-md border-2 rounded-md">
          Withdraw History
        </h1>
        <div className="w-full">
          <div className="grid grid-cols-1 gap-5">
            {withdraws?.map((withdraw) => (
              <div
                key={withdraw.id}
                className="bg-zinc-800 text-zinc-300 p-5 rounded-md relative"
              >
                <div className="text-lg font-semibold">{withdraw.id}</div>
                <table className="w-full mt-5">
                  <tr>
                    <td>Amount</td>
                    <td>{withdraw.amount}</td>
                  </tr>

                  <tr>
                    <td>Fees</td>
                    <td>{withdraw.fees}</td>
                  </tr>

                  <tr>
                    <td>You get</td>
                    <td>{withdraw.amount - withdraw.fees}</td>
                  </tr>
                </table>

                <p className="py-3 text-green-200">{withdraw.address}</p>
                <div className="absolute top-5 right-5">
                  {withdraw.pending ? (
                    <span className="px-3 py-1 text-xs bg-white text-black rounded-full">
                      Pending
                    </span>
                  ) : withdraw.approved ? (
                    <span className="px-3 py-1 text-xs bg-green-500 rounded-full">
                      Paid
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs bg-red-500 rounded-full">
                      Declined
                    </span>
                  )}
                </div>
                <div className="text-left text-zinc-400 mt-2">
                  {moment(withdraw.date.toISOString()).format(
                    "DD MMM, YYYY h:mm a"
                  )}
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
