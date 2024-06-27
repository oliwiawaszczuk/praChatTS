'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import "../public/fontello/css/fontello.css";
import React, {PropsWithChildren, useEffect, useState} from "react";
import useStore from "@/api/useStore";
import {chatSocket} from "@/api";
import {useRouter} from "next/navigation";
import {ChatPage} from "@/app/components/chat/ChatPage";

const inter = Inter({ subsets: ["latin"] });

export default function Page(props: PropsWithChildren) {
    const router = useRouter();

    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);
    const username = useStore((state) => state.username);

    useEffect(() => {
        if (!chatSocket.connected) {
            chatSocket.connect();
        }

        // const checkAuth = async () => {
        //     setLoading(true);
        //
        //
        //     const currentPathname = window.location.pathname;
        //     const allowedPathname = ['/chat', '/profile'];
        //
        //     if (!allowedPathname.includes(currentPathname)) {
        //
        //     }
        //
        //
        // };

        // if(window !== undefined) {
        //     checkAuth();
        // }

        return () => {
            chatSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        router.push('/chat');
    }, [username]);

     if (loading) {
         return (
            <div>Loading...</div>
        );
     }
    return (
        <div><ChatPage/> </div>
    );
}
