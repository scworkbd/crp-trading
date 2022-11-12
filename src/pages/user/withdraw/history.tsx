// import moment from "moment"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
// import DashPage from "../../../components/DashPage"
// import { useWithdraw } from "../../../hooks/useWithdraw"

const History = () => {
  const router = useRouter()
  // const { data: withdraws } = useWithdraw()

  useEffect(() => {
    router.push("/user/withdraw/chistory")
  }, [router])
  return (
    <></>
    // <DashPage hideFooter>
    //   <div className="p-5">
    //     <h1 className="text-2xl font-bold mb-5 text-center p-2 shadow-md border-2 rounded-md">
    //       Withdraw History
    //     </h1>
    //     <div className="w-full">
    //       <div className="grid grid-cols-1 gap-5">
    //         {withdraws?.map((withdraw) => (
    //           <div
    //             key={withdraw.id}
    //             className="bg-zinc-200 p-5 rounded-md relative"
    //           >
    //             <div className="text-lg font-semibold">{withdraw.id}</div>
    //             <table className="w-full mt-5">
    //               <tr>
    //                 <td>ওয়ালেট</td>
    //                 <td>{withdraw.method}</td>
    //               </tr>

    //               <tr>
    //                 <td>নাম্বার</td>
    //                 <td>{withdraw.mobile_number}</td>
    //               </tr>

    //               <tr>
    //                 <td>পরিমান</td>
    //                 <td>{withdraw.amount}</td>
    //               </tr>

    //               <tr>
    //                 <td>ফিস</td>
    //                 <td>{withdraw.fees.toFixed(2)}</td>
    //               </tr>

    //               <tr>
    //                 <td>পাবেন</td>
    //                 <td>{(withdraw.amount - withdraw.fees).toFixed(2)}</td>
    //               </tr>
    //             </table>
    //             <div className="absolute top-5 right-5">
    //               {withdraw.pending ? (
    //                 <span className="px-3 py-1 text-xs bg-yellow-500 rounded-full">
    //                   Pending
    //                 </span>
    //               ) : withdraw.approved ? (
    //                 <span className="px-3 py-1 text-xs bg-green-500 rounded-full">
    //                   Paid
    //                 </span>
    //               ) : (
    //                 <span className="px-3 py-1 text-xs bg-red-500 rounded-full">
    //                   Declined
    //                 </span>
    //               )}
    //             </div>
    //             <div className="text-left text-zinc-400 mt-5">
    //               {moment(withdraw.date.toISOString()).format(
    //                 "DD MMM, YYYY h:mm a"
    //               )}
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </DashPage>
  )
}

export default History
