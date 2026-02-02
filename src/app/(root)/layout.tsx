import { BottomNav } from '@/components/layout/bottom-nav'
import { LayoutClient } from '@/components/layout/layout-client'
import { Sidebar } from '@/components/layout/sidebar'
import { TopNav } from '@/components/layout/top-nav'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw redirect("/login")
  }

  return (
    <>
      <LayoutClient>
        <Sidebar />
        <div className="content-area flex-1 md:ml-64 mr-0 pb-20">
          <TopNav user={session.user} />
          {children}
        </div>
        <BottomNav />
      </LayoutClient>
    </>
  )
}

export default RootLayout