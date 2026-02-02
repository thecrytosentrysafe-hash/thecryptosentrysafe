"use client";

import { ModalProvider, useModal } from "@/hooks/use-modal";
import { SendModal } from "@/components/modals/send-modal";
import { ReceiveModal } from "@/components/modals/receive-modal";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { showSendModal, showReceiveModal, closeSendModal, closeReceiveModal } = useModal();

  return (
    <>
      <div className="flex min-h-dvh bg-white text-gray-700">
        {children}
      </div>
      <SendModal isOpen={showSendModal} onClose={closeSendModal} />
      <ReceiveModal isOpen={showReceiveModal} onClose={closeReceiveModal} />
    </>
  );
}

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <LayoutContent>{children}</LayoutContent>
    </ModalProvider>
  );
}
