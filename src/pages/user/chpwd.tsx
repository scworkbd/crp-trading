import React from "react"
import { useForm } from "react-hook-form"
import DashPage from "../../components/DashPage"
import { trpc } from "../../utils/trpc"
import { toast } from "react-hot-toast"
import { BiLoaderAlt } from "react-icons/bi"

type UserInput = {
  old_pass: string
  new_pass: string
  new_pass_conf: string
}

const ChPWD = () => {
  const { reset, register, handleSubmit, getValues } = useForm<UserInput>()

  const { mutate, isLoading } = trpc.useMutation(["user.updatePassword"], {
    onSuccess: () => {
      toast.success("Password Updated")
      reset()
    },
  })

  const updateUser = (values: UserInput) => {
    mutate({
      data: values,
    })
  }

  return (
    <DashPage>
      <div className="p-5">
        <h1 className="text-3xl font-bold text-center text-black p-2 rounded-md border-2">
          Change Password
        </h1>

        <form
          onSubmit={handleSubmit(updateUser)}
          className="flex flex-col gap-4 mt-5"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="old_pass">Old Password</label>

            <input
              type="password"
              className="border-2 border-zinc-100 rounded-md"
              {...register("old_pass", {
                required: true,
                minLength: 6,
              })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password_hash">New Password</label>

            <input
              type="password"
              className="border-2 border-zinc-100 rounded-md"
              {...register("new_pass", {
                required: true,
                minLength: 6,
              })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="new_pass_conf">Confirm Password</label>

            <input
              type="password"
              className="border-2 border-zinc-100 rounded-md"
              {...register("new_pass_conf", {
                validate: (value: string) => {
                  const values = getValues()
                  return values.new_pass === value
                },
              })}
            />
          </div>

          <div className="mt-3">
            <button className="px-7 py-3 bg-black w-full text-white text-center flex items-center justify-center gap-2 rounded-lg">
              {isLoading && <BiLoaderAlt />}
              Update Password
            </button>
          </div>
        </form>
      </div>
    </DashPage>
  )
}

export default ChPWD
