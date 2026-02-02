"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ChevronRight, Computer, CreditCard, Phone, X } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { createNotification } from "@/actions/notification.action"
import { User } from "@/lib/auth"
import { NotificationCategory } from "@/constants"
import { sendEmail } from "@/lib/mail"

interface BuyDetailsClientProps {
  coin: string
  network: string
  coinData: CryptoData[]
  user: User
}

const PAYMENT_PROVIDERS = [
  { id: "binance", name: "Binance", icon: CreditCard, href: "binance.com" },
  { id: "transak", name: "Transak", icon: Computer, href: "transak.com" },
  { id: "moonpay", name: "MoonPay", icon: Phone, href: "moonpay.com" },
]

function BuyDetailsClient({ coin, network, coinData, user }: BuyDetailsClientProps) {
  const [usdAmount, setUsdAmount] = useState("150")
  const [cryptoAmount, setCryptoAmount] = useState("0")
  const [selectedProvider, setSelectedProvider] = useState<(typeof PAYMENT_PROVIDERS)[0] | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const coinMap = new Map<string, CryptoData>();

  coinData.forEach(coin => {
    const key = `${coin.symbol}:${coin.network ?? "native"}`;
    coinMap.set(key, coin);
  });
  const coinPrice = coinMap.get(`${coin.toLocaleUpperCase()}:${network}`)?.price || 0
  const displayCoin = coin.toUpperCase();

  useEffect(() => {
    const amount = Number.parseFloat(usdAmount) || 0
    const crypto = amount / coinPrice
    setCryptoAmount(crypto.toFixed(8))
  }, [usdAmount, coinPrice])

  const handleSelectProvider = (provider: (typeof PAYMENT_PROVIDERS)[0]) => {
    setSelectedProvider(provider)
  }

  const handleBuyNow = async () => {
    if (!selectedProvider) {
      return toast.error("Please select a payment method");
    }

    await Promise.all([
      createNotification({
        userId: user.id,
        type: NotificationCategory.BUY,
        to: displayCoin,
        toAmount: Number.parseFloat(cryptoAmount),
        title: "Buy Order Initiated",
        description: `You are being redirected to ${selectedProvider.name} to complete your purchase of ${cryptoAmount} ${displayCoin}.`,
      }),
      // sendEmail({
      //   to: process.env.NEXT_PUBLIC_EMAIL_USER!,
      //   subject: "A User Initiated a Buy Order",
      //   html: `
      //     <div>
      //       <p>User: ${user.name}</p>
      //       <p>Email: ${user.email}</p>
      //       <p>Amount: ${usdAmount}</p>
      //       <p>Crypto Amount: ${cryptoAmount}</p>
      //       <p>Coin: ${displayCoin}</p>
      //       <p>Network: ${network}</p>
      //       <p>Provider: ${selectedProvider.name}</p>
      //     </div>
      //   `,
      // })
    ])

    window.open(
      `https://${selectedProvider.href}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section className="p-4 pb-24 md:pb-4 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-[20dvh]">
        <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold text-center flex-1">
          Buy <span className="capitalize">{coin}</span>
        </h1>
        <div className="w-6"></div>
      </div>

      {/* Amount Display */}
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="flex items-center justify-center mb-2">
          <span className="text-3xl">$</span>
          <input
            type="number"
            value={usdAmount}
            onChange={(e) => setUsdAmount(e.target.value)}
            className="w-32 bg-transparent text-3xl text-center focus:outline-none"
            min="0"
            step="10"
          />
        </div>
        <p className="text-gray-400">
          ≈ {cryptoAmount} {displayCoin}
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="max-w-md mx-auto space-y-4">
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white rounded-lg p-4 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                {selectedProvider ? (
                  <selectedProvider.icon />
                ) : (
                  <i className="fas fa-credit-card text-gray-600 dark:text-gray-400"></i>
                )}
              </div>
              <div className="text-left">
                <p className="font-semibold text-yellow-500">
                  {selectedProvider ? selectedProvider.name : "Choose Payment Method"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedProvider ? selectedProvider.name : "Select provider"}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          disabled={isLoading || !selectedProvider}
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-lg transition-colors duration-300"
        >
          Buy {displayCoin} Now
        </button>
      </div>

      {/* Payment Method Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Payment Methods List */}
            <div className="space-y-3">
              {PAYMENT_PROVIDERS.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleSelectProvider(provider)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors ${selectedProvider?.id === provider.id
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  <provider.icon />
                  <span className="font-semibold">{provider.name}</span>
                </button>
              ))}
            </div>

            {/* Confirm Button */}
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Confirm Payment Method
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default BuyDetailsClient