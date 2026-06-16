import { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  preview: string;
  category: 'study' | 'program' | 'brainstorm' | 'write';
  time: string;
  hasFiles: boolean;
  conversation: Message[];
}

interface HistoryContextType {
  conversations: Conversation[];
  addConversation: (conv: Omit<Conversation, 'id' | 'time'>) => void;
  appendMessage: (id: string, message: Message) => void;
  activeConversation: Conversation | null;
  setActiveConversation: (conv: Conversation | null) => void;
}

const HistoryContext = createContext<HistoryContextType | null>(null);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  const addConversation = (conv: Omit<Conversation, 'id' | 'time'>) => {
    const newConv: Conversation = {
      ...conv,
      id: Date.now().toString(),
      time: 'Agora',
    };
    setConversations((prev) => [newConv, ...prev]);
    return newConv.id;
  };

  const appendMessage = (id: string, message: Message) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id
          ? { ...conv, conversation: [...conv.conversation, message] }
          : conv
      )
    );
  };

  return (
    <HistoryContext.Provider value={{ conversations, addConversation, appendMessage, activeConversation, setActiveConversation }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used within HistoryProvider');
  return context;
}