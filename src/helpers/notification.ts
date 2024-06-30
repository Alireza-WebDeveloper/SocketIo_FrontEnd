import Swal from 'sweetalert2';

interface NotificationData {
  message: string;
  timer?: number;
}

class Notification {
  static success({ message = '', timer = 1 }: NotificationData) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: timer * 1000,
    });
  }

  static error({ message = '', timer = 1 }: NotificationData) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: timer * 1000,
    });
  }
}

export default Notification;
