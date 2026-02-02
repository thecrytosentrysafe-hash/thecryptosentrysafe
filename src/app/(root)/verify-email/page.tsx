"use client";

import { useState } from "react";
import { Mail, RefreshCcw, CheckCircle, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data, isPending } = authClient.useSession();

  const handleResend = async () => {
    if (isPending || !data?.user?.email) {
      toast.error("Email not found. Please login again.");
      return;
    }

    setIsLoading(true);

    authClient.sendVerificationEmail(
      {
        email: data.user.email,
        callbackURL: "/dashboard",
      },
      {
        onError(context) {
          setIsLoading(false);
          toast.error(
            context.error.message || "An error occurred. Please try again."
          );
        },
        onSuccess() {
          setIsLoading(false);
          setIsSuccess(true);
          toast.success("Verification email sent successfully.");
        },
      }
    );
  };

  if (isPending) {
    return (
      <div className="fixed inset-0 z-50">
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Loader2 className="h-7 w-7 text-gray-600 animate-spin" />
            </div>

            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Loading session
            </h1>

            <p className="text-gray-600 text-sm">
              Please wait while we check your account…
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
          {!isSuccess ? (
            <>
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                <Mail className="h-7 w-7 text-blue-600" />
              </div>

              {/* Title */}
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Verify your email
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6">
                We’ve sent a verification link to your email address.
                <br />
                Please check your inbox and click the link to continue.
              </p>

              {/* Resend Button */}
              <button
                onClick={handleResend}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium py-3 rounded-xl transition"
              >
                <RefreshCcw
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                {isLoading ? "Resending..." : "Resend verification email"}
              </button>
            </>
          ) : (
            <>
              {/* Success Icon */}
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-7 w-7 text-green-600" />
              </div>

              {/* Success Title */}
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Email sent successfully 🎉
              </h1>

              {/* Success Message */}
              <p className="text-gray-600 text-sm">
                A new verification email has been sent.
                <br />
                Please check your inbox.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}