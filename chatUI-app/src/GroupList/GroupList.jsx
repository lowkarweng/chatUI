import { useState, useEffect } from 'react';
import GroupComp from './GroupComp.jsx';
import {getGroupList, getUser} from '../FetchAPI/FetchAPI.js';
import './groupList.css';

const groupList = await getGroupList();

const GroupList = ({ }) => {

    //Loop each chat for display chat list
    const groupCompList = groupList.map(group => {

        //State that store user photo url
        const [photoURL, setPhotoURL] = useState(0);
        useEffect(() => {
            //If there is at least a user in the group
            if (group.users[0]) {
                (async () => {
                    const response = await getUser(group.users[0]);
                    setPhotoURL(response.profileImage);
                })();
            };
        }, [])

        return (
            <GroupComp
                key={group.id}
                id={group.id}
                name={group.name}
                member={group.users}
                photo={photoURL}
            />
        );
    });

    return (
        <div className="groupListGrid groupList">
            <div className="addGroup">
                <span>Groups ({groupList.length})</span>
                <button type="button">+</button>
            </div>
            <div className="groupCompList">
                {groupCompList}
            </div>
        </div>
    )
};

export default GroupList;