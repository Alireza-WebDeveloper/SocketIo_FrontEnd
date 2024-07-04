// !! Styles
import 'sass';
import '../style.scss';
import './helpers/theme';
// Dom
const main = document.querySelector('#main') as HTMLElement | null;
// !! View
import Form from './view/form';
import Admin from './view/admin';
import { socket } from './helpers/socket.base';

// Routes
const Route = async (
  currentPath: string = window.location.pathname
): Promise<void> => {
  if (main) {
    switch (currentPath) {
      case '/':
        Form.sendMessage();
        break;
      case '/about':
        main.innerHTML = 'about page';
        Admin.connectToSocket();
        break;
      case '/login':
        main.innerHTML = 'login page';
        break;
      case '/logout':
        main.innerHTML = 'logout page';
        break;
      default:
        main.innerHTML = '404 page not found';
    }
  }
};

Route();
