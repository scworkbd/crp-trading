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
        <h1 className="mb-3 font-bold text-xl text-black p-2 rounded-md shadow-md border-2 text-center">
          Your Team
        </h1>
        <div>
          <div className="flex flex-col gap-5">
            {!data && (
              <p className="text-2xl text-red-500 font-bold">No user</p>
            )}

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
