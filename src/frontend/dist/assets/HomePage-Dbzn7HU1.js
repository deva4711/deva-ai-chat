import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-CatDpExm.js";
import { u as useBackend, a as useChatStore, b as useConversations, L as Layout, S as Skeleton, M as MessageSquare, P as Plus } from "./useQueries-B0U5NgIq.js";
import { c as createLucideIcon, G as GraduationCap, B as Button } from "./graduation-cap-B9jSthXO.js";
import { m as motion } from "./proxy-D39GSBPZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const COACHING_PROMPTS = [
  {
    icon: GraduationCap,
    text: "How do I prepare for Google's coding interviews?",
    label: "Interview prep"
  },
  {
    icon: Zap,
    text: "Review my resume for a software engineering internship",
    label: "Resume review"
  },
  {
    icon: BookOpen,
    text: "What skills should I learn for a Google internship?",
    label: "Skills guide"
  },
  {
    icon: MessageSquare,
    text: "Practice a behavioral interview question with me",
    label: "Mock interview"
  }
];
function HomePage() {
  const navigate = useNavigate();
  const { actor, isReady } = useBackend();
  const { setActiveConversationId, conversations, isLoadingConversations } = useChatStore();
  const { isFetched } = useConversations();
  reactExports.useEffect(() => {
    if (isFetched && conversations.length > 0) {
      const mostRecent = conversations[0];
      setActiveConversationId(mostRecent.id);
      navigate({
        to: "/chat/$conversationId",
        params: { conversationId: mostRecent.id.toString() },
        search: { initialMessage: void 0 },
        replace: true
      });
    }
  }, [isFetched, conversations, navigate, setActiveConversationId]);
  const handleStartChat = reactExports.useCallback(
    async (prompt) => {
      if (!actor || !isReady) return;
      try {
        const title = prompt ? prompt.slice(0, 40) + (prompt.length > 40 ? "…" : "") : "New Conversation";
        const conv = await actor.createConversation(title);
        const id = conv.id;
        setActiveConversationId(id);
        navigate({
          to: "/chat/$conversationId",
          params: { conversationId: id.toString() },
          search: {
            initialMessage: prompt ? encodeURIComponent(prompt) : void 0
          }
        });
      } catch (err) {
        console.error("Failed to create conversation:", err);
      }
    },
    [actor, isReady, navigate, setActiveConversationId]
  );
  if (isLoadingConversations || !isFetched && isReady) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-1 flex-col items-center justify-center px-4 py-16 gap-6",
        "data-ocid": "home.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-16 rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-64 rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-80 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mt-4", children: Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows have no stable id
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)
          )) })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center justify-center px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center max-w-lg mb-10",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center size-16 rounded-2xl bg-accent/15 border border-accent/25 mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-8 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground tracking-tight mb-3", children: "Your Google Internship Coach" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed", children: "Get personalized guidance on interviews, resumes, and technical skills. Ask me anything to start your journey toward a Google internship." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mb-8",
        "data-ocid": "home.prompts_list",
        children: COACHING_PROMPTS.map(({ icon: Icon, text, label }, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            onClick: () => handleStartChat(text),
            className: "flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left hover:border-accent/40 hover:bg-accent/5 transition-smooth group",
            "data-ocid": `home.prompt.${index + 1}`,
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35, delay: 0.1 + index * 0.07 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center size-8 rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0 group-hover:bg-accent/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-accent mb-0.5", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-snug", children: text })
              ] })
            ]
          },
          label
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.4, delay: 0.45 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => handleStartChat(),
            disabled: !isReady,
            className: "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-6 h-10 transition-smooth gap-2",
            "data-ocid": "home.new_chat_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
              "Start a new conversation"
            ]
          }
        )
      }
    )
  ] }) });
}
export {
  HomePage
};
