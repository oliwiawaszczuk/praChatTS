'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import "../public/fontello/css/fontello.css";
import React, { useEffect } from "react";
import { chatSocket } from "@/api";
import useStore from "@/api/useStore";
import {useRouter} from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const setSocket = useStore((state) => state.setSocket);
    const router = useRouter();
    const setUsername = useStore((state) => state.setUsername);
    const setUserCode = useStore((state) => state.setUserCode);

    useEffect(() => {
    const checkAuth = async () => {
      chatSocket.connect();
      chatSocket.emit('check_auth', localStorage.getItem('token'));

      chatSocket.on('auth_status', (data) => {
        if (data.isAuthenticated) {
          setUsername(data.user['username']);
          setUserCode(data.user['userCode']);

          const currentPathname = window.location.pathname;
          const allowedPathname = ['/chat', '/profile'];

          if (!allowedPathname.includes(currentPathname)) {
            router.push('/chat');
          }

        }

        if (!data.isAuthenticated && window.location.pathname !== '/login') {
          localStorage.removeItem('token');
          router.push('/login');
        }
      });
    };

    checkAuth();

    return () => {
      chatSocket.disconnect();
    };
  }, [setSocket]);

  return (
    <html lang="en">
      <head>
        <title>praChat</title>
        <link rel="icon" href="/duck_icon.png"/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}