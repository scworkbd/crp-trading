import React, { useEffect, useState } from "react"
import YouTube from "react-youtube"
import { useRouter } from "next/router"

import DashPage from "../../components/DashPage"
import Timer from "../../components/Timer"
import { trpc } from "../../utils/trpc"
import { toast } from "react-hot-toast"

const Work = () => {
  const { data: works } = trpc.useQuery(["user.works"])
  const [start, setState] = useState(false)
  const router = useRouter()
  const ad = router.query.id

  useEffect(() => {
    if (works !== undefined && works <= 0) {
      toast.error("Todays limit finished")
      router.push("/user/dashboard")
    }
  }, [works, router])

  return (
    <DashPage>
      <div className="p-5">
        <h1 className="text-2xl font-bold text-center text-black mb-5 p-2 shadow-md border-2">
          Watch
        </h1>

        {ad && (
          <div className="border-2 border-black rounded-2xl overflow-hidden">
            <YouTube
              videoId={ad as string}
              id={ad as string}
              className="video-responsive"
              opts={{
                playerVars: {
                  autoplay: 1,
                  mute: 1,
                },
              }}
              onPlay={() => setState(true)}
              onPause={() => setState(false)}
            />
          </div>
        )}

        {start && <Timer />}
        {!start && (
          <h1 className="text-2xl font-bold text-center py-10 text-red-500">
            Play the video and wait 10 seconds
          </h1>
        )}
      </div>
    </DashPage>
  )
}

export default Work
