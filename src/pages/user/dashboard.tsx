import React from "react"

import type { NextPage } from "next"
import { useRouter } from "next/router"

import Balance from "../../components/Balance"
import DashPage from "../../components/DashPage"

import {
  BiUserPlus,
  BiTask,
  BiDownload,
  BiWorld,
  BiChevronRight,
} from "react-icons/bi"
import { BsCash, BsCashStack, BsWhatsapp } from "react-icons/bs"
import { FaMoneyCheck, FaTelegramPlane } from "react-icons/fa"
import { useSettings } from "../../hooks/useSettings"
import { TbPackage } from "react-icons/tb"

const Dashboard: NextPage = () => {
  const { data: settings } = useSettings()
  const router = useRouter()

  return (
    <DashPage>
      <Balance />

      <div className="mt-5 grid grid-cols-2 gap-3 p-5">
        <div
          onClick={() => router.push("/user/package")}
          className="bg-white shadow-md text-black p-5 rounded-md flex items-center text-center gap-3 border-[1px]"
        >
          <TbPackage className="text-3xl text-indigo-500" />
          <p>Package</p>
        </div>

        <div
          onClick={() => router.push("/user/withdraw/history")}
          className="bg-white shadow-md text-black p-5 rounded-md flex items-center text-center gap-3 border-[1px]"
        >
          <BsCash className="text-3xl text-indigo-500" />
          <p>Withdraw history</p>
        </div>

        <div
          onClick={() => router.push("/user/deposit/history")}
          className="bg-white shadow-md text-black p-5 rounded-md flex items-center text-center gap-3 border-[1px]"
        >
          <BsCashStack className="text-3xl text-indigo-500" />
          <p>Deposit history</p>
        </div>

        <div
          onClick={() => router.push("/user/ptc")}
          className="bg-white shadow-md text-black p-5 rounded-md flex items-center text-center gap-3 border-[1px]"
        >
          <BiTask className="text-3xl text-indigo-500" />
          <p>Work</p>
        </div>

        <div
          onClick={() => router.push("/user/referral/users")}
          className="bg-white shadow-md text-black p-5 rounded-md flex items-center text-center gap-3 border-[1px]"
        >
          <BiUserPlus className="text-3xl text-indigo-500" />
          <p>Refer</p>
        </div>

        <div
          onClick={() => router.push("/user/referral/history")}
          className="bg-white shadow-md text-black p-5 rounded-md flex items-center text-center gap-3 border-[1px]"
        >
          <FaMoneyCheck className="text-3xl text-indigo-500" />
          <p>Refer Income</p>
        </div>

        <div
          onClick={() => router.push("/user/history")}
          className="bg-white shadow-md text-black p-5 rounded-md flex items-center text-center gap-3 border-[1px]"
        >
          <BiWorld className="text-3xl text-indigo-500" />
          <p>Work History</p>
        </div>

        <a
          href="/tyleronline.apk"
          className="bg-white shadow-md text-black p-5 rounded-md flex items-center text-center gap-3 border-[1px]"
        >
          <BiDownload className="text-3xl text-indigo-500" />
          <p>Download App</p>
        </a>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 p-5">
        <a
          href={`https://wa.me/${settings?.whatsapp_number}`}
          className="bg-white shadow-md border-[1px] p-5 rounded-md text-black flex items-center gap-4"
        >
          <BsWhatsapp className="text-4xl text-green-500" />
          <p className="text-2xl">Live Chat</p>

          <BiChevronRight className="text-2xl ml-auto" />
        </a>

        <a
          href={settings?.telegram_link}
          className="bg-white shadow-md border-[1px] p-5 rounded-md text-black flex items-center gap-4"
        >
          <FaTelegramPlane className="text-4xl text-sky-500" />
          <p className="text-2xl">Telegram</p>

          <BiChevronRight className="text-2xl ml-auto" />
        </a>
      </div>
    </DashPage>
  )
}

export default Dashboard
