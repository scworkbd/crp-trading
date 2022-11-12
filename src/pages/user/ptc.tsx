import React, { useEffect } from "react"
import type { NextPage } from "next"
import DashPage from "../../components/DashPage"
import { useRouter } from "next/router"
import { trpc } from "../../utils/trpc"
import { toast } from "react-hot-toast"
import { useAccount } from "../../hooks/useAccount"
import CustomToast from "../../components/CustomToast"

const Dashboard: NextPage = () => {
  const router = useRouter()
  const { data: account } = useAccount()
  const { data: works } = trpc.useQuery(["user.works"])
  const { data: ads } = trpc.useQuery(["admin.ads"])
  const { data: pack } = trpc.useQuery([
    "admin.packageById",
    { packId: `${account?.current_pack}` },
  ])

  const showAds = () => {
    if (ads) {
      const cad = ads[Math.floor(Math.random() * ads.length)]
      router.push(`/user/work?id=${cad?.videoId}`)
    }
  }

  useEffect(() => {
    if (!account || works === undefined) return

    if (!account.current_pack) {
      toast.custom(
        <CustomToast message="Please purchase a package to start working" />
      )
      router.push("/user/dashboard")
      return
    }

    if (works <= 0) {
      toast.custom(<CustomToast message="Daily ads limit has been finished" />)
      router.push("/user/dashboard")
    }
  }, [works, router, account])
  return (
    <DashPage>
      <div className="overflow-y-auto p-5">
        <h1 className="text-2xl font-bold text-black text-center mb-5 p-2 shadow-md border-2">
          Works
        </h1>
        <div className="flex flex-col gap-3">
          {ads?.map((ad) => (
            <div
              key={ad.videoId}
              className="bg-black text-zinc-300 p-5 rounded-md"
            >
              <div className="grid grid-cols-3">
                <div className="px-3 py-3">Video</div>
                <div className="px-2 py-3 whitespace-nowrap">
                  {pack ? pack.per_click : "..."} USDT
                </div>
                <button
                  onClick={() => showAds()}
                  className="px-5 py-3 bg-zinc-200 w-full text-black rounded-md text-sm"
                >
                  Watch
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashPage>
  )
}

export default Dashboard
