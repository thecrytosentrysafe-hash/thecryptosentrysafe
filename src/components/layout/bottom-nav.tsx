"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "@/constants";
import { useModal } from "@/hooks/use-modal";

export function BottomNav() {
  const pathname = usePathname();
  const { openSendModal } = useModal();

  const handleClick = (item: (typeof navItems)[number]) => {
    openSendModal();
  }

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-40">
      <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (item.clickable === true) {
              return (
                <button
                  key={item.label}
                  onClick={() => handleClick(item)}
                  className={cn("relative group flex flex-col items-center py-4 px-2 text-trust-text-secondary", isActive && "bg-blue-50/30")}
                >
                  <div
                    className="relative z-10 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1"
                  >
                    <Icon color={isActive ? "blue" : "gray"} />
                  </div>
                  <span className={cn("text-xs mt-1.5 font-medium relative z-10", isActive && "text-blue-700")}>{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn("relative group flex flex-col items-center py-4 px-2 text-trust-text-secondary", isActive && "bg-blue-50/30")}
              >
                <div
                  className="relative z-10 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1"
                >
                  <Icon color={isActive ? "blue" : "gray"} />
                </div>
                <span className={cn("text-xs mt-1.5 font-medium relative z-10", isActive && "text-blue-700")}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
