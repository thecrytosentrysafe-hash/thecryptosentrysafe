"use client";

import { useEffect, useState } from "react";
import { Bell, ChevronDown, ChevronUp, LogOut, Wallet } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "@/lib/auth";

export function TopNav({ user }: { user: User }) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [showLogOutButton, setShowLogOutButton] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between px-2 bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center">
        <button
          onClick={() => setShowLogOutButton(!showLogOutButton)}
          className="flex items-center gap-2 px-3 py-4 rounded-lg bg-gray-200">
          <Wallet color="blue" />
          <span className="text-sm font-medium">My Wallet</span>
          {showLogOutButton ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {user.name.split("")[0]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              {user.role === "admin" && (
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer"
                >
                  <Link
                    href="/admin"
                  >
                    Admin
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                asChild
                className="cursor-pointer"
              >
                <Link
                  href="/profile"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div>
          <Link href="/notifications" className="relative p-2 pr-5 rounded-full">
            <Bell />
            <div className="absolute bottom-12 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </div>
          </Link>
        </div>
      </div>

      {showLogOutButton && (
        <div
          className="absolute top-14 md:top-16 md:left-[270px] left-4 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-100"
        >
          <div className="py-1">
            <div className="border-b border-gray-100 my-1"></div>
            <button
              className="text-sm w-full flex items-center gap-2 px-3 py-2"
              onClick={() => {
                setLoggingOut(true)
                setShowLogOutButton(false)
                authClient.signOut(undefined, {
                  onError(context) {
                    toast.error(context.error.message || "Something went wrong")
                    setLoggingOut(false)
                  },
                  onSuccess: () => {
                    setLoggingOut(false);
                    router.push("/login")
                  }
                })
              }}
            >
              <LogOut color="blue" />
              Logout
            </button>
          </div>
        </div>
      )}

      {loggingOut && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-2">
            <Loader />
            <p className="text-white">Logging out...</p>
          </div>
        </div>
      )}
    </nav >
  );
}
