import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { useTranslations } from "@/i18n";
import { cn } from "@/lib/utils/cn";

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
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, from: "leon", text: t("leon.welcome") },
  ]);

  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      {open && (
        <div
          role="dialog"
          aria-label={t("leon.title")}
          className="fixed bottom-36 right-4 z-50 flex h-[28rem] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 lg:bottom-24 lg:right-6"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-br from-brand-600 to-ocean-500 px-4 py-3 text-white">
            <span
              aria-hidden="true"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/20 text-xl"
            >
              🦁
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-tight">{t("leon.title")}</p>
              <p className="flex items-center gap-1.5 text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                {t("leon.status")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("leon.close")}
              className="grid h-8 w-8 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/15"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4"
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
                      ? "rounded-br-sm bg-brand-600 text-white"
                      : "rounded-bl-sm bg-white text-slate-700",
                  )}
                >
                  {m.text}
                </p>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start" aria-hidden="true">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("leon.placeholder")}
              aria-label={t("leon.placeholder")}
              className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-brand-400 focus:bg-white"
            />
            <button
              type="submit"
              aria-label={t("leon.send")}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-ocean-500 text-white transition-transform hover:scale-105 disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      {/* Persistent bubble button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("leon.close") : t("leon.label")}
        aria-expanded={open}
        className="fixed bottom-20 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-ocean-500 text-white shadow-lg shadow-brand-900/25 transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
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
