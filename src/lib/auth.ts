import { betterAuth } from "better-auth";
import mongoose from "mongoose";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import connectToDb from "@/config/connectToDb";
import { getResetPasswordTemplate } from "./email-templates/reset-password";
import { getPasswordChangeConfirmationTemplate } from "./email-templates/password-change-confirmation";
import { getEmailVerificationTemplate } from "./email-templates/email-verification";
import { sendEmail } from "./mail";
import { generateSecureCode } from "./utils";
import { getWelcomeEmailTemplate } from "./email-templates/welcome";

await connectToDb();

export const auth = betterAuth({
  database: mongodbAdapter(mongoose.connection.db!),
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await Promise.allSettled([
            sendEmail({
              to: user.email,
              subject: "Welcome to The Cryptosentry Safe",
              html: getWelcomeEmailTemplate(user.name, user.email, (user as User).UUID)
            }),
            sendEmail({
              to: process.env.EMAIL_USER!,
              subject: "New User Registration",
              html: `
              <h1>New User Registered</h1>
              <p><strong>Name:</strong> ${user.name}</p>
              <p><strong>Email:</strong> ${user.email}</p>
            `
            })
          ])
        }
      }
    }
  },
  user: {
    additionalFields: {
      kyc: {
        type: "json",
        defaultValue: {
          status: "not_submitted",
          front_id: "",
          back_id: "",
          proof_of_residence: ""
        },
        required: true
      },
      passcode: {
        type: "string",
        required: false
      },
      UUID: {
        type: "string",
        required: true,
        unique: true,
        defaultValue: generateSecureCode(7)
      },
      referredBy: {
        type: "string",
        required: false
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "user"
      },
      coins: {
        type: "string",
        required: true,
        defaultValue: JSON.stringify({
          BTC: {
            balance: 0,
            on: true
          },
          "USDT_TRC20": {
            balance: 0,
            on: true,
            network: "TRC20"
          },
          "USDT_BNB": {
            balance: 0,
            on: true,
            network: "BNB"
          },
          "USDT_ERC20": {
            balance: 0,
            on: true,
            network: "ERC20"
          },
          ETH: {
            balance: 0,
            on: true
          },
          TRX: {
            balance: 0,
            on: true
          },
          BNB: {
            balance: 0,
            on: true
          },
          DOT: {
            balance: 0,
            on: true
          },
          BCH: {
            balance: 0,
            on: true
          },
          LTC: {
            balance: 0,
            on: true
          },
          XLM: {
            balance: 0,
            on: true
          },
          DASH: {
            balance: 0,
            on: true
          },
          SOL: {
            balance: 0,
            on: true
          },
          DOGE: {
            balance: 0,
            on: true
          },
          XDC: {
            balance: 0,
            on: true
          },
          XRP: {
            balance: 0,
            on: true
          }
        }),
      }
    }
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify Your Email - The Cryptosentry Safe",
        html: getEmailVerificationTemplate(user.name, url)
      })
    },
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset Your Password - The Cryptosentry Safe",
        html: getResetPasswordTemplate(user.name, url)
      })
    },
    onPasswordReset: async (data) => {
      await sendEmail({
        to: data.user.email,
        subject: "Your password has been changed",
        html: getPasswordChangeConfirmationTemplate(data.user.name)
      })
    },
  },
  deleteUser: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    admin()
  ]
});

export type User = typeof auth.$Infer.Session["user"];
