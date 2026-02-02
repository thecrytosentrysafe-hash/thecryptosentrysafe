"use client";

import { CRYPTO_ASSETS } from '@/constants'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CryptoImage from '../crypto-image'
import { Switch } from '../ui/switch'
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/auth';
import { useState } from 'react';
import { getCoinKey } from '@/lib/utils';

function CryptoManageClient({ user }: { user: User }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const coins = JSON.parse(user.coins) as UserCoin;

  const handleSwitchChange = (checked: boolean, coinKey: keyof UserCoin) => {
    const currentCoins = JSON.parse(user.coins) as UserCoin;

    const updatedCoins: UserCoin = {
      ...currentCoins,
      [coinKey]: {
        ...currentCoins[coinKey],
        on: checked,
      },
    };

    setIsLoading(true)
    authClient.updateUser(
      { coins: JSON.stringify(updatedCoins) },
      {
        onError(context) {
          setIsLoading(false)
          toast.error(context.error.message || "An error occurred. Please try again.");
        },
        onSuccess() {
          router.refresh();
          toast.success("Status updated successfully");
          setTimeout(() => {
            setIsLoading(false)
          }, 3000)
        },
      }
    );
  };

  return (
    <section className="p-2 px-4 pb-24 md:pb-4 text-[15px]">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold text-center flex-1">Manage Crypto</h1>
        <div className="w-6"></div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-t-xl md:rounded-lg w-full max-h-[80vh]">
        <div className="p-4">
          {CRYPTO_ASSETS.map((asset) => {
            const coinKey = getCoinKey(asset as CryptoData) as keyof UserCoin;

            return (
              <div
                key={coinKey}
                className="w-full flex items-center justify-between p-4 rounded-lg transition-colors shadow-sm mb-4"
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
                      {asset.network && (
                        <span className="text-xs">
                          {asset.name} ({asset.network})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {asset.network ? `${asset.symbol} ${asset.network}` : asset.name}
                    </div>
                  </div>
                </div>

                <Switch
                  disabled={isLoading}
                  checked={coins[coinKey]?.on ?? false}
                  onCheckedChange={(checked) =>
                    handleSwitchChange(checked, coinKey)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default CryptoManageClient