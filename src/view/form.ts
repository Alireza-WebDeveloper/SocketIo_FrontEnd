// !! Dom
const formMessage = document.querySelector(
  '#sendMessage'
) as HTMLFormElement | null;
const showMessages = document.querySelector(
  '#show_messages'
) as HTMLElement | null;

interface Message {
  serverMessage: string;
  clientMessage: string;
  username: string;
  id: string;
}

import Notification from '../helpers/notification';
import generateRandomRoomName from '../helpers/rooName';
// !! Library
import { socket } from '../helpers/socket.base';
import Room, { roomList } from './room';
import User from './user';
class Form {
  private user: typeof User;
  constructor() {
    this.showMessage.call(this);
    this.errorMessage.call(this);
    this.user = User;
  }

  sendMessage = async () => {
    if (formMessage) {
      formMessage.addEventListener('submit', async (e: Event) => {
        e.preventDefault();
        const formData = new FormData(formMessage);
        const messageValue = formData.get('message') as string | null;
        const roomJoinId = formData.get('roomJoinId') as string | null;

        // !! Send Message To Server With Emit (text,username,id,roomJoinId)
        if (messageValue && roomJoinId) {
          socket.emit('newMessageToServer', {
            text: messageValue,
            username: this.user.getUser().username,
            id: this.user.getUser().id,
            roomJoinId: String(roomJoinId),
          });

          // !! Add Room
          const addRoomList = roomList.find(
            (room: any) => room.id === roomJoinId
          );
          if (!addRoomList) {
            roomList.push(
              new Room(String(roomJoinId), generateRandomRoomName())
            );
          }
        } else {
          Notification.error({ message: 'please enter (roomJoinId , message' });
        }
      });
    }
  };
  // !! Received Messages From Server To Show Box With Socket.On
  showMessage() {
    socket.on(
      'newMessageFromServer',
      ({ serverMessage, clientMessage, username, id }: Message) => {
        if (showMessages) {
          // Notification
          Notification.success({ message: serverMessage });
          //  Inter To Dom Element
          showMessages.innerHTML += `
            <div class='flex flex-col space-y-1'>
              <p>User ${username}-${id} : ${clientMessage}</p>
            </div>
          `;
        }
      }
    );
  }

  errorMessage() {
    socket.on('connect_error', (err: Error) => {
      console.error('Connection error:', err);
      alert('Connection error. Please try again later.');
    });
  }
}

export default new Form();
