'use client'

import React, {useState} from 'react'
import LoginInput from "../components/LoginInput";
import RegisterInput from "../components/RegisterInput";
import {chatSocket} from "@/api";
import {useRouter} from "next/navigation";
import useStore from "@/api/useStore";

const Page = () => {
    const [login, setLogin] = useState(true);
    const router = useRouter();
    const setUsername = useStore((state) => state.setUsername);
    const setUserCode = useStore((state) => state.setUserCode);

    chatSocket.on('login_successful', (data) => {
        localStorage.setItem('token', data.token);
        setUsername(data.user['username']);
        setUserCode(data.user['userCode']);
        router.push('/chat');
    });

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div
                className='bg-b_blue_dark1 border-b_blue_dark border-4 p-4 text-f_yellow drop-shadow-md flex flex-col md:flex-row rounded-2xl'>
                <div className='w-full md:w-1/2 flex p-2 justify-center'>
                    <img src={'/duck.png'} alt="duck"/>
                </div>
                <div className='w-full md:w-1/2 flex justify-center flex-col p-2'>
                    {login ? <LoginInput setLogin={setLogin}/> : <RegisterInput setLogin={setLogin}/>}
                </div>
            </div>
        </div>
    )
}

export default Page