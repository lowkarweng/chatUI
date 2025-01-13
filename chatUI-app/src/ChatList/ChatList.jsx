import { useState } from 'react';
import ChatUserComp from './ChatUserComp.jsx';
import './chatList.css';

export default function ChatList() {

  const [searchTerm, setSearchTerm] = useState("");

  // Handle input change to update search term and trigger re-render
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on the search term
  const filteredUsers = chatUsers.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Loop each chat for display chat list
  const chatUserList = filteredUsers.map(chatUser => {
    if (chatUser.id != 5) {
      const userInfo = findUserLatest(chatUser.id);
      return (
        <ChatUserComp
          key={chatUser.id}
          cUC_id={chatUser.id}
          cUC_photo={chatUser.profileImage}
          cUC_status=""
          cUC_name={chatUser.username}
          cUC_quantity=""
          cUC_message={userInfo.message}
          cUC_date={new Date(userInfo.timestamp)}
          cUC_time=""
          cUC_read=""
        />
      )
    };
  });
  
  return (
    <div className="chatListGrid chatList">
      <div style={{ position: "relative" }}>
        <div className="searchBox">
          <input type="text" placeholder='Search Contact' onChange={handleSearchChange}></input>
          <i className="fa-solid fa-magnifying-glass magnifier"></i>
        </div>
      </div>
      <div className="chatUserList">
        {chatUserList}
      </div>
      <div className='cLButton'>
        <button type="button">Meeting</button>
        <button type="button">Schedule</button>
      </div>
    </div>
  )
}

//Get Chat User List
const chatUsers = await getChatUserList();
const chatList = await getChatList();

//API => List of Users (GET)
async function getChatUserList() {
  const url = "https://raw.githubusercontent.com/lowkarweng/chatUI/main/chatUI-app/src/data/users/list.json";
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
async function getChatList() {
  const url = "https://raw.githubusercontent.com/lowkarweng/chatUI/main/chatUI-app/src/data/chat/list.json";
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

//Find user latest chat and preview in chat list
function findUserLatest(id) {
  for (let index = chatList.length - 1; index > 0; index--) {
    const chat = chatList[index];
    if (chat.fromUser == id || chat.toUser == id) {
      return chat;
    }
  }
}