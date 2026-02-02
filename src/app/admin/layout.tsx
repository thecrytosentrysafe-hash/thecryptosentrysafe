import AdminHeader from "@/components/admin/Header";
import AdminSidebar from "@/components/admin/Sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react"

async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return redirect("/login");

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader userName={session.user.name} />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="p-1 md:pr-4 md:pl-60 pt-20 flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout