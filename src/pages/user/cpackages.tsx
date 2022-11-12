import React, { Fragment, useState } from "react"

import { useRouter } from "next/router"

import { toast } from "react-hot-toast"
import { Packages } from "@prisma/client"
import { Dialog, Transition } from "@headlessui/react"

import { BiLoaderAlt } from "react-icons/bi"

import DashPage from "../../components/DashPage"
import { useSettings } from "../../hooks/useSettings"
import { trpc } from "../../utils/trpc"
import { useAccount } from "../../hooks/useAccount"
import { BsFillLightningChargeFill } from "react-icons/bs"

const Package = () => {
  const [selPack, setSelPack] = useState<Packages | null>(null)
  const { data: account } = useAccount()
  const { data: settings } = useSettings()
  const { data: packages } = trpc.useQuery(["admin.packages"])
  const router = useRouter()

  const { mutate, isLoading } = trpc.useMutation(["user.subscribe"], {
    onSuccess: () => {
      toast.success("Package activated")
      router.push("/user/dashboard")
    },
    onError: () => {
      if (account?.current_pack) {
        toast.error("You already have a package active")
      } else {
        toast.error("You don't have enough balance")
      }
      setSelPack(null)
    },
  })

  const startPackage = () => {
    if (!selPack) {
      return
    }

    mutate({
      pack: selPack.id,
    })
  }

  return (
    <DashPage hideFooter>
      <div className="p-5">
        <h1 className="text-3xl font-bold text-center p-2 shadow-md border-2">
          Packages
        </h1>
        <div className="grid grid-cols-1 gap-5 mt-5">
          {packages?.map((pack) => (
            <div className="p-5 bg-zinc-900" key={pack.id}>
              {/* <h1 className="flex items-center justify-center">
                <BiPackage className="text-5xl text-white" />
              </h1> */}

              <h2 className="text-3xl font-bold text-center text-white flex items-center justify-between">
                <span>{pack.name}</span>
                <div className="text-white text-2xl ">{pack.price} USDT</div>
              </h2>

              <ul className="mt-5 text-white text-xl">
                <li>Cashback: {pack.cashback} USDT</li>
                <li>Daily Ads: {pack.daily_limit}</li>
                <li>Daily Income: {pack.daily_limit * pack.per_click} USDT</li>
                <li>Per Click: {pack.per_click} USDT</li>
                <li>
                  <span>Refer Bonus: </span>
                  <span>
                    {(
                      (pack.price / 100) *
                      (settings ? settings?.referral_commision : 0)
                    ).toFixed(0)}
                  </span>
                  <span> USDT</span>
                </li>
                <li>Expire: {pack.validity} day</li>
              </ul>

              <button
                onClick={() => setSelPack(pack)}
                className="
                  bg-white hover:bg-slate-100 text-black 
                  flex items-center  justify-center gap-2 
                  px-5 py-3 w-full mt-5"
              >
                Activate <BsFillLightningChargeFill />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Transition appear show={selPack ? true : false} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setSelPack(null)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all text-white">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 inline-flex justify-between items-center w-full"
                  >
                    <span className="font-bold">{selPack?.name}</span>
                  </Dialog.Title>
                  <div className="pt-5">
                    <p>Are you sure to activate this pack?</p>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startPackage()}
                        className="inline-flex gap-2 justify-center items-center bg-green-600 px-5 py-2 text-sm font-medium text-white"
                      >
                        {isLoading && <BiLoaderAlt className="animate-spin" />}
                        Yes
                      </button>

                      <button
                        type="button"
                        className="inline-flex gap-2 justify-center items-center bg-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-600"
                        onClick={() => setSelPack(null)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </DashPage>
  )
}

export default Package
