import React from "react"
import type { NextPage } from "next"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { trpc } from "../utils/trpc"
import { useRouter } from "next/router"
import { BiLockAlt } from "react-icons/bi"

type Credentials = {
  first_name: string
  last_name: string
  email: string
  username: string
  password_hash: string
  password_hash_again: string
  referrer?: string
}

const Login: NextPage = () => {
  const router = useRouter()
  const refUser = router.query.ref

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>()

  const { mutate } = trpc.useMutation(["user.register"], {
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Registration completed. Please login")
      router.push("/login")
    },
  })

  const registerUser = (values: Credentials) => {
    mutate({
      registerData: {
        ...values,
        referrer: refUser ? (refUser as string) : undefined,
      },
    })
  }

  return (
    <div>
      <div className="max-w-lg mx-auto py-10 p-5">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-bold">Register</p>
        </div>

        <form
          onSubmit={handleSubmit(registerUser)}
          className="flex flex-col gap-4 mt-10"
        >
          <div className="grid grid-cols-1 gap-3">
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="First Name"
                className={`border-2 border-zinc-400 rounded-lg ${
                  errors.first_name && "border-red-500"
                } border-2 !bg-white`}
                {...register("first_name", {
                  required: true,
                })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Last Name"
                className={`border-2 border-zinc-400 rounded-lg ${
                  errors.last_name && "border-red-500"
                }`}
                {...register("last_name", {
                  required: true,
                })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="email"
              placeholder="Email"
              className={`border-2 border-zinc-400 rounded-lg ${
                errors.email && "border-red-500"
              }`}
              {...register("email", {
                required: true,
              })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Mobile Number"
                className={`border-2 ${errors.phone && "border-red-500"}`}
                {...register("phone", {
                  required: true,
                })}
              />
            </div> */}

            <div className="flex flex-col gap-1 col-span-2">
              <input
                type="text"
                placeholder="Username"
                className={`border-2 border-zinc-400 rounded-lg ${
                  errors.username && "border-red-500"
                }`}
                {...register("username", {
                  required: true,
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <input
                type="password"
                placeholder="Password"
                className={`border-2 border-zinc-400 rounded-lg ${
                  errors.password_hash && "border-red-500"
                }`}
                {...register("password_hash", {
                  required: true,
                  minLength: 6,
                })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="password"
                placeholder="Confirm Password"
                className={`border-2 border-zinc-400 rounded-lg ${
                  errors.password_hash_again && "border-red-500"
                }`}
                {...register("password_hash_again", {
                  validate: (value: string) => {
                    const values = getValues()
                    return values.password_hash === value
                  },
                })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-10">
            <button
              type="submit"
              className="px-7 py-3 w-full bg-black rounded-md text-white flex items-center gap-2 justify-center"
            >
              Register
            </button>
            <Link href="/login">
              <a className="text-indigo-500 text-xl flex items-center gap-2 mt-5">
                <BiLockAlt /> Login
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
