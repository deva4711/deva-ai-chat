import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import ChatLib "../lib/chat";
import AiLib "../lib/ai";
import CommonTypes "../types/common";
import ChatTypes "../types/chat";

mixin (
  accessControlState : AccessControl.AccessControlState,
  chatState : ChatLib.State,
) {
  // ── Conversations ──────────────────────────────────────────────────────────

  public shared ({ caller }) func createConversation(title : Text) : async ChatTypes.ConversationSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ChatLib.createConversation(chatState, caller, title);
  };

  public query ({ caller }) func listConversations() : async [ChatTypes.ConversationSummary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ChatLib.listConversations(chatState, caller);
  };

  public query ({ caller }) func getConversation(id : CommonTypes.ConversationId) : async ?ChatTypes.ConversationDetail {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ChatLib.getConversation(chatState, caller, id);
  };

  public shared ({ caller }) func renameConversation(id : CommonTypes.ConversationId, newTitle : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ChatLib.renameConversation(chatState, caller, id, newTitle);
  };

  public shared ({ caller }) func deleteConversation(id : CommonTypes.ConversationId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ChatLib.deleteConversation(chatState, caller, id);
  };

  // ── Messaging & AI ─────────────────────────────────────────────────────────

  /// Send a user message, call the AI, store both messages, return AI reply.
  public shared ({ caller }) func sendMessage(
    conversationId : CommonTypes.ConversationId,
    userMessage : Text,
  ) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    // Verify conversation exists and belongs to caller
    switch (ChatLib.getConversation(chatState, caller, conversationId)) {
      case null { Runtime.trap("Conversation not found") };
      case (?_) {};
    };
    let requestBody = AiLib.buildRequestBody(userMessage);
    let rawResponse = await OutCall.httpPostRequest(
      "https://api.openai.com/v1/chat/completions",
      [{ name = "Content-Type"; value = "application/json" }],
      requestBody,
      transform,
    );
    let aiReply = AiLib.parseResponseBody(rawResponse);
    ignore ChatLib.addMessagePair(chatState, caller, conversationId, userMessage, aiReply);
    aiReply;
  };

  // Required transform callback for HTTP outcalls
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
