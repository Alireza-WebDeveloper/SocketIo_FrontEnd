// !! Dom
const formMessage = document.querySelector(
  '#sendMessage'
) as HTMLFormElement | null;
const showMessages = document.querySelector(
  '#show_messages'
) as HTMLElement | null;

// !! Library
import { socket } from '../helpers/socket.base';
class Form {
  constructor() {
    this.showMessage.call(this);
    this.errorMessage.call(this);
  }

  join = () => {
    socket.on('joined', (message: string) => {
      console.log(message);
    });
  };

  sendMessage = async () => {
    if (formMessage) {
      formMessage.addEventListener('submit', async (e: Event) => {
        e.preventDefault();
        const formData = new FormData(formMessage);
        const messageValue = formData.get('message') as string | null;
        // !! Emit Message To Server
        if (messageValue) {
          socket.emit('newMessageToServer', { text: messageValue });
        } else {
          alert('Message cannot be empty.');
        }
      });
    }
  };
  // !! Show Messages Receives From Server
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
