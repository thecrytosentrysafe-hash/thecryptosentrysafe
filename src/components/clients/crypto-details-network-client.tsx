"use client";

import { ChevronLeft, TrendingUp, CreditCard, ArrowUp, ArrowDown, ArrowLeftRight, ExternalLink, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { formatDate } from '@/lib/utils';
import CryptoImage from '../crypto-image';
import Link from "next/link";
import { cn } from '@/lib/utils';
import { useModal } from '@/hooks/use-modal';

interface CryptoDetailsNetworkClientProps {
  coin: string
  transactions: string
  coinDetails: {
    coinBalance: number
    coinPrice: number
    coinName: string
    src: string;
    alt: string;
    networkSrc: string | null;
    network: string | null;
  }
}

function CryptoDetailsNetworkClient({ coin, transactions, coinDetails }: CryptoDetailsNetworkClientProps) {
  const router = useRouter();

  const { openSendModal, openReceiveModal } = useModal();

  const coinName = coinDetails.coinName
  const coinSymbol = coin.toUpperCase()
  const balance = coinDetails.coinBalance || 0;
  const usdValue = balance * coinDetails.coinPrice;

  const getHref = (rootPath: string) => {
    return `${rootPath}/${coin.toLowerCase() === "usdt" ? `${coin.toLowerCase()}/trc20` : `${coin.toLowerCase()}/native`}`
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => router.back()}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{coinSymbol}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {coinSymbol} | {coinName}
          </p>
        </div>
        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <TrendingUp size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4">
        {/* Coin Icon */}
        <div className="flex justify-center my-8">
          <CryptoImage
            src={coinDetails.src}
            alt={coinDetails.alt}
            networkSrc={coinDetails.networkSrc}
            network={coinDetails.network}
          />
        </div>

        {/* Balance */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{balance} BTC</h2>
          <p className="text-gray-500 dark:text-gray-400">{usdValue}</p>
        </div>

        {/* Action Buttons */}
        <div className="my-8 grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <button
              onClick={openSendModal}
              className="h-16 w-16 rounded-full bg-gray-200 dark:bg-[#374151] hover:bg-gray-300 dark:hover:bg-[#2e3847] flex items-center justify-center"
            >
              <ArrowUp className="text-xl w-5 h-5" />
            </button>
            <span className="mt-2 text-sm">Send</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={openReceiveModal}
              className="h-16 w-16 rounded-full bg-gray-200 dark:bg-[#374151] hover:bg-gray-300 dark:hover:bg-[#2e3847] flex items-center justify-center"
            >
              <ArrowDown className="text-xl w-5 h-5" />
            </button>
            <span className="mt-2 text-sm">Receive</span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href={getHref("/buy/details")}
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

        {/* Transactions Section */}
        <div className="mb-8">
          <div className="flex justify-between border-b border-gray-200 mb-4">
            <h2 className="font-semibold text-sm text-blue-700 border-b-[2px] px-3 py-2 border-blue-700 w-max">Transactions</h2>
          </div>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {(JSON.parse(transactions) as NotificationType[]).length > 0
            ? (JSON.parse(transactions) as NotificationType[]).map((tx) => {
              const isPositive = tx.from === coin.toUpperCase();

              return (
                <div
                  key={tx._id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${isPositive ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="text-white" size={20} />
                      ) : (
                        <TrendingUp className="text-white rotate-180" size={20} />
                      )}
                    </div>

                    {/* Details */}
                    <div>
                      <h4 className="font-semibold">
                        {isPositive ? `Swapped from ${tx.to}` : `Swapped to ${tx.from}`}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(tx.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                      {isPositive ? `+${tx.fromAmount}` : `-${tx.toAmount}`} {isPositive ? tx.to : tx.from}
                    </p>
                  </div>
                </div>
              )
            }) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <ArrowLeftRight />
                <p>No transactions yet</p>
                <Link
                  href={`/`}
                  className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded-lg text-white"
                >
                  <CreditCard />
                  Buy {coinSymbol}
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </main>
  )
}

export default CryptoDetailsNetworkClient