"use client";

import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { Badge } from '../ui/badge';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createNotification } from '@/actions/notification.action';
import { NotificationCategory } from '@/constants';

function KycClientButton({ kyc, userId }: { kyc: { status: string, front_id: string, back_id: string, proof_of_residence: string }, userId: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleKyc = (status: KycStatus) => {
    if (kyc.status === status) return toast.error("Kyc Status is already " + status)
    if (isSubmitting) return
    setIsSubmitting(true)
    authClient.admin.updateUser({
      userId,
      data: {
        kyc: {
          ...kyc,
          status
        }
      }
    }, {
      onError(context) {
        toast.error(context.error.message || "An error occured.")
        setIsSubmitting(false)
      },
      onSuccess() {
        toast.success("Kyc Status updated successfully")
        createNotification({
          userId,
          type: NotificationCategory.KYC_UPDATE,
          title: `KYC ${status.charAt(0).toUpperCase() + status.slice(1)}`,
          description: `Your KYC verification has been ${status}.`,
        })
        router.refresh()
        setIsSubmitting(false)
      }
    })
  }

  return (
    <div>
      <span className="block mb-4 capitalize">Kyc Status: <Badge>{kyc.status}</Badge></span>

      <div className="flex flex-col justify-start w-full gap-3">
        <button
          className='text-sm bg-green-500 w-1/2 px-2 py-1 rounded-md'
          onClick={() => handleKyc("approved")}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.5 : 1, cursor: isSubmitting ? "not-allowed" : "pointer", pointerEvents: isSubmitting ? "none" : "auto" }}
        >
          Change to Approved
        </button>
        <button
          className='text-sm bg-blue-500 w-1/2 px-2 py-1 rounded-md'
          onClick={() => handleKyc("pending")}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.5 : 1, cursor: isSubmitting ? "not-allowed" : "pointer", pointerEvents: isSubmitting ? "none" : "auto" }}
        >
          Change to Pending
        </button>
        <button
          className='text-sm bg-red-500 w-1/2 px-2 py-1 rounded-md'
          onClick={() => handleKyc("rejected")}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.5 : 1, cursor: isSubmitting ? "not-allowed" : "pointer", pointerEvents: isSubmitting ? "none" : "auto" }}
        >
          Change to Rejected
        </button>
      </div>
    </div>
  )
}

export default KycClientButton