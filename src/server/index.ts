// src/server/router/index.ts
import { createRouter } from "./context"
import superjson from "superjson"

import { userRouter } from "./router/user.router"
import { adminRouter } from "./router/admin.router"
import { depositRouter } from "./router/deposit.router"
import { withdrawRouter } from "./router/withdraw.router"
import { settingsRouter } from "./router/settings.rourter"
import { withdrawRouter as cWithdrawRouter } from "./router/cryptowithdraw.router"

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("admin.", adminRouter)
  .merge("deposit.", depositRouter)
  .merge("withdraw.", withdrawRouter)
  .merge("cwithdraw.", cWithdrawRouter)
  .merge("settings.", settingsRouter)

// export type definition of API
export type AppRouter = typeof appRouter
