"use client"
import { useState } from "react"
import { ArrowRight, ChevronRight, Loader2, Lock, LogOut, UserCheck } from "lucide-react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

function SettingsClient() {
  const router = useRouter()

  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = () => {
    setLoggingOut(true)
    authClient.signOut(undefined, {
      onError(context) {
        setLoggingOut(false)
        toast.error(context.error.message || "An error occured.")
      },
      onSuccess() {
        setLoggingOut(false)
        toast.success("Successfully Logged out.")
        router.push("/login")
      }
    })
  }

  return (
    <>
      {/* Security Section */}
      <div className="mt-8">
        <h2 className="text-yellow-500 font-semibold text-lg text-center mb-4">Security</h2>
        <div className="space-y-0 bg-transparent rounded-lg transition-colors shadow-sm border border-gray-200">
          <Link
            href="/kyc"
            className="flex items-center justify-between hover:bg-gray-50 border-b border-gray-200 transition-colors"
          >
            <div
              className="flex items-center p-4 hover:bg-gray-50 transition-colors"
            >
              <UserCheck color="blue" className="mr-3 text-gray-600 dark:text-gray-400 w-5" />
              <span>Account verification</span>
            </div>

            <ChevronRight color="gray" />
          </Link>

          <Link
            href="/profile"
            className="flex items-center justify-between hover:bg-gray-50  border-b border-gray-200 transition-colors"
          >
            <div
              className="flex items-center p-4 hover:bg-gray-50 transition-colors"
            >
              <Lock color="blue" className="mr-3 text-gray-600 dark:text-gray-400 w-5" />
              <span>Password settings</span>
            </div>

            <ChevronRight color="gray" />
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <div
        className="mt-10 p-4 hover:bg-gray-200 bg-gray-100 transition-colors text-red-500 rounded-lg"
      >
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center justify-center w-full bg-transparent"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div >

      {/* Logout Confirmation Modal */}
      {
        showLogoutModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-sm">
              <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Are you sure you want to logout?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  disabled={loggingOut}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  {loggingOut ? <Loader2 className="animate-spin" /> : "Logout"}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default SettingsClient