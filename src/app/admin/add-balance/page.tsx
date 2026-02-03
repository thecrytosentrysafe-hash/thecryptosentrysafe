import { auth, User } from '@/lib/auth'
import { AlertOctagon } from 'lucide-react'
import { headers } from 'next/headers'
import { CRYPTO_ASSETS } from '@/constants'
import { getCoinKey } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UpdateCoinBalanceButton from '@/components/admin/UpdateCoinBalance'

const getCryptoAssets = async () => {
  try {
    const uniqueIds = [...new Set(CRYPTO_ASSETS.map((asset) => asset.id))].join(",")
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${uniqueIds}&vs_currencies=usd`,
      { next: { revalidate: 60 } }
    )

    if (!response.ok) {
      throw new Error("Failed to fetch crypto data")
    }

    const data = await response.json()
    const prices: Record<string, number> = {}

    CRYPTO_ASSETS.forEach((coin) => {
      const key = getCoinKey(coin)
      prices[key] = data[coin.id]?.usd || 0
    })

    return prices
  } catch (err) {
    console.error("Error fetching crypto data:", err)
    return {}
  }
}

async function AddBalance() {
  try {
    const [result, prices] = await Promise.all([
      auth.api.listUsers({
        query: { limit: 100 },
        headers: await headers()
      }),
      getCryptoAssets()
    ])

    const users = result.users as User[]

    return (
      <div className="w-full max-w-6xl mx-auto pt-4">
        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Coin Balance</TableHead>
                <TableHead>Coin Type</TableHead>
                <TableHead>New Coin Balance (USD)</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0
                ? users.map((user) => {
                  const userCoins = JSON.parse(user.coins) as UserCoin;

                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        {user.name}
                      </TableCell>
                      <TableCell>
                        {user.email}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        <select className="w-[120px] border rounded px-3 py-2 focus:outline-none focus:border-[#42a5f5]">
                          <option>Old balance</option>
                          {CRYPTO_ASSETS.map((asset) => {
                            const key = getCoinKey(asset);
                            const balance = (userCoins[key as keyof UserCoin] as any)?.balance || 0;
                            return (
                              <option key={key}>
                                {asset.symbol}: {balance}
                              </option>
                            )
                          })}
                        </select>
                      </TableCell>

                      <UpdateCoinBalanceButton user={user} prices={prices} />
                    </TableRow>
                  )
                }) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-[#a0a0b2] py-6">
                      No data found.
                    </TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </div >
      </div >
    )
  } catch {
    return (
      <div className="w-full flex justify-center items-center mt-2">
        <AlertOctagon color="red" size={15} /> <p className="text-red-700">An error occurred. Please check your internet connection and refresh the page.</p>
      </div>
    )
  }
}

export default AddBalance