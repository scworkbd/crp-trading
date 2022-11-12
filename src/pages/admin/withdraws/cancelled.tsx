import moment from "moment"
import Link from "next/link"
import React from "react"
import { toast } from "react-hot-toast"
import AdminPage from "../../../components/AdminPage"
import { trpc } from "../../../utils/trpc"

const Withs = () => {
  const { data: deposits, refetch } = trpc.useQuery([
    "cwithdraw.withdrawsWUser",
  ])
  const { mutate } = trpc.useMutation(["cwithdraw.approveWith"], {
    onSuccess: () => {
      toast.success("Withdraw Approved")
      refetch()
    },
  })

  const approveDeposit = (id: string) => {
    const conf = confirm("Are you sure?")

    if (conf) {
      mutate({
        withId: id,
      })
    }
  }

  return (
    <AdminPage>
      <div className="flex gap-2 items-center mb-5">
        <Link href="/admin/withdraws">
          <a className="px-5 py-3 bg-zinc-700 rounded-md text-white">Pending</a>
        </Link>

        <Link href="/admin/withdraws/approved">
          <a className="px-5 py-3 bg-zinc-700 rounded-md text-white">
            Approved
          </a>
        </Link>

        <Link href="/admin/withdraws/cancelled">
          <a className="px-5 py-3 bg-zinc-700 rounded-md text-white">
            Cancelled
          </a>
        </Link>
      </div>

      <table className="w-full">
        <thead className="bg-black text-zinc-400">
          <tr>
            <td className="px-5 py-2 whitespace-nowrap">Tracking Number</td>
            <td className="px-5 py-2">Username</td>
            <td className="px-5 py-2">Address</td>
            <td className="px-5 py-2">Amount</td>
            <td className="px-5 py-2">Fees</td>
            <td className="px-5 py-2">Pay</td>
            {/* <td className="px-5 py-2">Wallet</td> */}
            <td className="px-5 py-2">Date</td>
            <td className="px-5 py-2">Action</td>
          </tr>
        </thead>
        <tbody>
          {deposits
            ?.filter((dep) => !dep.pending && !dep.approved)
            .sort((a, b) =>
              Number(a.updatedAt && b.updatedAt ? a.updatedAt < b.updatedAt : 0)
            )
            .map((dep) => (
              <tr key={dep.id} className="odd:bg-zinc-200">
                <td className="px-5 py-2">{dep.id}</td>
                <td className="px-5 py-2">{dep.user.username}</td>
                <td className="px-5 py-2">{dep.address}</td>
                <td className="px-5 py-2">{dep.amount}</td>
                <td className="px-5 py-2">{dep.fees.toFixed(2)}</td>
                <td className="px-5 py-2">
                  {dep.amount - parseFloat(dep.fees.toFixed(2))}
                </td>
                {/* <td className="px-5 py-2">{dep.method}</td> */}
                <td className="px-5 py-2 whitespace-nowrap">
                  {moment(dep.date).format("DD MMM, YYYY hh:mm a")}
                </td>
                <td className="flex items-center gap-2 px-5 py-2 whitespace-nowrap">
                  <button
                    onClick={() => approveDeposit(dep.id)}
                    className="px-3 py-1 bg-green-600 text-white font-bold rounded-md"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </AdminPage>
  )
}

export default Withs
