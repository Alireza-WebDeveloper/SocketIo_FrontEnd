// !! Styles
import 'sass';
import '../style.scss';
import { io } from 'socket.io-client';
import Notification from './helpers/notification';

// !! Dom
const main = document.querySelector('#main') as InnerHTML;
const socket = io('http://localhost:8000/');

// 1 ) Socket Io
socket.on('messageFromServer', (dataFromServer: { data: string }) => {
  setTimeout(() => {
    Notification.success({ message: dataFromServer.data, timer: 2 });
  });

  socket.emit('messageToServer', { data: 'this is from the client' });
});

//  2 ) Routes
const Route = async (currentPath = window.location.pathname) => {
  if (currentPath === '/') {
    main.innerHTML = 'home page';
  } else if (currentPath === '/about') {
    main.innerHTML = 'about page';
  } else if (currentPath === '/login') {
    main.innerHTML = 'login page';
  } else if (currentPath === '/logout') {
    main.innerHTML = 'logout page';
  }
};

Route();
