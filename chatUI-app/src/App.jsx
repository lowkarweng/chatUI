import Title from "./Title/Title.jsx";
import Sider from "./Sider/Sider.jsx";
import ChatList from "./ChatList/ChatList.jsx";
import './css/grid.css';

function App() {
  return(
    <div className="grid-container">
      <Title/>
      <Sider/>
      <ChatList/>
    </div>
  )
}

export default App
