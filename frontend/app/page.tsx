'use client'

import "./globals.css";
import "../public/fontello/css/fontello.css";
import React, {PropsWithChildren, ReactNode, useEffect, useRef, useState} from "react";
import useStore from "@/api/useStore";
import {chatSocket} from "@/api";
import {useRouter} from "next/navigation";

interface PageProps {
    children: ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
    const router = useRouter();
    const setSocket = useStore(state => state.setSocket);
    const setLoading = useStore(state => state.setLoading);
    const setUsername = useStore(state => state.setUsername);
    const setUserCode = useStore(state => state.setUserCode);
    const username = useStore(state => state.username);
    const loading = useStore(state => state.loading);
    const socketInitialized = useRef(false);

    useEffect(() => {
        if (!socketInitialized.current) {
            if (!chatSocket.connected) {
                chatSocket.connect();
            }

            chatSocket.on('connect', () => {
                console.log('Connected to the server');
                setSocket(chatSocket);
                setLoading(false);
                if (typeof window !== 'undefined') {
                    const token = localStorage.getItem('token');
                    chatSocket.emit('check_auth', token);
                }
            });

            chatSocket.on('disconnect', (reason) => {
                console.log('Disconnected from the server', reason);
            });

            chatSocket.on('auth_status', (data) => {
                if (data.isAuthenticated) {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('token', data.token);
                    }
                    setUsername(data.user['username']);
                    setUserCode(data.user['userCode']);
                    router.push('/chat');
                } else {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('token');
                    }
                    router.push('/login');
                }
                setLoading(false);
            });

            socketInitialized.current = true;
        }

        return () => {
            chatSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (username) {
            router.push('/chat');
        } else {
            router.push('/login');
        }
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default Page;