import Swal from 'sweetalert2';
import './FloatingNotifications.css'; // Import your custom CSS for styling

const displayNotification = (type, title, text, confirmButtonColor) => {
  const swalConfig = {
    title,
    text,
    icon: type,
    confirmButtonText: 'OK',
    customClass: {
      confirmButton: 'swal-custom-button' // Apply custom button width
    },
    confirmButtonColor
  };

  Swal.fire(swalConfig);
};

export const handleNotifications = (e) => {
  switch (e) {
    case 'timeOut':
      displayNotification('warning', 'Time is out!', 'Please click Resend OTP to get a new OTP.', '#ff9800');
      break;
    case 'wait':
      displayNotification('warning', 'Wait!', 'Wait until countdown ends.', '#ff9800');
      break;
    case 'invalid':
      displayNotification('error', 'Invalid OTP!', 'OTP is invalid. Try Again!', '#f44336');
      break;
    case 'resend':
      displayNotification('info', 'Resend OTP!', 'New OTP is sent to your mobile number.', '#2196F3');
      break;
    case 'success':
      displayNotification('success', 'Registration Successful!', "Welcome to e-Conductor Family.\n Use the sent link to your email for initial login.", '#4CAF50');
      break;
    default:
      break;
  }
};
