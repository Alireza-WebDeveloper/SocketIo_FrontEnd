// !! Styles
import 'sass';
import '../style.scss';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000/');

socket.on('connect', () => {
  console.log('Connected to server!');
  socket.on('welcome', (message: string) => {
    console.log(message);
  });
});
