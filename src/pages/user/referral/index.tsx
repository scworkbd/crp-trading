import React from "react"
import DashPage from "../../../components/DashPage"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import { trpc } from "../../../utils/trpc"
import CustomToast from "../../../components/CustomToast"

const Referral = () => {
  const { data: session } = useSession()
  const ref = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/register?ref=${session?.user?.username}`

  const { data } = trpc.useQuery(["user.refs"])

  return (
    <DashPage hideFooter>
      <div className="p-5">
        <p className="mb-3 text-center font-bold text-xl p-2 shadow-md border-2">
          Invite Link
        </p>
        <div>
          <input
            type="text"
            value={ref}
            className="w-full border-2 border-black"
          />

          <button
            onClick={() => {
              navigator.clipboard.writeText(ref)
              toast.custom(
                <CustomToast success message="রেফার লিংক কপি করা হয়েছে" />
              )
            }}
            className="px-5 py-3 bg-black rounded-md text-white block mt-3"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="p-5">
        <p className="mb-3 font-bold text-xl text-black p-2 rounded-md shadow-md border-2 text-center">
          Users
        </p>
        <div>
          <div className="flex flex-col gap-5">
            {data?.map((ref) => (
              <div
                key={ref.id}
                className="bg-black text-zinc-200 p-5 rounded-md"
              >
                <p className="text-left whitespace-nowrap text-lg font-bold">
                  {ref.first_name} {ref.last_name}
                </p>
                <p className="text-left whitespace-nowrap">
                  Username: {ref.username}
                </p>
                <p className="text-left whitespace-nowrap">
                  Email: {ref.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashPage>
  )
}

export default Referral
