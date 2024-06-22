'use client'


import React, {useState} from "react";
import FriendItemToList from "./FriendItemToList";
import InvitationItemToList from "./InvitationItemToList";

const FriendsListBox: React.FC = () => {

    const [friendsList, setFriendsList] = useState([]);
    const [invitationsList, setInvitationsList] = useState([]);

    return (
        <div >
            {/*{invitationsList.map(item => (*/}
                <InvitationItemToList/>
            {/*))}*/}
            {/*{friendsList.map(item => (*/}
                <FriendItemToList/>
            {/*))}*/}
        </div>
    );
};

export default FriendsListBox;
