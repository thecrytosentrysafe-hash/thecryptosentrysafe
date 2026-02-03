"use client";

import { ChevronLeft, TrendingUp, CreditCard, ArrowUp, ArrowDown, ArrowLeftRight, Zap, ArrowDownLeft, ArrowUpRight, ShoppingBag, ClipboardCheck, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import CryptoImage from '../crypto-image';
import Link from "next/link";
import { cn, formatDate } from '@/lib/utils';
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

  const getIcon = (type: string) => {
    switch (type) {
      case "swap":
        return <ArrowLeftRight className="w-5 h-5 text-blue-500" />
      case "deposit":
        return <ArrowDownLeft className="w-5 h-5 text-green-500" />
      case "withdraw":
        return <ArrowUpRight className="w-5 h-5 text-red-500" />
      case "buy":
        return <ShoppingBag className="w-5 h-5 text-yellow-500" />
      case "recieve":
        return <ArrowDownLeft className="w-5 h-5 text-green-500" />
      case "kyc_update":
        return <ClipboardCheck className="w-5 h-5 text-orange-500" />
      case "wallet_connect":
        return <Bell className="w-5 h-5 text-indigo-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

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
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{balance} {coinSymbol}</h2>
          <p className="text-gray-500 dark:text-gray-400">${usdValue}</p>
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
          {JSON.parse(transactions).length > 0 ? (
            (JSON.parse(transactions) as NotificationType[]).map((notification) => (
              <div
                key={notification._id}
                className="bg-white rounded-lg p-4 shadow-md border border-gray-200 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Content */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Icon */}
                    <div className="shrink-0">
                      <div className="w-10 h-10 flex items-center justify-center">
                        {getIcon(notification.type)}
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {notification.title || (
                          notification.type === "swap" ? "Crypto Swap" :
                            notification.type === "deposit" ? "Deposit" :
                              notification.type === "withdraw" ? "Withdrawal" :
                                notification.type === "buy" ? "Buy Crypto" :
                                  notification.type === "recieve" ? "Receive Balance" :
                                    notification.type === "kyc_update" ? "KYC Update" :
                                      notification.type === "wallet_connect" ? "Wallet Connected" : "Notification"
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 wrap-break-word">
                        {notification.description || (
                          notification.type === "swap"
                            ? `Swapped ${notification.fromAmount} ${notification.from} to ${notification.toAmount} ${notification.to}`
                            : notification.type === "withdraw"
                              ? `Withdraw Failed ${notification.fromAmount} ${notification.from}`
                              : notification.type === "deposit"
                                ? `Deposited ${notification.toAmount} ${notification.to}`
                                : notification.type === "buy"
                                  ? `Bought ${notification.toAmount} ${notification.to}`
                                  : notification.type === "wallet_connect"
                                    ? "Your wallet has been successfully connected."
                                    : ""
                        )}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-500 mt-2 inline-block">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))) : (
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