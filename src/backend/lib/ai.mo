import List "mo:core/List";
import Text "mo:core/Text";

module {
  public let systemPrompt : Text = "You are a helpful AI assistant specializing in Google internship coaching. Help users prepare for Google internship applications and interviews. Provide guidance on technical skills, behavioral interviews, resume tips, and Google's hiring process. Be encouraging, specific, and actionable in your advice. When discussing technical topics, provide concrete examples. Always maintain a positive, supportive tone while being honest about the challenges ahead.";

  /// Build an OpenAI-compatible JSON request body.
  public func buildRequestBody(userMessage : Text) : Text {
    let escapedSystem = escapeJson(systemPrompt);
    let escapedUser = escapeJson(userMessage);
    "{\"model\":\"gpt-4o-mini\",\"messages\":[{\"role\":\"system\",\"content\":\"" # escapedSystem # "\"},{\"role\":\"user\",\"content\":\"" # escapedUser # "\"}],\"max_tokens\":1024}";
  };

  /// Extract the assistant reply text from an OpenAI-compatible response JSON.
  /// Falls back to returning the raw body if parsing fails.
  public func parseResponseBody(raw : Text) : Text {
    let contentKey = "\"content\":\"";
    switch (findSubstring(raw, contentKey)) {
      case null { raw };
      case (?startIdx) {
        let valueStart = startIdx + contentKey.size();
        let chars = raw.toArray();
        var i = valueStart;
        let buf = List.empty<Char>();
        let dquote : Char = '\"';
        let backslash : Char = '\\';
        label scan while (i < chars.size()) {
          let c = chars[i];
          if (c == backslash and i + 1 < chars.size()) {
            let next = chars[i + 1];
            if (next == dquote) { buf.add(dquote); i += 2 }
            else if (next == 'n') { buf.add('\n'); i += 2 }
            else if (next == 't') { buf.add('\t'); i += 2 }
            else if (next == backslash) { buf.add(backslash); i += 2 }
            else { buf.add(c); i += 1 };
          } else if (c == dquote) {
            i += 1;
            break scan;
          } else {
            buf.add(c);
            i += 1;
          };
        };
        Text.fromArray(buf.toArray());
      };
    };
  };

  // ── Private helpers ────────────────────────────────────────────────────────

  /// Escape a string for embedding in a JSON string literal.
  func escapeJson(s : Text) : Text {
    let dquote : Char = '\"';
    let backslash : Char = '\\';
    let buf = List.empty<Char>();
    for (c in s.toIter()) {
      if (c == dquote) { buf.add(backslash); buf.add(dquote) }
      else if (c == backslash) { buf.add(backslash); buf.add(backslash) }
      else if (c == '\n') { buf.add(backslash); buf.add('n') }
      else if (c == '\r') { buf.add(backslash); buf.add('r') }
      else if (c == '\t') { buf.add(backslash); buf.add('t') }
      else { buf.add(c) };
    };
    Text.fromArray(buf.toArray());
  };

  /// Find the character offset of needle in haystack, or null.
  func findSubstring(haystack : Text, needle : Text) : ?Nat {
    let h = haystack.toArray();
    let n = needle.toArray();
    let hLen = h.size();
    let nLen = n.size();
    if (nLen == 0) { return ?0 };
    if (hLen < nLen) { return null };
    var i = 0;
    label outer while (i <= hLen - nLen) {
      var j = 0;
      var matched = true;
      while (j < nLen) {
        if (h[i + j] != n[j]) { matched := false; j := nLen }
        else { j += 1 };
      };
      if (matched) { return ?i };
      i += 1;
    };
    null;
  };
};
