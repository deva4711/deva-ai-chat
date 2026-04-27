import type { ConversationDetail, ConversationSummary, Message } from "@/types";
import { create } from "zustand";

interface ChatState {
  conversations: ConversationSummary[];
  activeConversationId: bigint | null;
  activeConversation: ConversationDetail | null;
  isLoadingConversations: boolean;
  isLoadingMessages: boolean;
  isSendingMessage: boolean;
  setConversations: (conversations: ConversationSummary[]) => void;
  setActiveConversationId: (id: bigint | null) => void;
  setActiveConversation: (conversation: ConversationDetail | null) => void;
  appendMessage: (message: Message) => void;
  setLoadingConversations: (loading: boolean) => void;
  setLoadingMessages: (loading: boolean) => void;
  setSendingMessage: (sending: boolean) => void;
  updateConversationTitle: (id: bigint, title: string) => void;
  removeConversation: (id: bigint) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  activeConversationId: null,
  activeConversation: null,
  isLoadingConversations: false,
  isLoadingMessages: false,
  isSendingMessage: false,

  setConversations: (conversations) => set({ conversations }),
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  setActiveConversation: (conversation) =>
    set({ activeConversation: conversation }),

  appendMessage: (message) =>
    set((state) => {
      if (!state.activeConversation) return state;
      return {
        activeConversation: {
          ...state.activeConversation,
          messages: [...state.activeConversation.messages, message],
        },
      };
    }),

  setLoadingConversations: (loading) =>
    set({ isLoadingConversations: loading }),
  setLoadingMessages: (loading) => set({ isLoadingMessages: loading }),
  setSendingMessage: (sending) => set({ isSendingMessage: sending }),

  updateConversationTitle: (id, title) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, title } : c,
      ),
    })),

  removeConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== id),
      activeConversationId:
        state.activeConversationId === id ? null : state.activeConversationId,
      activeConversation:
        state.activeConversation?.id === id ? null : state.activeConversation,
    })),
}));
