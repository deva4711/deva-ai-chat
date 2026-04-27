import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ConversationDetail {
    id: ConversationId;
    title: string;
    messages: Array<Message>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type ConversationId = bigint;
export type MessageId = bigint;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Message {
    id: MessageId;
    content: string;
    role: MessageRole;
    timestamp: Timestamp;
}
export interface UserSettings {
    aiEndpoint: string;
}
export interface ConversationSummary {
    id: ConversationId;
    title: string;
    lastMessagePreview?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export interface UserProfile {
    name: string;
}
export enum MessageRole {
    user = "user",
    assistant = "assistant"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createConversation(title: string): Promise<ConversationSummary>;
    deleteConversation(id: ConversationId): Promise<boolean>;
    getCallerSettings(): Promise<UserSettings | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getConversation(id: ConversationId): Promise<ConversationDetail | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listConversations(): Promise<Array<ConversationSummary>>;
    renameConversation(id: ConversationId, newTitle: string): Promise<boolean>;
    saveCallerSettings(settings: UserSettings): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendMessage(conversationId: ConversationId, userMessage: string): Promise<string>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
