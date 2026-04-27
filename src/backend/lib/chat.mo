import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import CommonTypes "../types/common";
import ChatTypes "../types/chat";

module {
  public type State = {
    conversations : Map.Map<CommonTypes.ConversationId, ChatTypes.Conversation>;
    var nextConversationId : CommonTypes.ConversationId;
    var nextMessageId : CommonTypes.MessageId;
  };

  public func initState() : State {
    {
      conversations = Map.empty<CommonTypes.ConversationId, ChatTypes.Conversation>();
      var nextConversationId = 0;
      var nextMessageId = 0;
    };
  };

  public func createConversation(
    state : State,
    owner : CommonTypes.UserId,
    title : Text,
  ) : ChatTypes.ConversationSummary {
    let id = state.nextConversationId;
    state.nextConversationId += 1;
    let now = Time.now();
    let conv : ChatTypes.Conversation = {
      id;
      owner;
      var title;
      createdAt = now;
      var updatedAt = now;
      var messages = [];
    };
    state.conversations.add(id, conv);
    toSummary(conv);
  };

  public func listConversations(
    state : State,
    owner : CommonTypes.UserId,
  ) : [ChatTypes.ConversationSummary] {
    let result = List.empty<ChatTypes.ConversationSummary>();
    for ((_, conv) in state.conversations.entries()) {
      if (conv.owner == owner) {
        result.add(toSummary(conv));
      };
    };
    // Sort by updatedAt descending (most recent first)
    let arr = result.toArray();
    arr.sort(func(a : ChatTypes.ConversationSummary, b : ChatTypes.ConversationSummary) : Order.Order {
      if (b.updatedAt > a.updatedAt) { #less }
      else if (b.updatedAt < a.updatedAt) { #greater }
      else { #equal };
    });
  };

  public func getConversation(
    state : State,
    owner : CommonTypes.UserId,
    id : CommonTypes.ConversationId,
  ) : ?ChatTypes.ConversationDetail {
    switch (state.conversations.get(id)) {
      case null { null };
      case (?conv) {
        if (conv.owner != owner) { null }
        else { ?toDetail(conv) };
      };
    };
  };

  public func renameConversation(
    state : State,
    owner : CommonTypes.UserId,
    id : CommonTypes.ConversationId,
    newTitle : Text,
  ) : Bool {
    switch (state.conversations.get(id)) {
      case null { false };
      case (?conv) {
        if (conv.owner != owner) { false }
        else {
          conv.title := newTitle;
          conv.updatedAt := Time.now();
          true;
        };
      };
    };
  };

  public func deleteConversation(
    state : State,
    owner : CommonTypes.UserId,
    id : CommonTypes.ConversationId,
  ) : Bool {
    switch (state.conversations.get(id)) {
      case null { false };
      case (?conv) {
        if (conv.owner != owner) { false }
        else {
          state.conversations.remove(id);
          true;
        };
      };
    };
  };

  public func addMessagePair(
    state : State,
    owner : CommonTypes.UserId,
    conversationId : CommonTypes.ConversationId,
    userContent : Text,
    assistantContent : Text,
  ) : Bool {
    switch (state.conversations.get(conversationId)) {
      case null { false };
      case (?conv) {
        if (conv.owner != owner) { false }
        else {
          let now = Time.now();
          let userMsgId = state.nextMessageId;
          state.nextMessageId += 1;
          let assistantMsgId = state.nextMessageId;
          state.nextMessageId += 1;
          let userMsg : ChatTypes.Message = {
            id = userMsgId;
            role = #user;
            content = userContent;
            timestamp = now;
          };
          let assistantMsg : ChatTypes.Message = {
            id = assistantMsgId;
            role = #assistant;
            content = assistantContent;
            timestamp = now;
          };
          conv.messages := conv.messages.concat([userMsg, assistantMsg]);
          conv.updatedAt := now;
          true;
        };
      };
    };
  };

  public func toSummary(conv : ChatTypes.Conversation) : ChatTypes.ConversationSummary {
    let msgs = conv.messages;
    let lastPreview : ?Text = if (msgs.size() == 0) {
      null;
    } else {
      let last = msgs[msgs.size() - 1];
      let preview = if (last.content.size() > 100) {
        let chars = last.content.toArray();
        let truncated = chars.sliceToArray(0, 100);
        Text.fromArray(truncated) # "…";
      } else {
        last.content;
      };
      ?preview;
    };
    {
      id = conv.id;
      title = conv.title;
      createdAt = conv.createdAt;
      updatedAt = conv.updatedAt;
      lastMessagePreview = lastPreview;
    };
  };

  public func toDetail(conv : ChatTypes.Conversation) : ChatTypes.ConversationDetail {
    {
      id = conv.id;
      title = conv.title;
      createdAt = conv.createdAt;
      updatedAt = conv.updatedAt;
      messages = conv.messages;
    };
  };
};
