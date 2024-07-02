import { Socket, io } from 'socket.io-client';

export const socket: Socket = io('http://localhost:8000');

export const socketAdmin: Socket = io('http://localhost:8000/admin');
