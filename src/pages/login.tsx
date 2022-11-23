import React, { useState } from "react"
import type { NextPage } from "next"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { signIn } from "next-auth/react"
import { BiLoaderAlt, BiLockAlt, BiUser } from "react-icons/bi"
// import CustomToast from "../components/CustomToast"

type Credentials = {
  username: string
  password: string
}

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<Credentials>()
  const [loading, setLoading] = useState(false)

  const login = (values: Credentials) => {
    setLoading(true)
    fetch("/api/user/authenticate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error("Invalid username or password")
          setLoading(false)
        } else {
          setLoading(true)
          signIn("credentials", { ...values, callbackUrl: "/user/dashboard" })
        }
      })
      .catch(() => {
        setLoading(true)
      })
  }

  return (
    <div>
      <div className="max-w-lg mx-auto py-20 p-5">
        <div className="flex flex-col items-center justify-center">
          <Image src="/login.png" width={300} height={300} alt="something" />
        </div>

        <form
          onSubmit={handleSubmit(login)}
          className="flex flex-col gap-4 mt-10"
        >
          <div
            className="flex p-2 border-2 border-green-500
          "
          >
            <div className="h-full p-3">
              <BiUser className="text-2xl text-green-700" />
            </div>
            <input
              type="text"
              className="border-none
               w-full !bg-transparent !outline-none !ring-0"
              placeholder="Username"
              {...register("username", {
                required: {
                  value: true,
                  message: "username is required",
                },
              })}
            />
          </div>

          <div className="flex border-green-500 border-2 p-2">
            <div className=" h-full p-3">
              <BiLockAlt className="text-2xl text-green-700" />
            </div>
            <input
              type="password"
              placeholder="Password"
              className="border-none
               w-full !bg-transparent !outline-none !ring-0"
              {...register("password", {
                required: {
                  value: true,
                  message: "pasword is required",
                },
                minLength: {
                  value: 6,
                  message: "minimum 6 character",
                },
              })}
            />
          </div>

          <div className="grid grid-cols-2 gap-5 mt-5">
            <button
              type="submit"
              className="px-7 py-4 w-full bg-green-800 text-white flex items-center gap-2 justify-center"
            >
              {loading && <BiLoaderAlt className="animate-spin" />}
              Login
            </button>
            <Link href="/register">
              <a className="px-7 py-4 w-full bg-sky-600 text-white text-center">
                Registration
              </a>
            </Link>
          </div>
        </form>

        <div className="flex flex-col mt-10 text-indigo-600"></div>
      </div>
    </div>
  )
}

export default Login
