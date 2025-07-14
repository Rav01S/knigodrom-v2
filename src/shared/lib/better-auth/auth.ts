import { prisma } from "@prisma/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "../nodemailer/nodemailer";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        sendEmail({
          to: user.email,
          subject: "Подтверждение удаления аккаунта",
          html: `
            <p>Для подтверждения удаления аккаунта перейдите по следующей ссылке:</p>
            <p><a href="${url}">${url}</a></p>
          `,
        });
      },
    },
  },
});
