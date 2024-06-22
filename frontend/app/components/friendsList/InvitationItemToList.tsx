'use client'


import React, {useState} from "react";

const InvitationItemToList: React.FC = () => {

    function acceptInvitaton() {

    }

    function declineInvitaton() {

    }

    return (
        <div className='flex justify-between bg-b_blue_dark2 px-3 py-2 mt-2 border-b-2 border-r-2 border-b_blue_dark3 rounded-xl hover:cursor-pointer text-f_yellow'>
            <span className="truncate">username#userCode</span>
            <span className="flex-shrink-0">
                <i className="icon-ok" style={{color: '#72d765', cursor: 'pointer'}} onClick={() => acceptInvitaton()}/>
                <i className="icon-cancel" style={{color: '#f05151', cursor: 'pointer'}} onClick={() => declineInvitaton()}/>
            </span>
        </div>

    );
};

export default InvitationItemToList;
