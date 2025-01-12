import SiderComp from "./SiderComp.jsx";
import { getUser, getChatByUser } from '../FetchAPI/FetchAPI.js';
import './sider.css';

const myInfo = await getUser(5);

export default function Sider() {
    return (
        <div className="siderGrid">
            <div className="sider">
                <SiderComp icon="fa-solid fa-house" />
                <SiderComp icon="fa-solid fa-building" />
                <SiderComp icon="fa-solid fa-hourglass" />
                <SiderComp icon="fa-solid fa-envelope" select="selected" />
                <SiderComp icon="fa-solid fa-file-invoice" />
                <SiderComp icon="fa-solid fa-calendar-days" />
                <SiderComp icon="fa-solid fa-comment" />
                <SiderComp icon="fa-solid fa-gear" />
                <SiderComp icon="fa-solid fa-user" />
            </div>
            <div className="currentUserPhoto" style={{ backgroundImage: `url(${myInfo.profileImage})` }}>
                <div className="currentUserStatus"></div>
                <div className="currentUserName">{myInfo.username}</div>
            </div>
        </div>
    )
}