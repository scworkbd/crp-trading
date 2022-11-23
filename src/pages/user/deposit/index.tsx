import React from "react"
import type { NextPage } from "next"

import Link from "next/link"
import Image from "next/image"

import { BiChevronRight } from "react-icons/bi"

import DashPage from "../../../components/DashPage"

const Deposit: NextPage = () => {
  return (
    <DashPage>
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5 text-center p-2 shadow-md border-2 rounded-md">
          Deposit
        </h1>

        <div className="grid grid-cols-1 gap-5">
          <Link href="/user/deposit/bkash">
            <div className="flex items-center justify-center bg-zinc-100 shadow-md p-5 gap-5 rounded-lg">
              <div>
                <Image
                  src="/icons/bkash.png"
                  width={50}
                  height={50}
                  alt="bkash"
                />
              </div>

              <p className="text-2xl font-bold uppercase">Bkash</p>
              <BiChevronRight className="text-2xl ml-auto" />
            </div>
          </Link>

          <Link href="/user/deposit/nagad">
            <div className="flex items-center bg-zinc-100 shadow-md p-5 gap-5 rounded-lg">
              <div>
                <Image
                  src="/icons/nagad.png"
                  width={50}
                  height={50}
                  alt="bkash"
                />
              </div>

              <p className="text-2xl font-bold uppercase">Nagad</p>

              <BiChevronRight className="text-2xl ml-auto" />
            </div>
          </Link>
        </div>
      </div>
    </DashPage>
  )
}

export default Deposit
