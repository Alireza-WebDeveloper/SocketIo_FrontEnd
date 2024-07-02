// !! Styles
import 'sass';
import '../style.scss';
import './helpers/theme';
// Dom
const main = document.querySelector('#main') as HTMLElement | null;
// !! View
import Form from './view/form';

// 2 ) Handler Actions
Form.sendMessage();

// Routes
const Route = async (
  currentPath: string = window.location.pathname
): Promise<void> => {
  if (main) {
    switch (currentPath) {
      case '/':
        // main.innerHTML = 'home page';
        break;
      case '/about':
        main.innerHTML = 'about page';
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
