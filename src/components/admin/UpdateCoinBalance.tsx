"use client";

import { useState } from 'react'
import { toast } from 'sonner'
import { TableCell } from '../ui/table';
import Loader from '../Loader';
import { User } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { createNotification } from '@/actions/notification.action';
import { CRYPTO_ASSETS, NotificationCategory } from '@/constants';
import { getCoinKey } from '@/lib/utils';

function UpdateCoinBalanceButton({ user, prices }: { user: User, prices: Record<string, number> }) {
  const router = useRouter();

  const [type, setType] = useState("")
  const [amountInUsd, setAmountInUsd] = useState(0)

  const [isSubmitting, setIsSubmitting] = useState(false);

  const userCoins = JSON.parse(user.coins) as UserCoin;

  const handleClick = () => {
    if (!type) return toast.error("Please choose the type of coin to add balance.")
    if (amountInUsd <= 0) return toast.error("Amount must be greater than zero.")

    const coinPrice = prices[type];
    if (!coinPrice || coinPrice === 0) {
      return toast.error("Could not determine current price for this coin.")
    }

    const newCoinBalance = amountInUsd / coinPrice;

    setIsSubmitting(true);

    authClient.admin.updateUser({
      userId: user.id,
      data: {
        coins: JSON.stringify({
          ...userCoins,
          [type]: {
            ...userCoins[type as keyof UserCoin],
            balance: newCoinBalance,
          }
        })
      }
    }, {
      onError(context) {
        setIsSubmitting(false);
        toast.error(context.error.message || "An error occured. Please try again.")
      },
      onSuccess() {
        setIsSubmitting(false);
        toast.success(`Successfully added $${amountInUsd} worth of ${type}.`)
        createNotification({
          userId: user.id,
          type: NotificationCategory.RECEIVE,
          title: "Balance Updated",
          description: `You received $${amountInUsd} worth of ${type} (${newCoinBalance.toFixed(6)} ${type}).`,
          to: type,
          toAmount: newCoinBalance
        })
        setAmountInUsd(0)
        router.refresh();
      }
    });
  }

  return (
    <>
      <TableCell className="text-gray-500">
        <select required value={type} onChange={(e) => setType(e.target.value)} className="w-[120px] border rounded px-3 py-2 focus:outline-none focus:border-[#42a5f5]">
          <option value="">Choose</option>
          {CRYPTO_ASSETS.map((asset) => {
            const key = getCoinKey(asset);
            return (
              <option key={key} value={key}>
                {asset.symbol} {asset.network ? `(${asset.network})` : ""}
              </option>
            )
          })}
        </select>
      </TableCell>
      <TableCell className="text-gray-500">
        <input
          type="number"
          value={amountInUsd}
          className="border pl-2 w-full max-w-[100px]"
          min={1}
          placeholder="USD Amount"
          onChange={(e) => {
            setAmountInUsd(Boolean(e.target.valueAsNumber) ? e.target.valueAsNumber : 0)
          }}
        />
      </TableCell>
      <TableCell>
        <button
          onClick={handleClick}
          disabled={isSubmitting}
          style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
          className="px-6 py-2 bg-[#3b99fb] font-semibold text-sm rounded-sm text-white"
        >
          {isSubmitting ? <Loader /> : "Update"}
        </button>
      </TableCell>
    </>
  )
}

export default UpdateCoinBalanceButton;