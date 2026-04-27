import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import ChatLib "lib/chat";
import ChatApiMixin "mixins/chat-api";
import UserApiMixin "mixins/user-api";
import CommonTypes "types/common";
import UserTypes "types/user";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let chatState = ChatLib.initState();
  include ChatApiMixin(accessControlState, chatState);

  let userProfiles = Map.empty<CommonTypes.UserId, UserTypes.UserProfile>();
  let userSettings = Map.empty<CommonTypes.UserId, UserTypes.UserSettings>();
  include UserApiMixin(accessControlState, userProfiles, userSettings);
};
