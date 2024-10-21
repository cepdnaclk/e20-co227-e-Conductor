import Swal from "sweetalert2";

/* Tost Alert  */

export function ToastAlert({ timer, title, type, onClose, position }) {
  const Toast = Swal.mixin({
    toast: true,
    position: position || "top-end",
    showConfirmButton: false,
    timer: timer || 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    didClose: onClose,
  });

  Toast.fire({
    icon: type,
    title: title,
  });
}
