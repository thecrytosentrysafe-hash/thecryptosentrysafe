"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowUp, ArrowDown, ArrowLeftRight, SlidersHorizontal, Zap } from "lucide-react";
import { SendModal } from "@/components/modals/send-modal";
import { ReceiveModal } from "@/components/modals/receive-modal";
import Link from "next/link";
import CryptoCoins from "@/components/crypto-coins";
import { User } from "@/lib/auth";

function DashboardClient({ coinData, user }: { coinData: CryptoData[], user: User }) {
  const [balanceShow, setBalanceShow] = useState(true);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  // Calculate total balance
  const totalBalanceOn = coinData
    .reduce((sum, coin) => sum + coin.balance * coin.price, 0);

  const balance = totalBalanceOn.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const totalValue24hAgo = coinData.
    filter(coin => coin.on)
    .reduce((sum, coin) => {
      const price24hAgo =
        coin.price / (1 + coin.change24h / 100)

      return sum + coin.balance * price24hAgo
    }, 0)

  const portfolio24hPercent =
    totalValue24hAgo === 0
      ? 0
      : Number(
        (
          ((totalBalanceOn - totalValue24hAgo) /
            totalValue24hAgo) *
          100
        ).toFixed(2)
      )

  return (
    <main className="p-2 px-4 pb-24 md:pb-4">
      <div className="border-b border-x border-gray-200 rounded-lg">
        {/* Balance Display */}
        <div className="mt-6 flex flex-col border-b border-gray-200 items-center justify-center h-[25dvh]">
          <p>
            {user.UUID}
          </p>
          <div className="text-3xl md:text-4xl font-bold">
            {balanceShow ? `$${balance}` : "••••"}
          </div>
          <div className="text-xs font-medium">
            {balanceShow ? `${balance} ${portfolio24hPercent > 0 ? "+" : ""}` : "••••"} (${portfolio24hPercent}%)
          </div>
          <button
            onClick={() => setBalanceShow(!balanceShow)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            {balanceShow ? (
              <Eye className="text-xl w-5 h-5" />
            ) : (
              <EyeOff className="text-xl w-5 h-5" />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-4 gap-4 h-[20dvh]">
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowSendModal(true)}
              className="h-16 w-16 rounded-full bg-gray-200 dark:bg-[#374151] hover:bg-gray-300 dark:hover:bg-[#2e3847] flex items-center justify-center"
            >
              <ArrowUp className="text-xl w-5 h-5" />
            </button>
            <span className="mt-2 text-sm">Send</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowReceiveModal(true)}
              className="h-16 w-16 rounded-full bg-gray-200 dark:bg-[#374151] hover:bg-gray-300 dark:hover:bg-[#2e3847] flex items-center justify-center"
            >
              <ArrowDown className="text-xl w-5 h-5" />
            </button>
            <span className="mt-2 text-sm">Receive</span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/buy"
              className="h-16 w-16 rounded-full bg-blue-700 hover:bg-blue-600 flex items-center justify-center"
            >
              <Zap color="white" className="text-xl w-5 h-5" />
            </Link>
            <span className="mt-2 text-sm">Buy</span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/swap"
              className="h-16 w-16 rounded-full bg-gray-200 dark:bg-[#374151] hover:bg-gray-300 dark:hover:bg-[#2e3847] flex items-center justify-center"
            >
              <ArrowLeftRight className="text-xl w-5 h-5" />
            </Link>
            <span className="mt-2 text-sm">Swap</span>
          </div>
        </div>

        {/* Crypto Assets */}
        <div className="mt-8">
          <div className="flex justify-between border-b border-gray-200 mb-4">
            <h2 className="font-semibold text-sm text-blue-700 border-b-2 px-3 py-2 border-blue-700 w-max">Crypto</h2>

            <SlidersHorizontal />
          </div>

          <CryptoCoins coinData={coinData} page="dashboard" path={undefined} />

          <Link
            href="/crypto/manage"
            className="w-full block text-center text-sm text-blue-700 my-10 font-medium"
          >
            Manage crypto
          </Link>
        </div>

        {/* Modals */}
        <SendModal
          isOpen={showSendModal}
          onClose={() => setShowSendModal(false)}
        />
        <ReceiveModal
          isOpen={showReceiveModal}
          onClose={() => setShowReceiveModal(false)}
        />
      </div>
    </main>
  );
}

export default DashboardClient