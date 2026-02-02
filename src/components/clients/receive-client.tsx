"use client";

import { useState } from "react"
import { ArrowLeft, Copy, Share2 } from "lucide-react"
import Link from "next/link"
import CryptoImage from "../crypto-image";
import { User } from "@/lib/auth";
import { QRCodeSVG as QRCode } from "qrcode.react"
import { CRYPTO_ASSETS } from "@/constants";

interface ReceiveClientProps {
  method: "payid" | "external"
  coin: string
  network: string
  user: User
}

function ReceiveClient({ method, coin, network, user }: ReceiveClientProps) {
  const payid = user.UUID;;
  const address = `${coin}_${user.id}`;
  const [copied, setCopied] = useState(false)

  const coinDetails = CRYPTO_ASSETS.find(asset => {
    return asset.network === network || asset.symbol === coin.toLocaleUpperCase()
  })

  const displayValue = method === "payid" ? payid : address
  const currency = coin.toUpperCase();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(displayValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const sharePayID = async () => {
    const text = method === "payid" ? `My PayID: ${payid}` : `My ${currency} Address: ${address}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Receive ${currency}`,
          text: text,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    }
  }

  return (
    <main className="min-h-screen bg-white transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">Receive {currency}</h1>
        <div className="w-6" />
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Warning Banner */}
        <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-yellow-500 text-xl shrink-0">⚠</div>
            <p className="text-yellow-500 text-sm">
              Only send {currency} assets
              {method === "payid" ? " from a Ledger Chain Pay ID to your Ledger Chain Pay ID." : " to this address."}
            </p>
          </div>
        </div>

        {/* Coin Header */}
        <div className="flex items-center justify-center space-x-2 pt-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black">
            <CryptoImage
              src={coinDetails?.icon_image ?? ""}
              alt={coinDetails?.name ?? ""}
              networkSrc={coinDetails?.network_image ?? ""}
              network={coinDetails?.network ?? ""}
            />
          </div>
          <span className="text-lg font-medium">{currency}</span>
          {network !== "native" && (
            <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">
              {network}
            </span>
          )}
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center space-y-6">
          {/* QR Code */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <QRCode
              value={displayValue}
              size={256}
              level="H"
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </div>

          {/* Display Value */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {method === "payid" ? "PayID" : `${currency} Address`}
            </p>
            <p className="text-sm font-mono break-all px-4 select-all max-w-xs">{displayValue}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-8 pt-4">
          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <Copy className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">{copied ? "Copied!" : "Copy"}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={sharePayID}
            className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Share</span>
          </button>
        </div>

        {/* Copy Success Message */}
        {copied && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg animate-fade-in-out">
            {method === "payid" ? "PayID" : "Address"} copied to clipboard
          </div>
        )}
      </div>
    </main>
  )
}

export default ReceiveClient;