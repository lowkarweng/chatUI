import { createContext, useState, useContext } from 'react';

// Create a context for the shared state
export const ChatState = createContext();

// Provider component that wraps the state and its setter
export const ChatStateProvider = ({ children }) => {
    //Get the target user information
    const [cTarget, setCTarget] = useState(1);

    return (
        <ChatState.Provider value={{ cTarget, setCTarget }}>
            {children}
        </ChatState.Provider>
    );
};

// Custom hook to access state
export const useChatContext = () => useContext(ChatState);