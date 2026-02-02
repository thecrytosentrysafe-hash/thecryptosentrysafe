import Link from "next/link";
import SidebarMenuSection from "../sidebar-menu-section";
import SidebarCryptoSection from "../sidebar-crypto-section";
import { User2, Wallet } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="bg-linear-to-r from-blue-500 to-blue-700 py-6 px-6">
        <Link href="/dashboard" className="text-lg font-bold text-white flex items-center gap-2">
          <Wallet />
          <span>TheCryptosentrySafe</span>
        </Link>
        <div className="mt-2 text-blue-100 text-xs opacity-80">Secure & Simple Crypto Wallet</div>
      </div>

      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-xl transition-all duration-200">
          <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center text-blue-600">
            <User2 color="blue" />
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              My Wallet
            </div>
            <div className="text-xs flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>Connected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        {/* Menu Section */}
        <SidebarMenuSection />

        {/* Crypto Section */}
        <SidebarCryptoSection />
      </div>

      <div className="mt-auto p-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-trust-text-secondary p-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
