import React from "react"

import type { NextPage } from "next"

// import { useDeposit } from "../../hooks/useDeposits"
// import { useWithdraw } from "../../hooks/useWithdraw"
import { useAccount } from "../../hooks/useAccount"
import { useRouter } from "next/router"

import Balance from "../../components/Balance"
import DashPage from "../../components/DashPage"

import {
  BiUserPlus,
  BiTask,
  BiLogOut,
  BiSupport,
  BiDownload,
} from "react-icons/bi"
import { BsCashCoin, BsCashStack } from "react-icons/bs"
import { FaMoneyCheck, FaTelegram } from "react-icons/fa"

// import { trpc } from "../../utils/trpc"

import toast from "react-hot-toast"
import { useSettings } from "../../hooks/useSettings"
import { FiUsers } from "react-icons/fi"
import { TbPackage } from "react-icons/tb"
import { signOut } from "next-auth/react"

const Dashboard: NextPage = () => {
  const { data: account } = useAccount()
  // const { data: deposits } = useDeposit()
  // const { data: withdraws } = useWithdraw()
  const { data: settings } = useSettings()
  // const { data: works } = trpc.useQuery(["user.works"])
  // const { data: pack } = trpc.useQuery([
  //   "admin.packageById",
  //   { packId: `${account?.current_pack}` },
  // ])
  const router = useRouter()

  // const pendingDeposit =
  //   deposits
  //     ?.filter((item) => item.pending === true)
  //     .reduce((prev, item) => prev + item.amount, 0) || 0

  // const totalDeposit =
  //   deposits
  //     ?.filter((item) => !item.pending && item.approved)
  //     .reduce((prev, item) => prev + item.amount, 0) || 0

  // const pendingWithdraw =
  //   withdraws
  //     ?.filter((item) => item.pending === true)
  //     .reduce((prev, iAiOutlineHistory
  // const totalWithdraw =
  //   withdraws
  //     ?.filter((item) => !item.pending && item.approved)
  //     .reduce((prev, item) => prev + item.amount, 0) || 0

  return (
    <DashPage>
      <Balance />

      <div className="mt-5 grid grid-cols-3 gap-3 p-5">
        <div
          onClick={() => router.push("/user/withdraw/history")}
          className="bg-black/80 p-5 rounded-md text-white flex flex-col items-center text-center gap-3"
        >
          <BsCashCoin className="text-3xl" />
          <p>Withdraws</p>
        </div>

        <div
          onClick={() => router.push("/user/deposit/chistory")}
          className="bg-black/80 p-5 rounded-md text-white flex flex-col items-center text-center gap-3"
        >
          <BsCashStack className="text-3xl" />
          <p>Recharges</p>
        </div>

        <div
          onClick={() => router.push("/user/cpackages")}
          className="bg-black/80 p-5 rounded-md text-white flex flex-col items-center text-center gap-3"
        >
          <TbPackage className="text-3xl" />
          <p>Packages</p>
        </div>

        <div
          onClick={() => router.push("/user/ptc")}
          className="bg-black/80 p-5 rounded-md text-white flex flex-col items-center text-center gap-3"
        >
          <BiTask className="text-3xl" />
          <p>My Task</p>
        </div>

        <div
          onClick={() => router.push("/user/referral")}
          className="bg-black/80 p-5 rounded-md text-white flex flex-col items-center text-center gap-3"
        >
          <BiUserPlus className="text-3xl" />
          <p>Invite Link</p>
        </div>

        <div
          onClick={() => router.push("/user/referral/history")}
          className="bg-black/80 p-5 rounded-md text-white flex flex-col items-center text-center gap-3"
        >
          <FaMoneyCheck className="text-3xl" />
          <p className="text-xs">Refer Income</p>
        </div>

        <div
          onClick={() => router.push("/user/referral/users")}
          className="bg-black/80 p-5 rounded-md text-white flex flex-col items-center text-center gap-3"
        >
          <FiUsers className="text-3xl" />
          <p className="text-xs">Team</p>
        </div>

        <div
          onClick={() => router.push("/user/referral")}
          className="bg-black/80 p-5 rounded-md text-white flex flex-col items-center text-center gap-3"
        >
          <BiDownload className="text-3xl" />
          <p className="text-xs">Download App</p>
        </div>

        <div
          onClick={() => signOut()}
          className="bg-red-500 p-5 rounded-md text-white flex flex-col items-center text-center gap-3"
        >
          <BiLogOut className="text-3xl rotate-180" />
          <p>Logout</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5 p-5">
        <a
          href={settings?.live_chat_link}
          className="bg-indigo-600 p-5 rounded-md text-white flex flex-col items-center gap-2"
        >
          <BiSupport className="text-4xl" />
          <p className="text-2xl text-white">Live Chat</p>
        </a>

        <a
          href={settings?.telegram_link}
          className="bg-sky-500 p-5 rounded-md text-white flex flex-col items-center gap-2"
        >
          <FaTelegram className="text-4xl" />
          <p className="text-2xl text-white">Telegram</p>
        </a>
      </div>
    </DashPage>
  )
}

export default Dashboard
