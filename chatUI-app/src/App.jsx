import Title from "./Title/Title.jsx";
import Sider from "./Sider/Sider.jsx";
import ChatList from "./ChatList/ChatList.jsx";
import './css/grid.css';
import GroupList from "./GroupList/GroupList.jsx";
import Chatroom from "./Chatroom/Chatroom.jsx";
import ChatInfo from "./ChatInfo/ChatInfo.jsx";

import { ChatStateProvider } from "./FetchAPI/ChatState.jsx";

function App() {
  return (
    <div className="grid-container">
      <Title />
      <Sider />
      <ChatStateProvider>
        <ChatList />
        <GroupList />
        <Chatroom />
        <ChatInfo />
      </ChatStateProvider>
    </div>
  )
}

export default App
