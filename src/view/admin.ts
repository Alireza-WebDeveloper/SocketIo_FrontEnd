import { Socket, io } from 'socket.io-client';
import Notification from '../helpers/notification';

const socketAdmin: Socket = io('http://localhost:8000/admin');

interface AdminState {
  connectToSocket(): void;
}

class Admin implements AdminState {
  private runConnectionToSocket = () => {
    // !! 1 ) Connect to socket
    socketAdmin.on('connect', () => {
      console.log('Connected to socket admin successfully.');
    });

    // !! 2 ) Handle 'welcome' event
    socketAdmin.on('welcome', (message: string) => {
      Notification.success({ message, timer: 2 });
    });

    // !! 3 ) Handle connection errors
    socketAdmin.on('connect_error', (error: Error) => {
      Notification.error({
        message: `Failed to connect to socket admin: ${error.message}`,
        timer: 2,
      });
    });
  };

  public connectToSocket() {
    this.runConnectionToSocket();
  }
}

export default new Admin();
