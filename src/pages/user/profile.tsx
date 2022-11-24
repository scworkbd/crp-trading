import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import DashPage from "../../components/DashPage"
import { useAccount } from "../../hooks/useAccount"
import { trpc } from "../../utils/trpc"
import { toast } from "react-hot-toast"
// import CustomToast from "../../components/CustomToast"
import Link from "next/link"

type UserInput = {
  first_name: string
  last_name: string
  phone: string
}

const ChPWD = () => {
  const { data: account } = useAccount()

  const { reset, register, handleSubmit } = useForm<UserInput>()

  const { mutate } = trpc.useMutation(["user.updateUser"], {
    onSuccess: () => {
      toast.success("Profile updated")
    },
  })

  const updateUser = (values: UserInput) => {
    mutate({
      data: values,
    })
  }

  useEffect(() => {
    if (account) {
      reset({
        first_name: account.first_name,
        last_name: account.last_name,
        phone: account.phone,
      })
    }
  }, [account, reset])
  return (
    <DashPage>
      <div className="p-5">
        <h1 className="text-2xl font-bold text-center text-black p-2 shadow-md border-2">
          Update Profile
        </h1>
        <form
          onSubmit={handleSubmit(updateUser)}
          className="flex flex-col gap-4 mt-5"
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className={`border-2 rounded-md border-zinc-300 shadow-md`}
                {...register("first_name", {
                  required: true,
                })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className={`border-2 rounded-md border-zinc-300 shadow-md`}
                {...register("last_name", {
                  required: true,
                })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone">Mobile Number</label>
            <input
              type="text"
              className={`border-2 rounded-md border-zinc-300 shadow-md`}
              {...register("phone", {
                required: true,
              })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              disabled
              className={`border-2 rounded-md border-zinc-200 shadow-md bg-zinc-100`}
              value={account?.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              disabled
              value={account?.username}
              className={`border-2 rounded-md border-zinc-200 shadow-md bg-zinc-100`}
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button className="rounded-lg px-7 py-3 bg-black text-white w-full text-sm">
              Update Profile
            </button>
          </div>

          <Link href="/user/chpwd">
            <a className="text-blue-500 text-lg">Change Password</a>
          </Link>
        </form>
      </div>
    </DashPage>
  )
}

export default ChPWD
