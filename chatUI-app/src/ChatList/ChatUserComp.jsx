import { useState, useEffect } from 'react';
import { getGroupList, getUser } from '../FetchAPI/FetchAPI.js';
import { useChatContext } from '../FetchAPI/ChatState.jsx';

const ChatUserComp = ({ cUC_id, cUC_photo, cUC_status, cUC_name, cUC_quantity, cUC_message, cUC_date, cUC_time, cUC_read }) => {

    const { cTarget, setCTarget } = useChatContext();

    const setTarget = () => {
        setCTarget(cUC_id);
    };

    return (
        <div id={"userChat_" + cUC_id} className="chatUserComp" onClick={setTarget}>
            <div className="cUC_photo" style={{ backgroundImage: `url(${cUC_photo})` }}>
                <div className="cUC_status"></div>
            </div>
            <div className="cUC_name">{cUC_name}</div>
            <div className="cUC_quantity">1</div>
            <div className="cUC_message">{cUC_message}</div>
            <div className="cUC_date">
                <span>{formatDate(cUC_date)}</span>
                <span>{formatTime(cUC_date)}</span>
            </div>
            <div className="cUC_read">
                <i className="fa-solid fa-check-double"></i>
            </div>
        </div>
    )
};

function formatDate(timestamp) {
    const date = new Date(timestamp); // Create a Date object from the timestamp
    const options = { month: 'short', day: 'numeric', year: 'numeric' };

    return date.toLocaleDateString('en-US', options);
}


function formatTime(timestamp) {
    const date = new Date(timestamp); // Convert timestamp to Date object
    const hours = date.getHours(); // Get the hours
    const minutes = date.getMinutes(); // Get the minutes

    // Format hours to 12-hour clock
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
    const formattedMinutes = minutes.toString().padStart(2, "0"); // Add leading zero if needed

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    return `${formattedHours}:${formattedMinutes}${period}`;
}

export default ChatUserComp;