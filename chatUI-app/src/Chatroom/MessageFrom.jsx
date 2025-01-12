const MessageFrom = ({ message, image, time, photo, target }) => {
    const pDate = formatDate(time);
    const pTime = formatTime(time);

    if (image) {
        image = (
            <div>
                <img className="msgImage" src={image} alt={image} />
            </div>
        );
    } else {
        image = "";
    };

    return (
        <div className="messageFrom">
            <div className="userPhoto" style={{ backgroundImage: `url(${photo})` }}></div>
            <div className="msgSender">
                <span className="userName">{target}</span>
                <span className="msgTime">{pDate + " " + pTime}</span>
            </div>
            <div className="msgContent">
                {image}
                {message}
            </div>
        </div>
    );
};

export default MessageFrom;

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