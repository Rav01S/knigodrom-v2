import { prisma } from "@prisma/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { sendEmail } from "../nodemailer/nodemailer";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 20 * 60,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Сброс пароля",
        html: `<p>Перейдите по ссылке, чтобы сбросить пароль: <a href="${url}">${url}</a></p>`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async (data) => {
      const url = new URL(data.url);
      url.searchParams.set("callbackURL", "/auth/is-email-verified");
      sendEmail({
        to: data.user.email,
        subject:
          "Спасибо за регистрацию на моем сайте. Подтвердите ваш email, перейдя по ссылке ниже",
        html: `
            <p>Ссылка:</p>
            <p><a href="${url}">${url}</a></p>
          `,
      });
    },
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
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, url }) => {
        sendEmail({
          to: user.email,
          subject: "Подтверждение изменения email",
          html: `
            <p>Для изменения email перейдите по следующей ссылке:</p>
            <p><a href="${url}">${url}</a></p>
          `,
        });
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
  pages: {
    signUp: "/auth/sign-up",
    signIn: "/auth/sign-in",
  },
});

export const serverIsAuthed = async () => {
  return !!(await auth.api.getSession({
    headers: await headers(),
  }));
};
