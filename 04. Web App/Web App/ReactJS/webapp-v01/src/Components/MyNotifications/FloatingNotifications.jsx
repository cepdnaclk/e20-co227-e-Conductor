import Swal from 'sweetalert2';
import './FloatingNotifications.css'; // Import your custom CSS for styling

const displayNotification = (type, title, text, button, confirmButtonColor) => {
  const swalConfig = {
    title,
    text,
    icon: type,
    confirmButtonText: !button ? 'OK' : button,
    customClass: {
      confirmButton: 'swal-custom-button' // Apply custom stylings 
    },
    confirmButtonColor
  };

  Swal.fire(swalConfig);
};

export const handleNotifications = ({type, title, body, buttonName}) => {
  //console.log("Notification data: type: %s \n titile: %s \n body: %s \n button: %s", type, title, body, buttonName);
  switch (type) {
    case 'success':
      displayNotification(type, title, body, buttonName, '#4CAF50');
      break;
    case 'error':
      displayNotification(type, title, body, buttonName, '#f44336');
      break;
    case 'warning':
      displayNotification(type, title, body, buttonName, '#ff9800');
      break;
    case 'info':
      displayNotification(type, title, body, buttonName, '#2196F3');
      break;
    case 'question':
      displayNotification(type, title, body, buttonName, '#87adbd');
      break;
    default:
      break;
  }
};
