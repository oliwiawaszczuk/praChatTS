'use client'

import React, {useState} from 'react'
import {chatSocket} from "@/api";
import {useRouter} from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();

    chatSocket.on('logout', () => {
        localStorage.removeItem('token');
        router.push('/login');
    })

    return (
        <div className='mx-2'>
            <p>profile</p>
            <button className='text-f_yellow bg-b_blue_dark px-3 py-1 font-bold' onClick={() => {chatSocket.emit('logout', localStorage.getItem('token'))}}>LOGOUT</button>
        </div>
    )
}

export default ProfilePage