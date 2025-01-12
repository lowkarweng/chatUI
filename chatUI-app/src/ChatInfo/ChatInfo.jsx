import { useState, useEffect } from 'react';
//Import chat context to access global variable (Chat user ID)
import { useChatContext } from '../FetchAPI/ChatState.jsx';
import { getGroupList, getUser, getChatByUser } from '../FetchAPI/FetchAPI.js';
//Import group component
import GroupComp from '../GroupList/GroupComp.jsx';
import './chatInfo.css';

const groupList = await getGroupList();

const ChatInfo = ({ }) => {

    const { cTarget, setCTarget } = useChatContext();

    //Get the target user information
    const [targetInfo, setTargetInfo] = useState("");
    //Get the target chat history for media/images
    const [targetChat, setTargetChat] = useState("");

    useEffect(() => {
        (async () => {
            if (cTarget) {
                setTargetInfo(await getUser(cTarget));
                setTargetChat(await getChatByUser(cTarget));
            };
        })();
    }, [cTarget]);

    //State that store user photo url
    const [photoURL, setPhotoURL] = useState(0);

    //Get the target user group list
    //Loop each chat for display chat list
    const groupCompList = groupList.map(group => {

        useEffect(() => {
            //If there is at least a user in the group
            if (group.users[0]) {
                (async () => {
                    const response = await getUser(group.users[0]);
                    setPhotoURL(response.profileImage);
                })();
            };
        }, [])

        if (group.users.includes(targetInfo.id)) {
            return (
                <GroupComp
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    member={group.users}
                    photo={photoURL}
                />
            );
        };

    });

    //Array to store media component (for images)
    const mediaList = [];
    if (targetChat) {
        //Loop each chat to retrieve media
        const images = targetChat.filter(chat => chat.image !== null && chat.image !== undefined).map(chat => chat.image);
        images.forEach((image, index) => {
            mediaList.push(
                <img className='infoMediaImage' src={image} key={index}/>
            );
        });
    };

    return (
        <div className="chatInfoGrid chatInfo" style={{ opacity: 1 }}>
            <div className="infoProfile" style={{ backgroundImage: `url(${targetInfo.profileImage})` }}>
                <div className="infoDetail">
                    <div>{targetInfo.username}</div>
                    <div>{targetInfo.position}</div>
                    <div>
                        <i className="fa-solid fa-location-dot"></i> {targetInfo.address}
                    </div>
                    <div className="infoButton">
                        <i className="fa-solid fa-user-plus"></i>
                        <i className="fa-solid fa-comment"></i>
                        <i className="fa-solid fa-video"></i>
                    </div>
                </div>
            </div>
            <div className="infoUser">
                <i className="fa-solid fa-circle-info infoIcon"></i>
                <div>User Information</div>
                <div className="infoLabel">Phone</div>
                <div className="infoText">{targetInfo.phone}</div>
                <div className="infoLabel">Email</div>
                <div className="infoText">{targetInfo.email}</div>
            </div>
            <div className="infoGroup">
                <div className="infoGroupTitle">
                    <i className="fa-solid fa-people-group infoIcon"></i>
                    <div>Group Participants</div>
                </div>
                {groupCompList}
            </div>
            <div className="infoMedia">
                <i className="fa-solid fa-image infoIcon"></i>
                <div>Media</div>
                {mediaList}
            </div>
        </div>
    );
};

export default ChatInfo;