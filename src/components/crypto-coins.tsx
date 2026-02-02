"use client";

import Link from "next/link";
import CryptoImage from "./crypto-image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type CryptoCoinsProps = {
  coinData: CryptoData[],
  page: "dashboard" | "send" | "receive" | "buy",
  path: "payid" | "external" | undefined
}

function CryptoCoins({ coinData, page, path }: CryptoCoinsProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/dashboard";

  if ((page === "send" || page === "receive") && !path) {
    throw new Error("Please provide a path")
  }

  const getHref = (asset: CryptoData) => {
    switch (page) {
      case "dashboard":
        return `/crypto/details/${asset.symbol.toLowerCase()}/${asset.network ? asset.network.toLowerCase() : "native"}`
      case "buy":
        return `/buy/details/${asset.symbol.toLowerCase()}/${asset.network ? asset.network : "native"}`
      case "send":
        return `/send/${path}/${asset.symbol.toLowerCase()}/${asset.network ? asset.network : "native"}`
      case "receive":
        return `/receive/${path}/${asset.symbol.toLowerCase()}/${asset.network ? asset.network : "native"}`
    }
  }

  return (
    <div className={cn("space-y-4", !isHomePage && "space-y-2")}>
      {coinData.map((asset) => {
        if (!asset.on) {
          return null;
        }

        const href = getHref(asset);

        const isPositive = asset.change24h >= 0;

        return (
          <Link
            key={asset.id + crypto.randomUUID()}
            href={href}
            className="block"
          >
            <div
              className={cn(
                "flex items-center justify-between p-4 py-2 rounded-lg"
              )}
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
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    ${asset.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span
                      className={isPositive ? "text-green-500" : "text-red-500"}
                    >
                      {isPositive ? "+" : ""}
                      {asset.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">{asset.balance}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  ${(asset.balance * asset.price).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default CryptoCoins;