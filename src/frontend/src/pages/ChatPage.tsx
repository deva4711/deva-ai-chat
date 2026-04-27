import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import { useConversationDetail, useConversations } from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat";
import { type Message, formatTimestamp } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useSearch } from "@tanstack/react-router";
import { Bot, Check, Copy, Edit2, Loader2, Send, User, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// Resolve message role — MessageRole is "user" | "assistant"
function isUserRole(role: Message["role"]): boolean {
  return role === "user";
}

// ─── Copy Button ────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy message"
      className={cn(
        "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
        "flex items-center justify-center size-6 rounded-md",
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        "transition-all duration-150",
      )}
      data-ocid="chat.copy_button"
    >
      {copied ? (
        <Check className="size-3 text-accent" />
      ) : (
        <Copy className="size-3" />
      )}
    </button>
  );
}

// ─── Message Bubble ──────────────────────────────────────────────────────────

interface MessageBubbleProps {
  msg: Message;
  index: number;
}

function MessageBubble({ msg, index }: MessageBubbleProps) {
  const isUser = isUserRole(msg.role);

  return (
    <div
      className={cn(
        "flex gap-2.5 group",
        isUser ? "justify-end" : "justify-start",
      )}
      data-ocid={`chat.message.item.${index + 1}`}
    >
      {!isUser && (
        <div className="flex items-center justify-center size-8 rounded-full bg-accent/15 border border-accent/25 flex-shrink-0 mt-1 shadow-sm">
          <Bot className="size-4 text-accent" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[78%] flex flex-col",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "relative rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
            isUser ? "message-user rounded-br-sm" : "message-ai rounded-bl-sm",
          )}
        >
          <p className="whitespace-pre-wrap break-words">{msg.content}</p>
        </div>

        {/* Timestamp + copy row */}
        <div
          className={cn(
            "flex items-center gap-1.5 mt-1",
            isUser ? "flex-row-reverse" : "flex-row",
          )}
        >
          <span
            className={cn(
              "text-[11px]",
              isUser
                ? "text-primary-foreground/50"
                : "text-muted-foreground/60",
            )}
          >
            {formatTimestamp(msg.timestamp)}
          </span>
          <CopyButton text={msg.content} />
        </div>
      </div>

      {isUser && (
        <div className="flex items-center justify-center size-8 rounded-full bg-muted border border-border flex-shrink-0 mt-1 shadow-sm">
          <User className="size-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

// ─── Typing Indicator ────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-2.5 justify-start" data-ocid="chat.loading_state">
      <div className="flex items-center justify-center size-8 rounded-full bg-accent/15 border border-accent/25 flex-shrink-0 mt-1 shadow-sm">
        <Bot className="size-4 text-accent" />
      </div>
      <div className="message-ai rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-5">
          <span className="size-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:0ms]" />
          <span className="size-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:150ms]" />
          <span className="size-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

// ─── Rename Inline Input ─────────────────────────────────────────────────────

interface RenameTitleProps {
  title: string;
  conversationId: bigint;
  onRenamed: (newTitle: string) => void;
}

function RenameTitle({ title, conversationId, onRenamed }: RenameTitleProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(title);
  const [saving, setSaving] = useState(false);
  const { actor, isReady } = useBackend();
  const inputRef = useRef<HTMLInputElement>(null);

  // sync if title prop changes externally
  useEffect(() => {
    if (!editing) setDraft(title);
  }, [title, editing]);

  const startEdit = () => {
    setDraft(title);
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const cancel = () => {
    setEditing(false);
    setDraft(title);
  };

  const save = useCallback(async () => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === title || !actor || !isReady) {
      setEditing(false);
      setDraft(title);
      return;
    }
    setSaving(true);
    try {
      await actor.renameConversation(conversationId, trimmed);
      onRenamed(trimmed);
    } catch (err) {
      console.error("Failed to rename:", err);
    } finally {
      setSaving(false);
      setEditing(false);
    }
  }, [draft, title, actor, isReady, conversationId, onRenamed]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") cancel();
  };

  if (editing) {
    return (
      <div
        className="flex items-center gap-1.5 min-w-0 flex-1"
        data-ocid="chat.rename_dialog"
      >
        <Input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={save}
          disabled={saving}
          className="h-7 text-sm px-2 py-1 bg-background border-input focus-visible:ring-accent/40 min-w-0 w-48 max-w-xs"
          data-ocid="chat.rename_input"
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={save}
          disabled={saving}
          className="size-6 text-accent hover:bg-accent/10"
          aria-label="Save title"
          data-ocid="chat.rename_confirm_button"
        >
          {saving ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            <Check className="size-3" />
          )}
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={cancel}
          disabled={saving}
          className="size-6 hover:bg-muted"
          aria-label="Cancel rename"
          data-ocid="chat.rename_cancel_button"
        >
          <X className="size-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 min-w-0 group/rename">
      <span
        className="text-sm text-muted-foreground truncate min-w-0"
        data-ocid="chat.conversation_title"
      >
        {title}
      </span>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={startEdit}
        className="size-6 opacity-0 group-hover/rename:opacity-100 focus-visible:opacity-100 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
        aria-label="Rename conversation"
        data-ocid="chat.rename_button"
      >
        <Edit2 className="size-3" />
      </Button>
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-5 text-center px-4"
      data-ocid="chat.empty_state"
    >
      <div className="relative">
        <div className="flex items-center justify-center size-16 rounded-2xl bg-accent/10 border border-accent/20 shadow-sm">
          <Bot className="size-8 text-accent" />
        </div>
        <span className="absolute -top-1 -right-1 size-4 rounded-full bg-accent flex items-center justify-center">
          <span className="text-[9px] font-bold text-accent-foreground">
            AI
          </span>
        </span>
      </div>
      <div className="max-w-sm">
        <p className="text-base font-display font-semibold text-foreground mb-2">
          Ready to help you land that Google internship! 🚀
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ask me about technical interviews, resume tips, behavioural questions,
          or how to stand out as a candidate.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-1">
        {[
          "LeetCode tips",
          "Resume review",
          "Mock interview",
          "System design",
        ].map((prompt) => (
          <span
            key={prompt}
            className="text-xs px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground"
          >
            {prompt}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Chat Page ───────────────────────────────────────────────────────────

export function ChatPage() {
  const { conversationId } = useParams({ from: "/chat/$conversationId" });
  const { initialMessage } = useSearch({ from: "/chat/$conversationId" });
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const autoSentRef = useRef(false);

  const {
    activeConversation,
    isSendingMessage,
    setActiveConversation,
    appendMessage,
    setSendingMessage,
    setActiveConversationId,
    updateConversationTitle,
  } = useChatStore();

  const convId = BigInt(conversationId);

  // Load conversation detail
  const { data: convDetail, isLoading } = useConversationDetail(convId);

  // Keep sidebar conversation list warm (so it can be invalidated after send)
  useConversations();

  useEffect(() => {
    if (convDetail) {
      setActiveConversation(convDetail);
      setActiveConversationId(convId);
    }
  }, [convDetail, setActiveConversation, setActiveConversationId, convId]);

  // Auto-send initialMessage from search params (set by HomePage coaching prompts)
  useEffect(() => {
    if (!initialMessage || !actor || !isReady || autoSentRef.current) return;
    autoSentRef.current = true;
    const decoded = decodeURIComponent(initialMessage);
    setInputValue(decoded);
    // Small delay to let conversation load before sending
    const timer = setTimeout(() => {
      handleSend(decoded);
      setInputValue("");
    }, 400);
    return () => clearTimeout(timer);
  }, [actor, isReady, initialMessage]);

  const messages = activeConversation?.messages ?? [];
  const title = activeConversation?.title ?? "Chat";

  // Auto-scroll to bottom on new messages
  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger on count change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length, isSendingMessage]);

  const handleRename = useCallback(
    (newTitle: string) => {
      updateConversationTitle(convId, newTitle);
      setActiveConversation(
        activeConversation ? { ...activeConversation, title: newTitle } : null,
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    [
      convId,
      updateConversationTitle,
      setActiveConversation,
      activeConversation,
      queryClient,
    ],
  );

  const handleSend = useCallback(
    async (overrideText?: string) => {
      const text = (overrideText ?? inputValue).trim();
      if (!text || !actor || !isReady || isSendingMessage) return;

      setInputValue("");
      setSendingMessage(true);

      // Optimistic user message
      const nowNs = BigInt(Date.now()) * BigInt(1_000_000);
      const userMsg: Message = {
        id: BigInt(Date.now()),
        role: "user",
        content: text,
        timestamp: nowNs,
      };
      appendMessage(userMsg);

      try {
        const aiResponse: string = await actor.sendMessage(convId, text);

        const aiMsg: Message = {
          id: BigInt(Date.now() + 1),
          role: "assistant",
          content: aiResponse,
          timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        };
        appendMessage(aiMsg);

        // Refresh sidebar conversation list to show updated preview
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
        queryClient.invalidateQueries({
          queryKey: ["conversation", conversationId],
        });
      } catch (err) {
        console.error("Failed to send message:", err);
        appendMessage({
          id: BigInt(Date.now() + 1),
          role: "assistant",
          content:
            "I'm sorry, something went wrong on my end. Please try again — I'm here to help! 💪",
          timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        });
      } finally {
        setSendingMessage(false);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    },
    [
      inputValue,
      actor,
      isReady,
      isSendingMessage,
      convId,
      conversationId,
      appendMessage,
      setSendingMessage,
      queryClient,
    ],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Compute the title segment for the Layout header
  const titleSegment =
    activeConversation != null ? (
      <RenameTitle
        title={title}
        conversationId={convId}
        onRenamed={handleRename}
      />
    ) : undefined;

  return (
    <Layout conversationTitle={title} conversationTitleNode={titleSegment}>
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Messages area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6"
          data-ocid="chat.messages_area"
        >
          {isLoading ? (
            <div className="space-y-5 max-w-3xl mx-auto">
              {(["sk-0", "sk-1", "sk-2"] as const).map((skId, i) => (
                <div
                  key={skId}
                  className={cn("flex gap-3", i % 2 !== 0 && "justify-end")}
                >
                  {i % 2 === 0 && (
                    <Skeleton className="size-8 rounded-full flex-shrink-0" />
                  )}
                  <div className="space-y-1.5 max-w-sm">
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-5 max-w-3xl mx-auto">
              {messages.map((msg, index) => (
                <MessageBubble
                  key={msg.id.toString()}
                  msg={msg}
                  index={index}
                />
              ))}
              {isSendingMessage && <TypingIndicator />}
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-border bg-card px-4 py-3">
          <div className="max-w-3xl mx-auto">
            <div
              className={cn(
                "flex items-end gap-2 rounded-xl border border-input bg-background px-3 py-2",
                "transition-smooth focus-within:border-accent/60 focus-within:ring-1 focus-within:ring-accent/30",
              )}
              data-ocid="chat.input_area"
            >
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about interviews, resume tips, or Google internship advice…"
                rows={1}
                disabled={isSendingMessage}
                className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-h-[36px] max-h-40 py-1.5 scrollbar-thin disabled:opacity-50"
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${Math.min(target.scrollHeight, 160)}px`;
                }}
                data-ocid="chat.message_input"
                aria-label="Message input"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isSendingMessage}
                size="icon"
                className="size-8 flex-shrink-0 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-40 transition-smooth rounded-lg"
                aria-label="Send message"
                data-ocid="chat.send_button"
              >
                {isSendingMessage ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground/50 text-center mt-2">
              Press <kbd className="font-mono">Enter</kbd> to send ·{" "}
              <kbd className="font-mono">Shift+Enter</kbd> for new line
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
