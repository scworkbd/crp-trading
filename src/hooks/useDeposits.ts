import { trpc } from "../utils/trpc"

export const useDeposit = () => {
  const { data, status, isLoading } = trpc.useQuery(["user.depositsByUser"])

  if (status === "loading") {
    return { data, isLoading: true }
  }

  return { data, isLoading }
}
