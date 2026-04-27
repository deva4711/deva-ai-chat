import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import { useConversations } from "@/hooks/useQueries";
import { useChatStore } from "@/stores/chat";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  GraduationCap,
  MessageSquare,
  Plus,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect } from "react";

const COACHING_PROMPTS = [
  {
    icon: GraduationCap,
    text: "How do I prepare for Google's coding interviews?",
    label: "Interview prep",
  },
  {
    icon: Zap,
    text: "Review my resume for a software engineering internship",
    label: "Resume review",
  },
  {
    icon: BookOpen,
    text: "What skills should I learn for a Google internship?",
    label: "Skills guide",
  },
  {
    icon: MessageSquare,
    text: "Practice a behavioral interview question with me",
    label: "Mock interview",
  },
] as const;

export function HomePage() {
  const navigate = useNavigate();
  const { actor, isReady } = useBackend();
  const { setActiveConversationId, conversations, isLoadingConversations } =
    useChatStore();

  // Load conversations so we can decide whether to redirect
  const { isFetched } = useConversations();

  // If user already has conversations, redirect to the most recent one
  useEffect(() => {
    if (isFetched && conversations.length > 0) {
      const mostRecent = conversations[0]; // already sorted by updatedAt desc
      setActiveConversationId(mostRecent.id);
      navigate({
        to: "/chat/$conversationId",
        params: { conversationId: mostRecent.id.toString() },
        search: { initialMessage: undefined },
        replace: true,
      });
    }
  }, [isFetched, conversations, navigate, setActiveConversationId]);

  const handleStartChat = useCallback(
    async (prompt?: string) => {
      if (!actor || !isReady) return;
      try {
        const title = prompt
          ? prompt.slice(0, 40) + (prompt.length > 40 ? "…" : "")
          : "New Conversation";
        const conv = await actor.createConversation(title);
        const id = (conv as { id: bigint }).id;
        setActiveConversationId(id);
        navigate({
          to: "/chat/$conversationId",
          params: { conversationId: id.toString() },
          search: {
            initialMessage: prompt ? encodeURIComponent(prompt) : undefined,
          },
        });
      } catch (err) {
        console.error("Failed to create conversation:", err);
      }
    },
    [actor, isReady, navigate, setActiveConversationId],
  );

  // While loading conversations show skeleton to avoid flicker
  if (isLoadingConversations || (!isFetched && isReady)) {
    return (
      <Layout>
        <div
          className="flex flex-1 flex-col items-center justify-center px-4 py-16 gap-6"
          data-ocid="home.loading_state"
        >
          <Skeleton className="size-16 rounded-2xl" />
          <Skeleton className="h-9 w-64 rounded-lg" />
          <Skeleton className="h-5 w-80 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows have no stable id
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        {/* Hero */}
        <motion.div
          className="text-center max-w-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center justify-center size-16 rounded-2xl bg-accent/15 border border-accent/25 mx-auto mb-5">
            <GraduationCap className="size-8 text-accent" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground tracking-tight mb-3">
            Your Google Internship Coach
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Get personalized guidance on interviews, resumes, and technical
            skills. Ask me anything to start your journey toward a Google
            internship.
          </p>
        </motion.div>

        {/* Quick start prompt cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mb-8"
          data-ocid="home.prompts_list"
        >
          {COACHING_PROMPTS.map(({ icon: Icon, text, label }, index) => (
            <motion.button
              key={label}
              type="button"
              onClick={() => handleStartChat(text)}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left hover:border-accent/40 hover:bg-accent/5 transition-smooth group"
              data-ocid={`home.prompt.${index + 1}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + index * 0.07 }}
            >
              <span className="flex items-center justify-center size-8 rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0 group-hover:bg-accent/20 transition-smooth">
                <Icon className="size-4 text-accent" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-accent mb-0.5">
                  {label}
                </p>
                <p className="text-sm text-muted-foreground leading-snug">
                  {text}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <Button
            onClick={() => handleStartChat()}
            disabled={!isReady}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-6 h-10 transition-smooth gap-2"
            data-ocid="home.new_chat_button"
          >
            <Plus className="size-4" />
            Start a new conversation
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
}
