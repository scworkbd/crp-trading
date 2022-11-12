import { z } from "zod"
import { createRouter } from "../context"

export const settingsRouter = createRouter()
  .query("settings", {
    async resolve({ ctx }) {
      const settings = await ctx.prisma.settings.findFirst()
      return settings
    },
  })
  .mutation("updateSettings", {
    input: z.object({
      data: z.object({
        bkash: z.string(),
        nagad: z.string(),
        upay: z.string(),
        whatsapp_number: z.string(),
        telegram_link: z.string(),
        live_chat_link: z.string(),
        registration_bonus: z.number(),
        referral_commision: z.number(),
        bkash_percentage: z.number(),
        min_withdraw: z.number(),
        max_withdraw: z.number(),
        min_deposit: z.number(),
        cashout_enabled: z.boolean(),
        cashout_notice: z.string().optional(),
        app_download_link: z.string().optional(),
        cryptoAddress: z.string(),
      }),
    }),
    async resolve({ ctx, input }) {
      const settings = await ctx.prisma.settings.findFirst()

      if (settings) {
        await ctx.prisma.settings.update({
          where: {
            id: settings.id,
          },
          data: input.data,
        })
      }
    },
  })
  .mutation("updateImage", {
    input: z.object({
      url: z.string(),
    }),
    async resolve({ ctx, input }) {
      const settings = await ctx.prisma.settings.findFirst()

      await ctx.prisma.settings.update({
        where: {
          id: settings?.id,
        },

        data: {
          qrCodeUrl: input.url,
        },
      })
    },
  })
