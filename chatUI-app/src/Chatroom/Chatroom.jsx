import { useState, useEffect, useRef } from 'react';
//Import chat context to access global variable (Chat user ID)
import { useChatContext } from '../FetchAPI/ChatState.jsx';
import { getUser, getChatByUser, sendMessage } from '../FetchAPI/FetchAPI.js';
import './chatroom.css';
import './message.css';

import MessageFrom from "./MessageFrom.jsx";
import MessageTo from "./MessageTo.jsx";

//Current login user - me
const myInfo = await getUser(5);

const Chatroom = ({ }) => {

    const { cTarget, setCTarget } = useChatContext();

    //Get the target user information
    const [targetInfo, setTargetInfo] = useState("");
    //Get the target chat history
    const [targetChat, setTargetChat] = useState("");
    // State for search
    const [searchTerm, setSearchTerm] = useState("");
    // Create a ref for the message area
    const messageAreaRef = useRef(null);

    useEffect(() => {
        (async () => {
            if (cTarget) {
                setTargetInfo(await getUser(cTarget));
                setTargetChat(await getChatByUser(cTarget));
            };
        })();
    }, [cTarget]);

    useEffect(() => {
        if (messageAreaRef.current) {
            // Scroll to the bottom of the message area
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [targetChat, searchTerm]); // Run when messageControl changes


    // Handle input change to update search term and trigger re-render
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const messageControl = [];
    if (targetChat != "") {
        // Filter chats based on the search term
        const filteredChats = targetChat.filter(chat =>
            chat.message.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filteredChats.forEach(message => {
            if (message.fromUser == 5) {
                messageControl.push(
                    <MessageFrom key={message.id} message={message.message} image={message.image} time={message.timestamp} photo={myInfo.profileImage} target={myInfo.username} />
                );
            };
            if (message.toUser == 5) {
                messageControl.push(
                    <MessageTo key={message.id} message={message.message} image={message.image} time={message.timestamp} photo={targetInfo.profileImage} target={targetInfo.username} />
                );
            };
        });
    };

    //Send message function
    function sendMsg() {
        const message = document.getElementById("messageInput").value;
        if (message != "") {
            sendMessage(5, cTarget, message);
            document.getElementById("messageInput").value = "";
        };
    };

    return (
        <div className="chatroomGrid chatroom" style={{ opacity: 1 }}>
            <div className="cRInfo">
                <div className="cRPhoto" style={{ backgroundImage: `url(${targetInfo.profileImage})` }}></div>
                <div className="cRUser">
                    <div>{targetInfo.username}</div>
                    <div>{targetInfo.position}</div>
                </div>
                <div className="cRInfo_search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder='Search' onChange={handleSearchChange}></input>
                </div>
                <div className="cRInfo_button">
                    <i className="fa-solid fa-phone-volume"></i>
                    <i className="fa-solid fa-video"></i>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
            <div className="messageArea" ref={messageAreaRef}>
                {messageControl}
            </div>
            <div className="inputArea">
                <textarea id="messageInput" placeholder='Type a message here..' maxLength={160}></textarea >
                <div className="buttonArea">
                    <div className='inputButton'>
                        <i className="fa-solid fa-at"></i>
                    </div>
                    <div className='inputButton'>
                        <i className="fa-solid fa-underline"></i>
                    </div>
                    <div className='inputButton'>
                        <i className="fa-solid fa-paperclip"></i>
                    </div>
                    <div className='inputButton'>
                        <i className="fa-solid fa-face-smile"></i>
                    </div>
                    <div className='inputButton'>
                        <i className="fa-solid fa-image"></i>
                    </div>
                    <div className='inputButton'>
                        <i className="fa-solid fa-link"></i>
                    </div>
                    <div className="enterButton" onClick={sendMsg}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatroom;