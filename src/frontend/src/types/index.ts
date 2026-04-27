export type UserId = string; // Principal as string
export type ConversationId = bigint;
export type MessageId = bigint;
export type Timestamp = bigint;

// Mirrors backend MessageRole enum — "user" | "assistant"
export type MessageRole = "user" | "assistant";

export interface Message {
  id: MessageId;
  role: MessageRole;
  content: string;
  timestamp: Timestamp;
}

export interface ConversationSummary {
  id: ConversationId;
  title: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastMessagePreview: string | null;
}

export interface ConversationDetail {
  id: ConversationId;
  title: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  messages: Message[];
}

export interface UserProfile {
  displayName: string;
  bio: string;
}

export interface UserSettings {
  theme: string;
  language: string;
}

// UI helpers
export function isUserMessage(role: MessageRole): boolean {
  return role === "user";
}

export function isAssistantMessage(role: MessageRole): boolean {
  return role === "assistant";
}

export function formatTimestamp(ts: Timestamp): string {
  const ms = Number(ts) / 1_000_000; // nanoseconds → ms
  const date = new Date(ms);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} min ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return date.toLocaleDateString();
}
