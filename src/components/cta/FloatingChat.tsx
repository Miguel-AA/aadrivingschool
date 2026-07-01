import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useTranslations } from "@/i18n";
import { cn } from "@/lib/utils/cn";
import { useChat } from "./chatStore";

type ChatMessage = { id: number; from: "leon" | "user"; text: string };

/**
 * Floating "Leon" AI assistant chat (front-end mock; no backend yet).
 *
 * A persistent message bubble in the bottom-left corner. Tapping it opens a
 * chat panel that greets the visitor; any message they send is acknowledged
 * with a note that the team will receive their question. There is no backend —
 * wire this to a real assistant/CRM before launch.
 */
export function FloatingChat() {
  const t = useTranslations("common");
  const { open, setOpen } = useChat();
  // Keep the panel mounted through its collapse animation, then unmount.
  const [render, setRender] = useState(open);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, from: "leon", text: t("leon.welcome") },
  ]);

  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mount immediately on open; unmount is deferred to the collapse animation's end.
  useEffect(() => {
    if (open) setRender(true);
  }, [open]);

  // Keep the latest message in view whenever the thread or typing state changes.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, from: "user", text },
    ]);
    setInput("");
    setTyping(true);

    // Simulate Leon "thinking", then acknowledge the question.
    window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, from: "leon", text: t("leon.ack") },
      ]);
    }, 800);
  }

  return (
    <>
      {/* Chat panel */}
      {render && (
        <div
          role="dialog"
          aria-label={t("leon.title")}
          onAnimationEnd={(e) => {
            // Only react to the panel's own collapse animation, not bubbled
            // child animations (typing dots, the spinning border comet).
            if (e.target === e.currentTarget && !open) setRender(false);
          }}
          className={cn(
            "chat-comet-border fixed bottom-36 right-4 z-50 flex h-[28rem] w-[calc(100vw-2rem)] max-w-sm origin-bottom-right flex-col overflow-hidden rounded-[1.75rem] border border-white/60 bg-white shadow-2xl shadow-brand-950/30 ring-1 ring-brand-950/10 lg:bottom-24 lg:right-6",
            open ? "animate-chat-in" : "animate-chat-out",
          )}
        >
          {/* Header — premium navy with the brand's ocean glow, gold hairline
              and dotted texture (matches the site's closing CTA card). */}
          <div className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-900 to-brand-950 px-4 py-3.5 text-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -right-6 -top-10 h-28 w-28 rounded-full bg-ocean-500/30 blur-2xl" />
              <div className="absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-accent-500/15 blur-2xl" />
              <div className="absolute inset-0 bg-dot-grid text-white/[0.06]" />
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/70 to-transparent"
            />
            <div className="relative flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl shadow-inner ring-1 ring-accent-400/40"
              >
                🦁
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-tight tracking-tight">
                  {t("leon.title")}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-brand-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px] shadow-green-400/70" />
                  {t("leon.status")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("leon.close")}
                className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-brand-50/60 via-white to-white px-4 py-4"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex",
                  m.from === "user" ? "justify-end" : "justify-start",
                )}
              >
                <p
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm",
                    m.from === "user"
                      ? "rounded-br-sm bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-brand-900/20"
                      : "rounded-bl-sm border border-slate-200/70 bg-white text-slate-700",
                  )}
                >
                  {m.text}
                </p>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start" aria-hidden="true">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-slate-200/70 bg-white px-3.5 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-300 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-300 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-300" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-slate-200 bg-white/90 p-3 backdrop-blur"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("leon.placeholder")}
              aria-label={t("leon.placeholder")}
              className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
            <button
              type="submit"
              aria-label={t("leon.send")}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-300 to-accent-500 text-brand-950 shadow-sm shadow-accent-700/30 transition-all hover:scale-105 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      {/* Persistent bubble button — desktop only. On mobile the trigger lives
          inside the sticky CTA bar (MobileCTABar) so nothing floats over the
          page content. */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? t("leon.close") : t("leon.label")}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-50 hidden h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-ocean-500 text-white shadow-lg shadow-brand-900/25 ring-1 ring-accent-400/30 transition-transform hover:scale-105 lg:grid"
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
