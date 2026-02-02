import DashboardClient from "@/components/clients/dashboard-client"
import { CRYPTO_ASSETS } from "@/constants"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const getCryptoAssets = async () => {
  try {
    const uniqueIds = [...new Set(CRYPTO_ASSETS.map((asset) => asset.id))].join(",")
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${uniqueIds}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch crypto data")
    }

    const data = await response.json()

    const coinData = CRYPTO_ASSETS.map((coin) => {
      return {
        symbol: coin.symbol,
        name: coin.name,
        id: coin.id,
        balance: coin.balance,
        icon_image: coin.icon_image,
        network_image: coin.network_image,
        network: coin.network,
        on: coin.on,
        price: Number(data[coin.id]?.usd || 0),
        change24h: Number(data[coin.id]?.usd_24h_change || 0),
        volume_24h: Number(data[coin.id]?.usd_24h_vol || 0),
        market_cap: Number(data[coin.id]?.usd_market_cap || 0),
      }
    })

    return coinData;
  } catch (err) {
    console.error("Error fetching crypto data:", err)
    return []
  }
}

async function Dashboard() {
  const [session, cryptoData] = await Promise.all([
    auth.api.getSession({
      headers: await headers()
    }),
    getCryptoAssets()
  ])

  if (!session) {
    throw redirect("/login")
  }

  const coinData = cryptoData.map(coin => {
    const userCoins = JSON.parse(session.user.coins) as UserCoin;
    let coinSymbol = ""
    if (coin.symbol === "USDT" && coin.network === "TRC20") {
      coinSymbol = "USDT_TRC20"
    } else if (coin.symbol === "USDT" && coin.network === "BNB") {
      coinSymbol = "USDT_BNB"
    } else if (coin.symbol === "USDT" && coin.network === "ERC20") {
      coinSymbol = "USDT_ERC20"
    } else {
      coinSymbol = coin.symbol
    }

    return {
      ...coin,
      balance: Number(userCoins[coinSymbol as keyof typeof userCoins].balance),
      on: userCoins[coinSymbol as keyof typeof userCoins].on
    }
  })

  return <DashboardClient coinData={coinData} user={session.user} />
}

export default Dashboard