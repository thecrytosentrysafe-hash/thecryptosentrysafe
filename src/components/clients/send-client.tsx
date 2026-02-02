"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

interface TransactionPreview {
  recipient: string
  amount: number
  fee: number
  total: number
  usdValue: number
}

interface SendClientProps {
  method: "payid" | "external"
  coin: string
  network: string
  coinData: CryptoData[]
}

function SendClient({ method, coin, network, coinData }: SendClientProps) {
  const [payid, setPayid] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [payidError, setPayidError] = useState("")
  const [addressError, setAddressError] = useState("")
  const [amountError, setAmountError] = useState("")
  const [showProgress, setShowProgress] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const coinMap = new Map<string, CryptoData>();

  coinData.forEach(coin => {
    const key = `${coin.symbol}:${coin.network ?? "native"}`;
    coinMap.set(key, coin);
  });

  const maxAmount = coinMap.get(`${coin.toLocaleUpperCase()}:${network}`)?.balance || 0
  const fee = 0.0
  const price = coinMap.get(`${coin}:${network}`)?.price || 0;
  const currency = coin.toUpperCase()

  const calculatePreview = (): TransactionPreview => {
    const numAmount = Number.parseFloat(amount) || 0
    const total = numAmount + fee
    const usdValue = total * price

    const recipient = method === "payid" ? recipientName || "Not selected" : recipientAddress || "Not entered"

    return {
      recipient,
      amount: numAmount,
      fee,
      total,
      usdValue,
    }
  }

  const preview = calculatePreview()

  const isFormValid =
    amount &&
    Number.parseFloat(amount) > 0 &&
    Number.parseFloat(amount) + fee <= maxAmount &&
    !amountError &&
    ((method === "payid" && payid.trim() && !payidError && recipientName) ||
      (method === "external" && recipientAddress.trim() && !addressError))

  const handlePayidChange = async (value: string) => {
    setPayid(value)
    setPayidError("")
    setRecipientName("")

    if (!value.trim()) return

    setIsVerifying(true)
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (value.includes("@")) {
        setRecipientName(value.split("@")[0])
      } else {
        setPayidError("Invalid PayID format")
      }
    } catch (error) {
      setPayidError("Error verifying PayID")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleAddressChange = (value: string) => {
    setRecipientAddress(value)
    setAddressError("")

    if (value.trim() && value.length < 20) {
      setAddressError("Address too short")
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (method === "payid") {
        handlePayidChange(text)
      } else {
        handleAddressChange(text)
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err)
    }
  }

  const handlePercentage = (percentage: number) => {
    const newAmount = (maxAmount * percentage) / 100
    setAmount(newAmount.toString())
    setAmountError("")
  }

  const handleAmountChange = (value: string) => {
    setAmount(value)
    setAmountError("")

    const numValue = Number.parseFloat(value)
    if (numValue + fee > maxAmount) {
      setAmountError("Insufficient balance")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    setShowProgress(true)
    const progressInterval = setInterval(() => {
      const progressBar = document.getElementById("progressBar") as HTMLElement
      if (progressBar) {
        const currentWidth = Number.parseFloat(progressBar.style.width || "0")
        if (currentWidth < 90) {
          progressBar.style.width = `${currentWidth + Math.random() * 20}%`
        }
      }
    }, 300)

    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearInterval(progressInterval)
      const progressBar = document.getElementById("progressBar") as HTMLElement
      if (progressBar) {
        progressBar.style.width = "100%"
      }

      // Success - you would redirect or show success modal here
      setTimeout(() => {
        setShowProgress(false)
        // Handle successful submission
      }, 500)
    } catch (error) {
      clearInterval(progressInterval)
      setShowProgress(false)
      console.error("Send error:", error)
    }
  }

  return (
    <main className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      <div className="w-full mx-auto py-4 px-6 pb-24 md:pb-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/send" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">
            Send {currency} {network !== "native" && `(${network.toUpperCase()})`}
          </h1>
          <div className="w-8"></div>
        </div>

        <div className="mx-auto space-y-6">
          {/* Sending Method */}
          <div className="bg-white dark:bg-gray-800 bg-opacity-50 p-3 rounded-lg text-center">
            <p className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Sending via - </span>
              <span className="text-yellow-500">{method === "payid" ? "PayID" : "Crypto"}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {method === "payid" ? (
              <>
                {/* PayID Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300">PayID</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={payid}
                      onChange={(e) => handlePayidChange(e.target.value)}
                      placeholder="Enter PayID"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                    />
                    <button
                      type="button"
                      onClick={handlePaste}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-500 hover:text-yellow-400 px-2"
                    >
                      {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Paste"}
                    </button>
                  </div>
                  {payidError && <p className="text-red-500 text-sm">{payidError}</p>}
                  {recipientName && <p className="text-green-500 text-sm">Recipient: {recipientName}</p>}
                </div>
              </>
            ) : (
              <>
                {/* Crypto Address Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800 dark:text-gray-300">
                    Recipient Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={recipientAddress}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      placeholder={`Enter ${currency} address`}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                    />
                    <button
                      type="button"
                      onClick={handlePaste}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-500 hover:text-yellow-400 px-2"
                    >
                      Paste
                    </button>
                  </div>
                  {addressError && <p className="text-red-500 text-sm">{addressError}</p>}
                </div>
              </>
            )}

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  step="0.00000001"
                  min="0"
                  placeholder="0.0000"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-400">{currency}</span>
                  <button
                    type="button"
                    onClick={() => handlePercentage(100)}
                    className="text-yellow-500 hover:text-yellow-400 px-2"
                  >
                    Max
                  </button>
                </div>
              </div>
              {amountError && <p className="text-red-500 text-sm">{amountError}</p>}
            </div>

            {/* Percentage Buttons */}
            <div className="grid grid-cols-4 gap-4">
              {[25, 50, 75, 100].map((percentage) => (
                <button
                  key={percentage}
                  type="button"
                  onClick={() => handlePercentage(percentage)}
                  className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  {percentage}%
                </button>
              ))}
            </div>

            {/* Balance Info */}
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>≈ ${preview.usdValue.toFixed(2)}</span>
              <span>
                Available: {maxAmount.toFixed(8)} {currency}
              </span>
            </div>

            {/* Preview Section */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold text-lg">Transaction Preview</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Recipient:</span>
                  <span className="font-medium">{preview.recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                  <span className="font-medium">
                    {preview.amount.toFixed(8)} {currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Transfer Fee:</span>
                  <span className="font-medium">
                    {preview.fee.toFixed(8)} {currency}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-300 dark:border-gray-700 pt-2 font-semibold">
                  <span>Total Amount:</span>
                  <span>
                    {preview.total.toFixed(8)} {currency}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Progress Modal */}
      {showProgress && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md mx-4 p-6 rounded-lg">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold mb-2">Processing Transaction</h3>
              <p className="text-sm text-gray-500">Please wait while we process your transaction...</p>
            </div>

            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 rounded bg-yellow-100">
                <div
                  id="progressBar"
                  className="h-full bg-yellow-500 transition-all duration-500"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <p id="progressStatus" className="text-xs text-center text-gray-500">
                Initializing transfer...
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default SendClient;