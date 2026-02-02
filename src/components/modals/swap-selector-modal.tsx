import { CRYPTO_ASSETS } from "@/constants";
import CryptoImage from "../crypto-image";
import { X } from "lucide-react";
import { User } from "@/lib/auth";

type Params = {
  isOpen: boolean,
  onClose: () => void,
  user: User,
  selectCrypto: (asset: { network: string | null, symbol: string }) => void,
  from: FromAndTo,
  to: FromAndTo,
  currentSelector: "from" | "to",
  setFromAmount: (amount: string) => void,
  setToAmount: (amount: string) => void,
  setAmount: (amount: number) => void,
}

function SwapSelectorModal({
  isOpen, onClose, user, selectCrypto, from, to, currentSelector, setFromAmount, setToAmount, setAmount
}: Params) {
  if (!isOpen) return null;

  const coins = JSON.parse(user.coins) as UserCoin;

  const handleSelectorChange = (asset: { network: string | null, symbol: string }) => {
    setFromAmount("0")
    setToAmount("0")
    setAmount(0)
    selectCrypto({ network: asset.network, symbol: asset.symbol })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white dark:bg-gray-900 rounded-t-xl md:rounded-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-900 z-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Select Asset</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {CRYPTO_ASSETS.map((asset) => {
            const coinKey = asset.network ? `${asset.symbol}_${asset.network}` : asset.symbol;
            const coin = coins[coinKey as keyof UserCoin]
            if (!coin.on) return null
            console.log(from.symbol, to.symbol)
            if (from.symbol === asset.symbol && currentSelector === "to") return null
            if (to.symbol === asset.symbol && currentSelector === "from") return null

            return (
              <button
                key={asset.id + crypto.randomUUID()}
                onClick={() => handleSelectorChange(asset)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <CryptoImage
                    src={asset.icon_image}
                    alt={asset.name}
                    networkSrc={asset.network_image}
                    network={asset.network}
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">{asset.symbol}</span>

                      <span className="text-xs">
                        {asset.network ? `${asset.name} (${asset.network})` : asset.name}
                      </span>
                    </div>
                    <div className="text-xs text-left text-gray-600 dark:text-gray-400">
                      <span>Balance:</span> {coin.balance}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SwapSelectorModal