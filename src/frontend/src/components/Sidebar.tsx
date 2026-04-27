import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chat";
import { formatTimestamp } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  GraduationCap,
  LogOut,
  MessageSquare,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { conversationId } = useParams({ strict: false }) as {
    conversationId?: string;
  };
  const { logout } = useAuth();
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();

  const {
    conversations,
    isLoadingConversations,
    activeConversationId,
    removeConversation,
    setActiveConversationId,
  } = useChatStore();

  const activeId = activeConversationId?.toString() ?? conversationId;

  // Delete confirmation state
  const [pendingDeleteId, setPendingDeleteId] = useState<bigint | null>(null);

  const handleNewConversation = useCallback(async () => {
    if (!actor || !isReady) return;
    try {
      const conv = await actor.createConversation("New Conversation");
      await queryClient.invalidateQueries({ queryKey: ["conversations"] });
      const id = (conv as { id: bigint }).id;
      setActiveConversationId(id);
      navigate({
        to: "/chat/$conversationId",
        params: { conversationId: id.toString() },
        search: { initialMessage: undefined },
      });
      onClose?.();
    } catch (err) {
      console.error("Failed to create conversation:", err);
    }
  }, [actor, isReady, navigate, onClose, queryClient, setActiveConversationId]);

  const handleDeleteConversation = useCallback(
    async (id: bigint) => {
      if (!actor || !isReady) return;
      try {
        await actor.deleteConversation(id);
        removeConversation(id);
        if (activeId === id.toString()) {
          navigate({ to: "/" });
        }
      } catch (err) {
        console.error("Failed to delete conversation:", err);
      } finally {
        setPendingDeleteId(null);
      }
    },
    [actor, isReady, activeId, navigate, removeConversation],
  );

  const handleSelectConversation = useCallback(
    (id: bigint) => {
      setActiveConversationId(id);
      navigate({
        to: "/chat/$conversationId",
        params: { conversationId: id.toString() },
        search: { initialMessage: undefined },
      });
      onClose?.();
    },
    [navigate, onClose, setActiveConversationId],
  );

  return (
    <>
      <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
        {/* Sidebar header */}
        <div className="flex h-14 items-center justify-between px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-5 text-accent" />
            <span className="font-display font-semibold text-sm text-sidebar-foreground tracking-tight">
              Internship Coach
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNewConversation}
              aria-label="New conversation"
              className="size-8 text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors-fast"
              data-ocid="sidebar.new_conversation_button"
            >
              <Plus className="size-4" />
            </Button>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close sidebar"
                className="size-8 text-muted-foreground md:hidden"
                data-ocid="sidebar.close_button"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Conversations label */}
        <div className="px-4 py-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
            Conversations
          </p>
        </div>

        {/* Conversation list */}
        <ScrollArea
          className="flex-1 px-2 scrollbar-thin"
          data-ocid="sidebar.conversation_list"
        >
          {isLoadingConversations ? (
            <div className="space-y-1 p-1">
              {Array.from({ length: 4 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no id
                <div key={`skel-${i}`} className="px-2 py-2 rounded-lg">
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : conversations.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-12 px-4 text-center"
              data-ocid="sidebar.empty_state"
            >
              <MessageSquare className="size-8 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground font-medium">
                No conversations yet
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Start chatting to get coaching advice
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewConversation}
                className="mt-4 border-accent/30 text-accent hover:bg-accent/10"
                data-ocid="sidebar.start_conversation_button"
              >
                <Plus className="size-3.5 mr-1.5" />
                New Chat
              </Button>
            </div>
          ) : (
            <div
              className="space-y-0.5 pb-2"
              data-ocid="sidebar.conversation_list"
            >
              {conversations.map((conv, index) => {
                const isActive = activeId === conv.id.toString();
                return (
                  <button
                    type="button"
                    key={conv.id.toString()}
                    onClick={() => handleSelectConversation(conv.id)}
                    className={cn(
                      "group w-full flex items-start gap-2 rounded-lg px-3 py-2.5 text-left transition-colors-fast",
                      isActive
                        ? "sidebar-item-active"
                        : "hover:bg-muted/50 text-sidebar-foreground",
                    )}
                    data-ocid={`sidebar.conversation.item.${index + 1}`}
                  >
                    <MessageSquare
                      className={cn(
                        "size-3.5 mt-0.5 flex-shrink-0",
                        isActive ? "text-accent" : "text-muted-foreground",
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-medium truncate leading-tight",
                          isActive ? "text-accent" : "text-sidebar-foreground",
                        )}
                      >
                        {conv.title}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5 truncate">
                        {conv.lastMessagePreview ??
                          formatTimestamp(conv.updatedAt)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setPendingDeleteId(conv.id);
                      }}
                      aria-label="Delete conversation"
                      className="size-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0 transition-all"
                      data-ocid={`sidebar.delete_button.${index + 1}`}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* Logout button */}
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors-fast"
            data-ocid="sidebar.logout_button"
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => !open && setPendingDeleteId(null)}
      >
        <AlertDialogContent data-ocid="sidebar.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete conversation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this conversation and all its
              messages. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="sidebar.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                pendingDeleteId && handleDeleteConversation(pendingDeleteId)
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="sidebar.delete_confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
