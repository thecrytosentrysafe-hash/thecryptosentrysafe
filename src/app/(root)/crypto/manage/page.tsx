import CryptoManageClient from '@/components/clients/crypto-manage-client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function CryptoManage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw redirect("/login");
  }

  return <CryptoManageClient user={session.user} />
}

export default CryptoManage