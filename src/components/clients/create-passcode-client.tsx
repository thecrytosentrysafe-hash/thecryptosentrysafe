"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, ArrowLeft, Delete as Delete2, Check } from "lucide-react"
import { createPasscode } from "@/actions/passcode.action"

type PasscodeStep = "create" | "confirm" | "success"

function CreatePasscodeClient() {
  const [step, setStep] = useState<PasscodeStep>("create")
  const [passcode, setPasscode] = useState("")
  const [confirmPasscode, setConfirmPasscode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleAddNumber = (num: number) => {
    const currentPasscode = step === "create" ? passcode : confirmPasscode

    if (currentPasscode.length < 6) {
      const newPasscode = currentPasscode + num

      if (step === "create") {
        setPasscode(newPasscode)
      } else {
        setConfirmPasscode(newPasscode)
      }

      setError("")

      // Auto-proceed when 6 digits are entered
      if (newPasscode.length === 6) {
        if (step === "create") {
          setTimeout(() => setStep("confirm"), 300)
        } else {
          handleVerifyMatch(newPasscode)
        }
      }
    }
  }

  const handleDelete = () => {
    if (step === "create") {
      setPasscode(passcode.slice(0, -1))
    } else {
      setConfirmPasscode(confirmPasscode.slice(0, -1))
    }
  }

  const handleClear = () => {
    if (step === "create") {
      setPasscode("")
    } else {
      setConfirmPasscode("")
    }
    setError("")
  }

  const handleVerifyMatch = async (confirmCode: string) => {
    const code = confirmCode

    if (code.length !== 6) {
      setError("Please enter a 6-digit passcode")
      return
    }

    if (passcode !== code) {
      setError("Passcodes do not match")
      setConfirmPasscode("")
      return
    }

    setIsLoading(true)
    try {
      const { success } = await createPasscode(code);
      if (success) {
        setTimeout(() => {
          setStep("success")
          router.push("/dashboard")
        }, 2000)
      } else {
        setError("Failed to create passcode")
        setConfirmPasscode("")
        setIsLoading(false)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setConfirmPasscode("")
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoBack = () => {
    if (step === "confirm") {
      setStep("create")
      setConfirmPasscode("")
      setError("")
    } else {
      router.back()
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === "confirm") {
      handleVerifyMatch(passcode)
    } else if (step === "create") {
      setStep("confirm")
    }
  }

  const currentPasscode = step === "create" ? passcode : confirmPasscode
  const isStepComplete = currentPasscode.length === 6

  if (!isMobile) {
    // Desktop Version
    return (
      <>
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 p-2 text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            {step === "success" ? (
              <Check className="w-8 h-8 text-green-500" />
            ) : (
              <Lock className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
            )}
          </div>

          {step === "success" ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Passcode Created</h1>
              <p className="text-gray-600 dark:text-gray-400">Your passcode has been set successfully</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {step === "create" ? "Create Passcode" : "Confirm Passcode"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {step === "create" ? "Enter a 6-digit passcode for security" : "Re-enter your passcode to confirm"}
              </p>
            </>
          )}
        </div>

        {step === "success" ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Redirecting to settings...</p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Passcode Input */}
            <div>
              <div className="relative group">
                <input
                  type="password"
                  value={currentPasscode}
                  onChange={(e) => {
                    const val = e.target.value.slice(0, 6).replace(/[^0-9]/g, "")
                    if (step === "create") {
                      setPasscode(val)
                    } else {
                      setConfirmPasscode(val)
                    }
                  }}
                  maxLength={6}
                  className="block w-full text-center text-2xl tracking-[1em] py-4 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-600 focus:border-transparent dark:text-gray-200 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 group-hover:border-yellow-500 dark:group-hover:border-yellow-600"
                  placeholder="••••••"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  autoFocus
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isStepComplete}
              className="w-full px-4 py-3 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="flex items-center justify-center">
                {isLoading ? "Processing..." : step === "create" ? "Next" : "Create Passcode"}
              </span>
            </button>
          </form>
        )}
      </>
    )
  }

  // Mobile Version with Keypad
  return (
    <div className="fixed inset-0 bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center">
      {/* Back Button */}
      <div className="p-2 self-start">
        <button
          onClick={handleGoBack}
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center px-6 flex-1">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            {step === "success" ? (
              <Check className="w-8 h-8 text-green-500" />
            ) : (
              <Lock className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
            )}
          </div>

          {step === "success" ? (
            <>
              <h1 className="text-2xl font-bold text-green-500 dark:text-green-400 mb-2">Passcode Created!</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your security passcode is ready</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-yellow-500 dark:text-yellow-400 mb-2">
                {step === "create" ? "Create Passcode" : "Confirm Passcode"}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step === "create" ? "Step 1 of 2" : "Step 2 of 2"}
              </p>
            </>
          )}
        </div>

        {step === "success" ? (
          <div className="text-center flex-1 flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
          </div>
        ) : (
          <>
            {/* Passcode Dots */}
            <div className="flex space-x-4 mb-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 transform ${i < currentPasscode.length
                    ? "bg-yellow-500 dark:bg-yellow-400 scale-125"
                    : "bg-gray-300 dark:bg-gray-600"
                    }`}
                ></div>
              ))}
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {/* Number buttons 1-9 */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleAddNumber(num)}
                  disabled={isLoading || currentPasscode.length === 6}
                  className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {num}
                </button>
              ))}

              {/* Bottom Row */}
              <button
                type="button"
                onClick={handleClear}
                disabled={isLoading}
                className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-500 active:scale-95 disabled:opacity-50"
              >
                <span className="text-xs">Clear</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddNumber(0)}
                disabled={isLoading || currentPasscode.length === 6}
                className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                0
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isLoading || currentPasscode.length === 0}
                className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-yellow-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-500 active:scale-95 disabled:opacity-50"
              >
                <Delete2 className="w-6 h-6 mx-auto" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CreatePasscodeClient;