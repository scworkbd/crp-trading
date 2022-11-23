import React from "react"
import DashPage from "../../../components/DashPage"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
// import { trpc } from "../../../utils/trpc"
// import CustomToast from "../../../components/CustomToast"

const Referral = () => {
  const { data: session } = useSession()
  const ref = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/register?ref=${session?.user?.username}`

  // const { data } = trpc.useQuery(["user.refs"])

  return (
    <DashPage hideFooter>
      <div className="p-5"></div>
    </DashPage>
  )
}

export default Referral
