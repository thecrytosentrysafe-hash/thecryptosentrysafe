'use client'

import { User } from '@/lib/auth'
import { useState } from 'react'
import UploadBox from '../upload-box'
import { uploadKyc } from '@/actions/kyc.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function KycClient({ user }: { user: User }) {
  const router = useRouter();

  const status = user.kyc.status ?? "not_submitted" as KycStatus
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const front_id = formData.get("front_id") as File
    const back_id = formData.get("back_id") as File
    const proof_of_residence = formData.get("proof_of_residence") as File

    if (!front_id || !back_id || !proof_of_residence) {
      toast.error("Please upload all documents")
      return
    }

    setLoading(true)

    try {
      const { success, message } = await uploadKyc(front_id, back_id, proof_of_residence)

      if (!success) {
        toast.error(message)
        return
      }

      toast.success(message)
      router.refresh();
    } catch {
      toast.error('Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-semibold text-center mb-6">
        KYC Verification
      </h1>

      {status === 'not_submitted' && (
        <InfoBanner text="Upload your documents to verify your account." />
      )}

      {status === 'rejected' && (
        <ErrorBanner text="KYC rejected. Please reupload your documents." />
      )}

      {status === 'pending' && (
        <PendingBanner />
      )}

      {status === 'approved' && (
        <SuccessBanner />
      )}

      {(status === 'not_submitted' || status === 'rejected') && (
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <UploadBox
            label="ID (Front)"
            name="front_id"
            description="Driving license, National ID, Passport, Birth certificate"
            isLoading={loading}
          />

          <UploadBox
            label="ID (Back)"
            name="back_id"
            description="Back side of the uploaded ID"
            isLoading={loading}
          />

          <UploadBox
            label="Proof of Residence"
            name="proof_of_residence"
            description="This can be your: Water bill, Electricity bill, Telephone bill, Internet bill, Credit card bill or Statement, Bank statement."
            isLoading={loading}
          />

          <button
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium"
          >
            {loading ? 'Submitting...' : 'Submit for Verification'}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-gray-500 mt-4">
        Average verification time: 24–48 hours
      </p>
    </div>
  )
}

export default KycClient;

function InfoBanner({ text }: { text: string }) {
  return (
    <div className="bg-blue-50 text-blue-600 p-4 rounded-xl mb-6 text-center">
      {text}
    </div>
  )
}

function ErrorBanner({ text }: { text: string }) {
  return (
    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-center">
      {text}
    </div>
  )
}

function PendingBanner() {
  return (
    <div className="bg-blue-50 p-4 rounded-xl mb-6 text-center text-blue-600">
      Documents under review. Verification pending…
    </div>
  )
}

function SuccessBanner() {
  return (
    <div className="bg-green-50 p-4 rounded-xl mb-6 text-center text-green-600">
      Your account has been verified successfully!
    </div>
  )
}