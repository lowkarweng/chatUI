const GroupComp = ({ id, name, member, photo }) => {

    const tagColor = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;

    return (
        <div id={"group_" + id} className="groupComp">
            <div className="groupTag" style={{
                backgroundColor: `hsl(${tagColor}, 70%, 80%)`,
                color: `hsl(${tagColor}, 70%, 20%)`
            }}>{name[0]}</div>
            <div className="groupName">{name}</div>
            <div className="groupMember">
                {member.length != 0 && (
                    <div className="groupMemberPhoto" style={{ backgroundImage: `url(${photo})` }}>
                        {member.length > 1 && (
                            <div className="groupMemberMore">+{member.length - 1}</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupComp;