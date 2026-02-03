import { CRYPTO_ASSETS } from '@/constants';
import { getCoinRelatedTransactions } from '@/actions/notification.action';
import CryptoDetailsNetworkClient from '@/components/clients/crypto-details-network-client'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';

export async function getCoinData(coinId: string) {
  try {
    const asset = CRYPTO_ASSETS.filter(asset => asset.id === coinId)[0];

    if (!asset) {
      throw new Error("Coin does not exist");
    }
  
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`,
    );

    if (!res.ok) throw new Error("Failed to fetch coin");

    const data = await res.json();

        console.log(data);

    return {
        price: Number(data[coinId]?.usd || 0),
        change24h: Number(data[coinId]?.usd_24h_change || 0),
        volume_24h: Number(data[coinId]?.usd_24h_vol || 0),
        market_cap: Number(data[coinId]?.usd_market_cap || 0),
      };
    } catch (err) {
      console.log("Error getting coin: ", err)
      return {}
    }
}
    
type Params = {
  params: Promise<{ coin: string, network: string }>
}

async function CryptoDetailsNetwork({ params }: Params) {
  const { coin, network } = (await params);

  const asset = CRYPTO_ASSETS.filter(asset => asset.symbol === coin.toUpperCase())[0];

  if (!asset) {
    throw notFound();
  }

  const [session, assetData] = await Promise.all([
    auth.api.getSession({
      headers: await headers()
    }),
    getCoinData(asset.id)
  ])

  if (!session) {
    throw redirect("/login")
  }

  const transactions = await getCoinRelatedTransactions(session.user.id, coin.toLocaleUpperCase());

  const coinProp = (
    network === "native" ? coin.toUpperCase() : `${coin.toUpperCase()}_${network.toUpperCase()}`
  ) as keyof UserCoin
  const coinPrice = assetData ? { usd: assetData.price } : { usd: 0 };

  return (
    <CryptoDetailsNetworkClient
      coin={coin}
      transactions={JSON.stringify(transactions)}
      coinDetails={{
        coinBalance: (JSON.parse(session.user.coins) as UserCoin)[coinProp].balance,
        coinPrice: coinPrice.usd || 0,
        coinName: asset.name,
        src: asset.icon_image,
        alt: asset.name,
        networkSrc: asset.network_image,
        network: asset.network
      }}
    />
  )
}

export default CryptoDetailsNetwork