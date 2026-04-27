import { useChatStore } from "@/stores/chat";
import type { ConversationDetail, ConversationSummary } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useBackend } from "./useBackend";

/**
 * Fetches the list of conversations for the authenticated user.
 * Syncs results into the chat store automatically.
 */
export function useConversations() {
  const { actor, isReady } = useBackend();
  const { setConversations, setLoadingConversations } = useChatStore();

  const query = useQuery<ConversationSummary[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.listConversations();
      return result as ConversationSummary[];
    },
    enabled: isReady,
    staleTime: 30_000,
  });

  useEffect(() => {
    setLoadingConversations(query.isLoading);
  }, [query.isLoading, setLoadingConversations]);

  useEffect(() => {
    if (query.data) {
      // Sort by most recently updated
      const sorted = [...query.data].sort((a, b) =>
        Number(b.updatedAt - a.updatedAt),
      );
      setConversations(sorted);
    }
  }, [query.data, setConversations]);

  return query;
}

/**
 * Fetches a single conversation with all its messages.
 */
export function useConversationDetail(conversationId: bigint) {
  const { actor, isReady } = useBackend();

  return useQuery<ConversationDetail | null>({
    queryKey: ["conversation", conversationId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getConversation(conversationId);
      // Motoko optional returns as [] or [value]
      if (Array.isArray(result)) {
        return (result[0] as ConversationDetail) ?? null;
      }
      return (result as ConversationDetail | null) ?? null;
    },
    enabled: isReady,
    staleTime: 5_000,
  });
}
