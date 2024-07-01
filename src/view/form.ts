// !! Dom

const formMessage = document.querySelector(
  '#sendMessage'
) as HTMLFormElement | null;

const showMessages = document.querySelector(
  '#show_messages'
) as HTMLElement | null;

// !! Library
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8000');

class Form {
  constructor() {
    this.showMessage.call(this);
    this.errorMessage.call(this);
  }
  sendMessage = async () => {
    if (formMessage) {
      formMessage.addEventListener('submit', async (e: Event) => {
        e.preventDefault();
        const formData = new FormData(formMessage);
        const messageValue = formData.get('message') as string | null;

        if (messageValue) {
          socket.emit('newMessageToServer', { text: messageValue });
          //   !!  Display message immediately
        } else {
          alert('Message cannot be empty.');
        }
      });
    }
  };

  showMessage() {
    socket.on('newMessageFromServer', ({ text }: { text: string }) => {
      if (showMessages) {
        const formData = new FormData(formMessage!);
        const messageValue = formData.get('message') as string | null;

        showMessages.innerHTML += `
            <div class='flex flex-col space-y-1'>
              <p>User sent: ${messageValue}</p>
              <p>Server sent: ${text}</p>
            </div>
          `;
      }
    });
  }

  errorMessage() {
    socket.on('connect_error', (err: Error) => {
      console.error('Connection error:', err);
      alert('Connection error. Please try again later.');
    });
  }
}

export default new Form();
