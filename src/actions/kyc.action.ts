"use server";

import { auth } from "@/lib/auth";
import { sendEmail } from "@/lib/mail";
import { v2 as cloudinary } from "cloudinary";
import { headers } from "next/headers";

import { createNotification } from "./notification.action";
import { NotificationCategory } from "@/constants";
import { getKycSubmissionAdminTemplate } from "@/lib/email-templates/kyc-submission-admin";
import { getKycReceivedUserTemplate } from "@/lib/email-templates/kyc-confirmation";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function uploadImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "web3-orbit-ledger",
      },
      (error, result) => {
        if (error || !result) {
          console.error("Cloudinary upload error:", error);
          return reject(new Error("Upload failed"));
        }

        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
}

export const uploadKyc = async (
  front_id: File,
  back_id: File,
  proof_of_residence: File
) => {
  try {
    const [front_id_url, back_id_url, proof_of_residence_url] = await Promise.all([
      uploadImage(front_id),
      uploadImage(back_id),
      uploadImage(proof_of_residence)
    ])
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return {
        success: false,
        message: "User not found"
      }
    };

    await auth.api.updateUser({
      body: {
        kyc: {
          status: "pending" as KycStatus,
          front_id: front_id_url,
          back_id: back_id_url,
          proof_of_residence: proof_of_residence_url
        }
      },
      headers: await headers()
    })

    await Promise.allSettled([
      createNotification({
        userId: session.user.id,
        type: NotificationCategory.KYC_UPDATE,
        title: "KYC Submitted",
        description: `Your KYC has been submitted for verification.`,
      }),
      sendEmail({
        to: session.user.email,
        subject: "KYC Submission Received",
        html: getKycReceivedUserTemplate(session.user.name)
      }),
      sendEmail({
        to: process.env.EMAIL_USER!,
        subject: "New KYC Submission",
        html: getKycSubmissionAdminTemplate(
          front_id_url,
          back_id_url,
          proof_of_residence_url,
          session.user.name,
          session.user.email
        )
      })
    ])

    return {
      success: true,
      message: "KYC uploaded successfully"
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to upload KYC"
    }
  }
}