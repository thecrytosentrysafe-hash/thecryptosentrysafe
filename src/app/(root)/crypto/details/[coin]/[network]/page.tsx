import { getCoinRelatedTransactions } from '@/actions/notification.action';
import CryptoDetailsNetworkClient from '@/components/clients/crypto-details-network-client'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

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