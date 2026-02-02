import CreatePasscodeClient from '@/components/clients/create-passcode-client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation';

async function CreatePasscode() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    throw redirect("/login");
  }

  if (session.user.passcode) {
    throw redirect("/passcode");
  }

  return <CreatePasscodeClient />
}

export default CreatePasscode