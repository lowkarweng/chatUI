const SiderComp = ({ icon, select }) => {
    if (!select) {
        select = "";
    };
    return (
        <div className={`siderComp ${select}`}>
            <i className={icon}></i>
        </div>
    )
};

export default SiderComp;