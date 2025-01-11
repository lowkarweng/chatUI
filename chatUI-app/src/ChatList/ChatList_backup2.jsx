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

const lttMessage = await getLatestMessage();
console.log(lttMessage);

function LoadChatUser() {

  let chatUserID = 0;
  for (let index = 0; index < lttMessage.length; index++) {
    const element = lttMessage[index]
    if(element.fromUser == 5){
      chatUserID = element.toUser;
    } else {
      chatUserID = element.fromUser;
    };
    console.log(chatUserID);
  }

  const chatrooms = [];



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

  console.log(chatUserList);

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
async function getLatestMessage() {
  const url = "http://18.143.79.95/api/chatSystem/chat/list";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const messages = await response.json();

    //Check Latest
    for (let i = messages.length - 1; i >= 0; i--) {
      const checker = messages[i];

      if (!checker.old) {

        messages[i].latest = true;

        for (let j = 0; j < messages.length; j++) {

          if (i != j) {

            const responder = messages[j];

            if (checker.toUser == responder.toUser || checker.toUser == responder.fromUser && checker.fromUser == responder.toUser) {
              if (!messages[i].counter) {
                messages[i].counter = 1;
              };


              if (!responder.latest) {
                responder.old = true;
              };

              messages[i].counter++;
            };

            // if (checker.toUser == 5 & checker.fromUser == responder.fromUser) {
            //   if (!messages[i].counter) {
            //     messages[i].counter = 1;
            //   };


            //   if (!responder.latest) {
            //     responder.old = true;
            //   };

            //   messages[i].counter++;
            // };

          };

        };
      };

    };

    const latestMessages = messages.filter((chat) => {
      if (chat.latest == true) {
        return chat;
      };
    });

    // console.log(latestMessages);

    return latestMessages;

  } catch (error) {
    console.error(error.message);
  }
}

//API => Get User Details by user id (GET)
async function getUserInfo(id) {
  const url = "http://18.143.79.95/api/chatSystem/user/" + id;
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
