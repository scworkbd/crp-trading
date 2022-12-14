import React, { useEffect, useState } from "react"

import Image from "next/image"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"

import { signIn } from "next-auth/react"

import { AiFillHome } from "react-icons/ai"
import { FaSignOutAlt, FaUser } from "react-icons/fa"
import { BiChevronLeft, BiCrown } from "react-icons/bi"

import Loading from "./Loading"
import { useAccount } from "../hooks/useAccount"

type Props = {
  children?: React.ReactNode | React.ReactNode[]
  hideFooter?: boolean
}

const DashPage = ({ children }: Props) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [adminData, setAdminData] = useState<{
    adminUsername: string
    adminPassword: string
  } | null>(null)

  const { data: profile, isLoading } = useAccount()

  useEffect(() => {
    const adata = localStorage.getItem("admin")
    const adminUsername = localStorage.getItem("adminUsername")
    const adminPassword = localStorage.getItem("adminPassword")

    if (adata && adminUsername && adminPassword) {
      setAdminData({ adminUsername, adminPassword })
    }
  }, [])

  if (status === "unauthenticated") {
    router.push("/login")
  }

  if (status === "loading" || isLoading) {
    return <Loading />
  }

  if (profile && profile.is_banned) {
    setTimeout(() => {
      router.push("/login?error=Account Banned")
    }, 1000)
  }

  if (session?.user?.is_admin) {
    router.push("/admin")
  }

  return (
    <div className="max-w-lg mx-auto">
      {adminData && (
        <div
          onClick={() => {
            localStorage.removeItem("admin")
            localStorage.removeItem("adminUsername")
            localStorage.removeItem("adminPassword")

            signIn("credentials", {
              username: adminData.adminUsername,
              password: adminData.adminPassword,
              callbackUrl: "/admin/users",
            })
          }}
          className="px-5 py-3 bg-rose-900 flex items-center justify-center text-white"
        >
          <BiChevronLeft className="text-2xl" /> Admin
        </div>
      )}

      <header className="flex justify-between items-center px-5 h-16 bg-green-100">
        <div>
          <Image src="/logo.png" height={50} width={50} alt="logo" />
        </div>
        <div onClick={() => signOut()} className="flex items-center gap-2">
          <FaSignOutAlt className="text-red-500 text-xl" />
          <span>Logout</span>
        </div>
      </header>

      <div className="pb-32">
        <div>{children}</div>
      </div>

      <div className="fixed bottom-0 left-0 w-full ">
        <footer
          className="
          max-w-lg mx-auto
          bg-sky-700 text-white p-5 
          flex items-center justify-between gap-4
        "
        >
          <div
            className="flex flex-col items-center"
            onClick={() => router.push("/user/dashboard")}
          >
            <AiFillHome className="text-2xl" />
            <span>Home</span>
          </div>

          <div
            onClick={() => router.push("/user/package")}
            className="flex flex-col items-center"
          >
            <BiCrown className="text-2xl" />
            <span>Package</span>
          </div>

          <div
            onClick={() => router.push("/user/profile")}
            className="flex flex-col items-center"
          >
            <FaUser className="text-2xl" />
            <span>Profile</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default DashPage
