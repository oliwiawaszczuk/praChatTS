'use client'

import socketIOClient from 'socket.io-client';
import useStore from './useStore';

export const chatSocket = socketIOClient('http://127.0.0.1:5000', {
    transports: ['websocket'],
    upgrade: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
});

function InitSocket() {

    const setSocket = useStore.getState().setSocket;
    const setLoading = useStore.getState().setLoading;
    const setUsername = useStore.getState().setUsername;
    const setUserCode = useStore.getState().setUserCode;

    chatSocket.on('connect', () => {
        console.log('Connected to the server');
        setSocket(chatSocket);
        setLoading(false);
        if (window !== undefined) {
            chatSocket.emit('check_auth', localStorage.getItem('token'));
        }

    });

    chatSocket.on('disconnect', (reason) => {
        console.log('Disconnected from the server', reason);
        setLoading(true);
        // if (reason === 'io server disconnect') {
        //   chatSocket.connect();
        // }
    });

    chatSocket.on('auth_status', (data) => {
        if (data.isAuthenticated) {
            if (window !== undefined) {
                localStorage.setItem('token', data.token);
            }
            setUsername(data.user['username']);
            setUserCode(data.user['userCode']);


        } else {
            if (window !== undefined) {
                localStorage.removeItem('token');
            }
            // router.push('/login');
        }

        setLoading(false);
    });
}

try {
    if (window) {
        InitSocket();
    }
} catch(e) {

}
