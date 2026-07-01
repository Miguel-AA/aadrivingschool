import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface ChatState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const ChatContext = createContext<ChatState | null>(null);

/**
 * Shares the Leon chat's open/close state so the panel (rendered once by
 * FloatingChat) can be toggled from more than one trigger — the desktop
 * floating bubble and the mobile sticky CTA bar.
 */
export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo<ChatState>(
    () => ({ open, setOpen, toggle: () => setOpen((v) => !v) }),
    [open],
  );
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat(): ChatState {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
}
