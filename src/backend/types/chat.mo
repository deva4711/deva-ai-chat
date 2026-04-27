import Common "common";

module {
  public type MessageRole = { #user; #assistant };

  public type Message = {
    id : Common.MessageId;
    role : MessageRole;
    content : Text;
    timestamp : Common.Timestamp;
  };

  public type Conversation = {
    id : Common.ConversationId;
    owner : Common.UserId;
    var title : Text;
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
    var messages : [Message];
  };

  // Shared (API boundary) types — no mutable fields
  public type ConversationSummary = {
    id : Common.ConversationId;
    title : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
    lastMessagePreview : ?Text;
  };

  public type ConversationDetail = {
    id : Common.ConversationId;
    title : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
    messages : [Message];
  };
};
