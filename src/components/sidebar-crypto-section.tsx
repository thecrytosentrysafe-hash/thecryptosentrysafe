"use client";

import { CRYPTO_ITEMS } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SidebarCryptoSection() {
  const pathname = usePathname();

  return (
    <div className="mb-8">
      <h2 className="text-yellow-500 text-sm font-semibold mb-4">Crypto</h2>
      <div className="space-y-2">
        {CRYPTO_ITEMS.map((item: (typeof CRYPTO_ITEMS)[number]) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center w-full text-sm font-medium text-left text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-4 rounded-lg",
                isActive && "bg-[#EFF6FF] hover:bg-[#EFF6FF] hover:text-blue-500 text-blue-500"
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default SidebarCryptoSection