'use client'

import React, {useEffect, useState} from 'react'
import {useRouter} from "next/navigation";
import useStore from "@/api/useStore";
import {chatSocket} from "@/api";

const ProfilePage = () => {
    const router = useRouter();
    const setUsername = useStore((state) => state.setUsername);
    const setUserCode = useStore((state) => state.setUserCode);


    chatSocket.on('logout', () => {
        localStorage.removeItem('token');
        setUsername('');
        setUserCode('');
        router.push('/login');
    });


    return (
        <div className='mx-2'>
            <p>profile</p>
            <button className='text-f_yellow bg-b_blue_dark px-3 py-1 font-bold' onClick={() => {chatSocket.emit('logout', localStorage.getItem('token'))}}>LOGOUT</button>
        </div>
    )
}

export default ProfilePage