import socketIOClient from 'socket.io-client';

export const chatSocket = socketIOClient('http://127.0.0.1:5000', {
    transports: ['websocket'],
    upgrade: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
});
