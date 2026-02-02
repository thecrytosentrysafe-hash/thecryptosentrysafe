"use client";

import { X, Shield, Coins } from "lucide-react";
import Link from "next/link";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SendModal({ isOpen, onClose }: SendModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-100"
      onClick={onClose}
    >
      <div
        className="bg-white w-96 rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Send
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {/* Ledger Chain PayId Option */}
          <Link href="/send/payid" className="block">
            <button
              onClick={onClose}
              className="w-full bg-white hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg p-4 text-left"
            >
              <div className="flex items-start">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                  <Shield className="text-black w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-500">
                    Send via Ledger Chain PayId
                  </h3>
                  <p className="text-sm text-gray-800 dark:text-gray-300 mt-1">
                    Send coins from Ledger Chain to Ledger Chain fast and free.
                    No network fee
                  </p>
                </div>
              </div>
            </button>
          </Link>

          {/* Cryptocurrency Option */}
          <Link href="/send/external" className="block">
            <button
              onClick={onClose}
              className="w-full bg-white hover:bg-white dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg p-4 text-left"
            >
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <Coins className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    Send via Cryptocurrency
                  </h3>
                  <p className="text-sm text-gray-800 dark:text-gray-300 mt-1">
                    Send coins from your Ledger Chain crypto wallet. Network fees
                    included
                  </p>
                </div>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}