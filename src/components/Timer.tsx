import React, { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { trpc } from "../utils/trpc"
import { useRouter } from "next/router"
import { BiLoaderAlt } from "react-icons/bi"

const Timer = () => {
  const adsDuration = 10
  const [remainingTime, setRemainingTime] = useState(adsDuration)
  const router = useRouter()

  const { mutate } = trpc.useMutation(["user.work"], {
    onSuccess: () => {
      toast.success("You have been rewarded for watching ads")
      router.push("/user/ptc")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Watch done")
      clearInterval(interval)
      setRemainingTime(0)
      mutate()
    }, adsDuration * 1000)

    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1)
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
      console.log("Timeout cleared")
    }
  }, [mutate])

  return (
    <div className="py-10 flex items-center justify-center flex-col gap-2">
      <p className="text-2xl flex items-center gap-2">
        Please Wait <BiLoaderAlt className="animate-spin" />
      </p>
      <p>{remainingTime} Seconds</p>
    </div>
  )
}

export default Timer
