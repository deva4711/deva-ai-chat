import { j as jsxRuntimeExports, a as useParams, b as useSearch, r as reactExports, c as useQueryClient } from "./index-CatDpExm.js";
import { u as useBackend, a as useChatStore, c as useConversationDetail, b as useConversations, L as Layout, S as Skeleton, f as formatTimestamp, X } from "./useQueries-B0U5NgIq.js";
import { c as createLucideIcon, a as cn, B as Button } from "./graduation-cap-B9jSthXO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
];
const Bot = createLucideIcon("bot", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function isUserRole(role) {
  return role === "user";
}
function CopyButton({ text }) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = reactExports.useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    });
  }, [text]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      "aria-label": "Copy message",
      className: cn(
        "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
        "flex items-center justify-center size-6 rounded-md",
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        "transition-all duration-150"
      ),
      "data-ocid": "chat.copy_button",
      children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3" })
    }
  );
}
function MessageBubble({ msg, index }) {
  const isUser = isUserRole(msg.role);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex gap-2.5 group",
        isUser ? "justify-end" : "justify-start"
      ),
      "data-ocid": `chat.message.item.${index + 1}`,
      children: [
        !isUser && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center size-8 rounded-full bg-accent/15 border border-accent/25 flex-shrink-0 mt-1 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-4 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "max-w-[78%] flex flex-col",
              isUser ? "items-end" : "items-start"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "relative rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                    isUser ? "message-user rounded-br-sm" : "message-ai rounded-bl-sm"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap break-words", children: msg.content })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "flex items-center gap-1.5 mt-1",
                    isUser ? "flex-row-reverse" : "flex-row"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn(
                          "text-[11px]",
                          isUser ? "text-primary-foreground/50" : "text-muted-foreground/60"
                        ),
                        children: formatTimestamp(msg.timestamp)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { text: msg.content })
                  ]
                }
              )
            ]
          }
        ),
        isUser && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center size-8 rounded-full bg-muted border border-border flex-shrink-0 mt-1 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-4 text-muted-foreground" }) })
      ]
    }
  );
}
function TypingIndicator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5 justify-start", "data-ocid": "chat.loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center size-8 rounded-full bg-accent/15 border border-accent/25 flex-shrink-0 mt-1 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-4 text-accent" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "message-ai rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 items-center h-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:0ms]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:150ms]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:300ms]" })
    ] }) })
  ] });
}
function RenameTitle({ title, conversationId, onRenamed }) {
  const [editing, setEditing] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState(title);
  const [saving, setSaving] = reactExports.useState(false);
  const { actor, isReady } = useBackend();
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!editing) setDraft(title);
  }, [title, editing]);
  const startEdit = () => {
    setDraft(title);
    setEditing(true);
    setTimeout(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.select();
    }, 0);
  };
  const cancel = () => {
    setEditing(false);
    setDraft(title);
  };
  const save = reactExports.useCallback(async () => {
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
  const handleKeyDown = (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") cancel();
  };
  if (editing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-1.5 min-w-0 flex-1",
        "data-ocid": "chat.rename_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              ref: inputRef,
              value: draft,
              onChange: (e) => setDraft(e.target.value),
              onKeyDown: handleKeyDown,
              onBlur: save,
              disabled: saving,
              className: "h-7 text-sm px-2 py-1 bg-background border-input focus-visible:ring-accent/40 min-w-0 w-48 max-w-xs",
              "data-ocid": "chat.rename_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "icon",
              variant: "ghost",
              onClick: save,
              disabled: saving,
              className: "size-6 text-accent hover:bg-accent/10",
              "aria-label": "Save title",
              "data-ocid": "chat.rename_confirm_button",
              children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "icon",
              variant: "ghost",
              onClick: cancel,
              disabled: saving,
              className: "size-6 hover:bg-muted",
              "aria-label": "Cancel rename",
              "data-ocid": "chat.rename_cancel_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3" })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 min-w-0 group/rename", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-sm text-muted-foreground truncate min-w-0",
        "data-ocid": "chat.conversation_title",
        children: title
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        size: "icon",
        variant: "ghost",
        onClick: startEdit,
        className: "size-6 opacity-0 group-hover/rename:opacity-100 focus-visible:opacity-100 hover:bg-muted text-muted-foreground hover:text-foreground transition-all",
        "aria-label": "Rename conversation",
        "data-ocid": "chat.rename_button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "size-3" })
      }
    )
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center h-full gap-5 text-center px-4",
      "data-ocid": "chat.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center size-16 rounded-2xl bg-accent/10 border border-accent/20 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "size-8 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 size-4 rounded-full bg-accent flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-accent-foreground", children: "AI" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-display font-semibold text-foreground mb-2", children: "Ready to help you land that Google internship! 🚀" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Ask me about technical interviews, resume tips, behavioural questions, or how to stand out as a candidate." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2 mt-1", children: [
          "LeetCode tips",
          "Resume review",
          "Mock interview",
          "System design"
        ].map((prompt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground",
            children: prompt
          },
          prompt
        )) })
      ]
    }
  );
}
function ChatPage() {
  const { conversationId } = useParams({ from: "/chat/$conversationId" });
  const { initialMessage } = useSearch({ from: "/chat/$conversationId" });
  const [inputValue, setInputValue] = reactExports.useState("");
  const scrollRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const autoSentRef = reactExports.useRef(false);
  const {
    activeConversation,
    isSendingMessage,
    setActiveConversation,
    appendMessage,
    setSendingMessage,
    setActiveConversationId,
    updateConversationTitle
  } = useChatStore();
  const convId = BigInt(conversationId);
  const { data: convDetail, isLoading } = useConversationDetail(convId);
  useConversations();
  reactExports.useEffect(() => {
    if (convDetail) {
      setActiveConversation(convDetail);
      setActiveConversationId(convId);
    }
  }, [convDetail, setActiveConversation, setActiveConversationId, convId]);
  reactExports.useEffect(() => {
    if (!initialMessage || !actor || !isReady || autoSentRef.current) return;
    autoSentRef.current = true;
    const decoded = decodeURIComponent(initialMessage);
    setInputValue(decoded);
    const timer = setTimeout(() => {
      handleSend(decoded);
      setInputValue("");
    }, 400);
    return () => clearTimeout(timer);
  }, [actor, isReady, initialMessage]);
  const messages = (activeConversation == null ? void 0 : activeConversation.messages) ?? [];
  const title = (activeConversation == null ? void 0 : activeConversation.title) ?? "Chat";
  reactExports.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages.length, isSendingMessage]);
  const handleRename = reactExports.useCallback(
    (newTitle) => {
      updateConversationTitle(convId, newTitle);
      setActiveConversation(
        activeConversation ? { ...activeConversation, title: newTitle } : null
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    [
      convId,
      updateConversationTitle,
      setActiveConversation,
      activeConversation,
      queryClient
    ]
  );
  const handleSend = reactExports.useCallback(
    async (overrideText) => {
      const text = (overrideText ?? inputValue).trim();
      if (!text || !actor || !isReady || isSendingMessage) return;
      setInputValue("");
      setSendingMessage(true);
      const nowNs = BigInt(Date.now()) * BigInt(1e6);
      const userMsg = {
        id: BigInt(Date.now()),
        role: "user",
        content: text,
        timestamp: nowNs
      };
      appendMessage(userMsg);
      try {
        const aiResponse = await actor.sendMessage(convId, text);
        const aiMsg = {
          id: BigInt(Date.now() + 1),
          role: "assistant",
          content: aiResponse,
          timestamp: BigInt(Date.now()) * BigInt(1e6)
        };
        appendMessage(aiMsg);
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
        queryClient.invalidateQueries({
          queryKey: ["conversation", conversationId]
        });
      } catch (err) {
        console.error("Failed to send message:", err);
        appendMessage({
          id: BigInt(Date.now() + 1),
          role: "assistant",
          content: "I'm sorry, something went wrong on my end. Please try again — I'm here to help! 💪",
          timestamp: BigInt(Date.now()) * BigInt(1e6)
        });
      } finally {
        setSendingMessage(false);
        setTimeout(() => {
          var _a;
          return (_a = inputRef.current) == null ? void 0 : _a.focus();
        }, 50);
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
      queryClient
    ]
  );
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const titleSegment = activeConversation != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    RenameTitle,
    {
      title,
      conversationId: convId,
      onRenamed: handleRename
    }
  ) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { conversationTitle: title, conversationTitleNode: titleSegment, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: scrollRef,
        className: "flex-1 overflow-y-auto scrollbar-thin px-4 py-6",
        "data-ocid": "chat.messages_area",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 max-w-3xl mx-auto", children: ["sk-0", "sk-1", "sk-2"].map((skId, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn("flex gap-3", i % 2 !== 0 && "justify-end"),
            children: [
              i % 2 === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-8 rounded-full flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 max-w-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-56" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" })
              ] })
            ]
          },
          skId
        )) }) : messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-3xl mx-auto", children: [
          messages.map((msg, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MessageBubble,
            {
              msg,
              index
            },
            msg.id.toString()
          )),
          isSendingMessage && /* @__PURE__ */ jsxRuntimeExports.jsx(TypingIndicator, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-card px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "flex items-end gap-2 rounded-xl border border-input bg-background px-3 py-2",
            "transition-smooth focus-within:border-accent/60 focus-within:ring-1 focus-within:ring-accent/30"
          ),
          "data-ocid": "chat.input_area",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                ref: inputRef,
                value: inputValue,
                onChange: (e) => setInputValue(e.target.value),
                onKeyDown: handleKeyDown,
                placeholder: "Ask about interviews, resume tips, or Google internship advice…",
                rows: 1,
                disabled: isSendingMessage,
                className: "flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-h-[36px] max-h-40 py-1.5 scrollbar-thin disabled:opacity-50",
                onInput: (e) => {
                  const target = e.target;
                  target.style.height = "auto";
                  target.style.height = `${Math.min(target.scrollHeight, 160)}px`;
                },
                "data-ocid": "chat.message_input",
                "aria-label": "Message input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => handleSend(),
                disabled: !inputValue.trim() || isSendingMessage,
                size: "icon",
                className: "size-8 flex-shrink-0 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-40 transition-smooth rounded-lg",
                "aria-label": "Send message",
                "data-ocid": "chat.send_button",
                children: isSendingMessage ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground/50 text-center mt-2", children: [
        "Press ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "font-mono", children: "Enter" }),
        " to send ·",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "font-mono", children: "Shift+Enter" }),
        " for new line"
      ] })
    ] }) })
  ] }) });
}
export {
  ChatPage
};
