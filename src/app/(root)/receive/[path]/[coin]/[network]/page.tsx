import ReceiveClient from "@/components/clients/receive-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Params = {
  params: Promise<{ path: "payid" | "external", coin: string; network: string }>
}

async function ReceiveCoinNetwork({ params }: Params) {
  const { path, coin, network } = (await params);

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw redirect("/login")
  }

  return <ReceiveClient method={path} coin={coin} network={network} user={session.user} />
}

export default ReceiveCoinNetwork