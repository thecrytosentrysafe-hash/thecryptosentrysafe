import ReferralClient from '@/components/clients/referral-client';
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation';

async function Referral() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return redirect("/login");
  }

  return <ReferralClient user={session.user} />;
}

export default Referral