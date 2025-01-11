import SiderComp from "./SiderComp.jsx";
import './sider.css';

export default function Sider() {
    return (
        <div className="siderGrid sider">
            <SiderComp icon="fa-solid fa-house"/>
            <SiderComp icon="fa-solid fa-building"/>
            <SiderComp icon="fa-solid fa-hourglass"/>
            <SiderComp icon="fa-solid fa-envelope" select="selected"/>
            <SiderComp icon="fa-solid fa-file-invoice"/>
            <SiderComp icon="fa-solid fa-calendar-days"/>
            <SiderComp icon="fa-solid fa-comment"/>
            <SiderComp icon="fa-solid fa-gear"/>
            <SiderComp icon="fa-solid fa-user"/>
        </div>
    )
}