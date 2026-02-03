import { getCoinRelatedTransactions } from '@/actions/notification.action';
import CryptoDetailsNetworkClient from '@/components/clients/crypto-details-network-client'
import { CRYPTO_ASSETS } from '@/constants';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const getCoinDetails = async (coinId: string) => {
  try {
    const coin = CRYPTO_ASSETS.find((asset) => asset.id === coinId);

    if (!coin) throw new Error("Coin does not exist")
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch crypto data")
    }
    
    const data = await response.json()

    return console.log(data)

    const coinData = CRYPTO_ASSETS.map((coin) => {
      return {
        symbol: coin.symbol,
        name: coin.name,
        id: coin.id,
        balance: coin.balance,
        icon_image: coin.icon_image,
        network_image: coin.network_image,
        network: coin.network,
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

type Params = {
  params: Promise<{ coin: string, network: string }>
}

async function CryptoDetailsNetwork({ params }: Params) {
  const { coin, network } = (await params);

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw redirect("/login")
  }

  const transactions = await getCoinRelatedTransactions(session.user.id, coin.toLocaleUpperCase());

  return (
    <CryptoDetailsNetworkClient
      coin={coin}
      network={network}
      transactions={JSON.stringify(transactions)}
    />
  )
}

export default CryptoDetailsNetwork