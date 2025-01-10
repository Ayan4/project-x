import React, { createContext, useState } from "react";

interface ConversationData {
  [key: string]: any;
}

interface ConversationDataContextType {
  conversationData: ConversationData;
  setConversationData: React.Dispatch<React.SetStateAction<ConversationData>>;
}

const defaultContextValue: ConversationDataContextType = {
  conversationData: {},
  setConversationData: () => {},
};

export const ConversationDataContext =
  createContext<ConversationDataContextType>(defaultContextValue);

const ConversationDataProvider = ({ children }: any) => {
  const [conversationData, setConversationData] = useState<any>({});
  return (
    <ConversationDataContext.Provider
      value={{ conversationData, setConversationData }}
    >
      {children}
    </ConversationDataContext.Provider>
  );
};

export default ConversationDataProvider;
