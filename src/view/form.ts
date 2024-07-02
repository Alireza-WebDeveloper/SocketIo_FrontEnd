// !! Dom
const formMessage = document.querySelector(
  '#sendMessage'
) as HTMLFormElement | null;
const showMessages = document.querySelector(
  '#show_messages'
) as HTMLElement | null;

import Notification from '../helpers/notification';
// !! Library
import { socket } from '../helpers/socket.base';
import User from './user';
class Form {
  private user: typeof User;
  constructor() {
    this.showMessage.call(this);
    this.errorMessage.call(this);
    this.join.call(this);
    this.user = User;
  }

  join = () => {
    socket.on('joined', (data: any) => {
      console.log(data);
    });
  };

  sendMessage = async () => {
    if (formMessage) {
      formMessage.addEventListener('submit', async (e: Event) => {
        e.preventDefault();
        const formData = new FormData(formMessage);
        const messageValue = formData.get('message') as string | null;
        const roomJoinId = formData.get('roomJoinId') as string | null;

        // !! Emit Message To Server
        if (messageValue && roomJoinId) {
          socket.emit('newMessageToServer', {
            text: messageValue,
            username: this.user.getUser().username,
            id: this.user.getUser().id,
            roomJoinId: String(roomJoinId),
          });
        } else {
          Notification.error({ message: 'please enter (roomJoinId , message' });
        }
      });
    }
  };
  // !! Show Messages Receives From Server
  showMessage() {
    socket.on(
      'newMessageFromServer',
      ({
        serverMessage,
        clientMessage,
        username,
        id,
      }: {
        serverMessage: string;
        clientMessage: string;
        username: string;
        id: string;
      }) => {
        if (showMessages) {
          Notification.success({ message: serverMessage });
          // !! Injection User
          //   <p>Server sent: ${serverMessage}</p>
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
