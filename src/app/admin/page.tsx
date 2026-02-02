export const dynamic = "force-dynamic";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { AlertCircle, AlertOctagon, CheckCircle2 } from "lucide-react"
import { auth, User } from "@/lib/auth";
import { headers } from "next/headers";
import ActionsCell from "@/components/admin/ActionsCell";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";
import UserRoleCell from "@/components/admin/UserRoleCell";

async function AdminPanel() {
  try {
    const [session, listOfUsers] = await Promise.all([
      auth.api.getSession({
        headers: await headers()
      }),
      auth.api.listUsers({
        query: {},
        headers: await headers()
      })
    ])

    if (!session) redirect("/login")

    const users = listOfUsers.users as User[];

    return (
      <div className="max-w-5xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead>Kyc</TableHead>
              <TableHead>Connected Wallet</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex flex-col gap-2">
                  <span>
                    {user.name}
                  </span>
                  <span>
                    {user.email}
                  </span>
                  <span className="flex gap-2">
                    {user.banned && (
                      <Badge variant="destructive">
                        Banned
                      </Badge>
                    )}

                    <Badge
                      variant={user.emailVerified ? "default" : "outline"}
                      className={
                        user.emailVerified
                          ? "bg-green-500 hover:bg-green-600 text-white border-green-600"
                          : "border-amber-500 text-amber-700 bg-amber-50"
                      }
                    >
                      {user.emailVerified ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Email Verified
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Email Not Verified
                        </>
                      )}
                    </Badge>
                  </span>
                </TableCell>
                <TableCell>
                  <UserRoleCell userId={user.id} userRole={user.role as "user" | "admin"} />
                </TableCell>
                <TableCell>
                  <span className="text-gray-400 flex gap-1 justify-start items-center">
                    <CheckCircle2 color="green" className="w-3 h-3" />
                    Connected
                  </span>
                </TableCell>
                <TableCell>
                  {user.kyc.status !== "not_submitted" ? (
                    <Link
                      href={`/admin/kyc/${user.id}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  ) : "N/A"}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="hover:text-blue-600 hover:underline"
                  >
                    View Wallet
                  </Link>
                </TableCell>
                <TableCell>
                  {user.id !== session.user.id
                    ? (
                      <ActionsCell userId={user.id} userBanned={user.banned} />
                    ) : (
                      <Badge>
                        You
                      </Badge>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } catch {
    return (
      <div className="max-w-5xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Connected Wallet</TableHead>
              <TableHead>View Connected Wallet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className="text-center text-red-700 py-6">
                <div className="flex justify-center items-center gap-1">
                  <AlertOctagon color="red" size={15} /> An error occurred while loading data. Please refresh the page.
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default AdminPanel;