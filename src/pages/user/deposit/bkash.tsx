import React from "react"
import type { NextPage } from "next"
import DashPage from "../../../components/DashPage"
import DepositForm from "../../../components/DepositForm"
import CopyNumberForm from "../../../components/CopyNumberForm"

const Deposit: NextPage = () => {
  return (
    <DashPage hideFooter>
      <div className="p-5">
        <h1
          className="p-2 text-center text-2xl font-bold shadow-md border-2
        "
        >
          Bkash Deposit
        </h1>
        <div className="mt-5shadow-md rounded-md p-5">
          <p className="text-xl text-green-500">Copy number and send money</p>

          <CopyNumberForm method="bkash" />
          <DepositForm method="bkash" />
        </div>
      </div>
    </DashPage>
  )
}

export default Deposit
