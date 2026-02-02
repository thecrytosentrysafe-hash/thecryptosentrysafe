"use server";

import { auth } from "@/lib/auth";
import { compareValue, hashValue } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwt";
import { PASSCODE_TOKEN } from "@/lib/utils";
import { cookies, headers } from "next/headers";

export const createPasscode = async (passcode: string) => {
  try {
    const passcodeToken = signToken(passcode);
    const hashedPasscode = await hashValue(passcode);
    await auth.api.updateUser({
      body: {
        passcode: hashedPasscode
      },
      headers: await headers()
    });

    const thirtyMinutesFromNow = new Date(Date.now() + 30 * 60 * 1000);

    (await cookies()).set(PASSCODE_TOKEN, passcodeToken, {
      httpOnly: true,
      sameSite: "strict",
      expires: thirtyMinutesFromNow,
      secure: process.env.NODE_ENV !== "development"
    })

    return { success: true }
  } catch (error) {
    console.log(error)
    return { success: false }
  }
}

export const verifyPasscode = async (passcode: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user.passcode) {
      return { success: false, error: "Unauthorized" };
    }

    const isValid = await compareValue(
      passcode,
      session.user.passcode
    );

    if (!isValid) {
      return { success: false };
    }

    const passcodeToken = signToken(passcode);

    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    (await cookies()).set(PASSCODE_TOKEN, passcodeToken, {
      httpOnly: true,
      sameSite: "strict",
      expires: expiresAt,
      secure: process.env.NODE_ENV !== "development"
    });

    return { success: true };
  } catch (error) {
    console.error("verifyPasscode error:", error);
    return { success: false };
  }
}