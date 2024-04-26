import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface GlobalContextType {
  showLoginView: boolean;
  setShowLoginView: Dispatch<SetStateAction<boolean>>;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  currentUserName: string;
  setCurrentUserName: Dispatch<SetStateAction<string>>;
  currentUser: string;
  setCurrentUser: Dispatch<SetStateAction<string>>;
  currentGroupName: string;
  setCurrentGroupName: Dispatch<SetStateAction<string>>;
  allUsers: Array<any>;
  setAllUser: Dispatch<SetStateAction<Array<any>>>;
  allChatRooms: Array<any>;
  setAllChatRooms: Dispatch<SetStateAction<Array<any>>>;
  messages: object;
  setMessages: Dispatch<SetStateAction<object>>;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

interface GlobalStateProps {
  children: ReactNode;
}

function GlobalState({ children }: GlobalStateProps) {
  const [showLoginView, setShowLoginView] = useState<boolean>(false);
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<string>("");
  const [allUsers, setAllUser] = useState<Array<any>>([]);
  const [allChatRooms, setAllChatRooms] = useState<Array<any>>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentGroupName, setCurrentGroupName] = useState<string>("");
  const [messages, setMessages] = useState<object>({});

  const globalState: GlobalContextType = {
    showLoginView,
    setShowLoginView,
    currentUserName,
    setCurrentUserName,
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUser,
    allChatRooms,
    setAllChatRooms,
    modalVisible,
    setModalVisible,
    currentGroupName,
    setCurrentGroupName,
    messages,
    setMessages,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
