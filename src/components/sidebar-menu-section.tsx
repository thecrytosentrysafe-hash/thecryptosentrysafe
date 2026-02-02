"use client";

import { CRYPTO_ITEMS, MENU_ITEMS, MenuItems } from '@/constants';
import { useModal } from '@/hooks/use-modal';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

function SidebarMenuSection() {
  const pathname = usePathname();
  const { openSendModal, openReceiveModal } = useModal();

  const router = useRouter();

  const handleClick = (item: (typeof MENU_ITEMS)[number] | (typeof CRYPTO_ITEMS)[number]) => {
    switch (item.label) {
      case MenuItems.Send:
        openSendModal();
        break;
      case MenuItems.Receive:
        openReceiveModal();
        break;
      default:
        router.push(item.href);
        break;
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-yellow-500 text-sm font-semibold mb-4">Menu</h2>
      <nav className="space-y-2">
        {MENU_ITEMS.map((item: (typeof MENU_ITEMS)[number]) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.clickable === true) {
            return (
              <button
                key={item.label}
                onClick={() => handleClick(item)}
                className={cn(
                  "flex items-center w-full text-sm font-medium text-left text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-4 rounded-lg",
                  isActive && "bg-[#EFF6FF] hover:bg-[#EFF6FF] hover:text-blue-500 text-blue-500"
                )}
              >
                <Icon className="w-5 h-5 mr-3" color={isActive ? "blue" : "gray"} />
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-4 rounded-lg",
                isActive && "bg-[#EFF6FF] hover:bg-[#EFF6FF] hover:text-blue-500 text-blue-500"
              )}
            >
              <Icon className="w-5 h-5 mr-3" color={isActive ? "blue" : "gray"} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  )
}

export default SidebarMenuSection