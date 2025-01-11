import ChatUserComp from './ChatUserComp.jsx';
import './chatList.css';

export default function ChatList() {
  return (
    <div className="chatListGrid chatList" style={{ opacity: 1 }}>
      <div style={{ position: "relative" }}>
        <div className="searchBox">
          <input type="text" placeholder='Search Contact'></input>
          <i className="fa-solid fa-magnifying-glass magnifier"></i>
        </div>
      </div>
      <div>
        {LoadChatUser()}
      </div>
    </div>
  )
}

//Get Chat User List
const chatUsers = await getChatUserList();
//Check and get new message
const messages = await getChat();

function LoadChatUser() {
  //Loop each chat for display chat list
  const chatUserList = chatUsers.map(chatUser => {
    return (
      <ChatUserComp
        key={chatUser.id}
        cUC_id={chatUser.id}
        cUC_photo={chatUser.profileImage}
        cUC_status=""
        cUC_name={chatUser.username}
        cUC_quantity=""
        cUC_message=""
        cUC_date=""
        cUC_time=""
        cUC_read=""
      />
    )
  });

  return (
    chatUserList
  )
}

//API => List of Users (GET)
async function getChatUserList() {
  const url = "http://18.143.79.95/api/chatSystem/users/list";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

//API => List of Chats (GET)
async function getChat() {
  const url = "http://18.143.79.95/api/chatSystem/chat/list";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error.message);
  }
}

//Check and return new message and quantity
function processMessage() {

  let newMessage = [];
  let oldMessage = [];

  //Separate message into new and old message
  messages.map(function (chat) {
    if (chat.fromUser != 5) {
      newMessage.push(chat);
    } else {
      oldMessage.push(chat);
    };
  });

  let latestMessage = [];
  let showMessage = [];

  oldMessage.map((chat) => {
    showMessage.push({old: chat});
  });

  console.log(showMessage);

  //Filter and only keep latest message and counter
  for (let i = 0; i < newMessage.length; i++) {
    const checker = newMessage[i];
    if (latestMessage[checker.fromUser]) {
      latestMessage[checker.fromUser] = {latest: checker, counter: latestMessage[checker.fromUser].counter + 1};
    } else {
      latestMessage[checker.fromUser] = {latest: checker, counter: 1};
    };
  };
  //Clear null item in array
  latestMessage = latestMessage.filter(item => item != null);

  for (let index = 0; index < showMessage.length; index++) {
    const element = showMessage[index];
    if (element.oldMessage) {}
    
  }

  return showMessage;
};

console.log(processMessage());