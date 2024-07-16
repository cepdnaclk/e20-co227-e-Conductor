import Swal from 'sweetalert2';
import './FloatingNotifications.css'; // Import your custom CSS for styling

/* Email Input */
export const SweetEmail = async ({ onChange }) => {
    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address"
    });
  
    if (email) { onChange(email); }
};
  
/* OTP Input */
export const SweetOTP = async ({ title, inputLabel, onClick, timer, origin }) => {
  let time = timer;
  let interval;

  // Function to clear OTP inputs
  const clearOtpInputs = () => {
    for (let i = 1; i <= 6; i++) {
      document.getElementById(`otp-${i}`).value = '';
    }
  };

  const updateTimer = () => {
    if (time > 0) {
      time -= 1;
      document.getElementById('otp-timer').innerText = `The OTP is valid for next ${time} seconds.`;
    } else {
      clearInterval(interval);
      document.getElementById('otp-timer').innerHTML = `Didn't receive an OTP? <span id="resend-otp" style="cursor: pointer;"><b><u> Resend OTP </u></b></span>`;
      document.getElementById('resend-otp').addEventListener('click', resendHandle);
      const confirmButton = document.querySelector('.swal2-confirm');
      confirmButton.disabled = true; // Disable Confirm button
      confirmButton.classList.add('disabled-button'); // Add disabled button class
    }
  };

  const resendHandle = () => {
    time = timer;
    document.getElementById('otp-timer').innerText = `The OTP is valid for next ${time} seconds.`;
    clearOtpInputs(); 
    const confirmButton = document.querySelector('.swal2-confirm');
    confirmButton.disabled = false;                             // Re-enable Confirm button
    confirmButton.classList.remove('disabled-button');          // Remove disabled button class
    onClick({ button: 'resend', value: null, origin:origin });
    interval = setInterval(updateTimer, 1000);
  };

  const result = await Swal.fire({
    title: title,
    html: `
      <label for="otp-inputs">${inputLabel}</label>
      <div class='Sweet-otp-area'>
        <div id="otp-inputs" class="otp-input-container">
          <input type="text" id="otp-1" maxlength="1" class="otp-input" />
          <input type="text" id="otp-2" maxlength="1" class="otp-input" />
          <input type="text" id="otp-3" maxlength="1" class="otp-input" />
          <input type="text" id="otp-4" maxlength="1" class="otp-input" />
          <input type="text" id="otp-5" maxlength="1" class="otp-input" />
          <input type="text" id="otp-6" maxlength="1" class="otp-input" />
        </div>
      </div>
      <label id="otp-timer">The OTP is valid for next ${time} seconds.</label>
    `,
    showCancelButton: true,
    showLoaderOnConfirm: true,
    confirmButtonText: 'Continue',
    cancelButtonText: 'Back',
    reverseButtons: true,
    preConfirm: () => {
      const otp = Array.from({ length: 6 }, (_, i) => document.getElementById(`otp-${i + 1}`).value).join('');
      return otp;
    },
    didOpen: () => {
      const inputs = Array.from(document.querySelectorAll('.otp-input'));
      inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
          if (e.target.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        });
      });
      interval = setInterval(updateTimer, 1000);
    },
    willClose: () => {
      clearInterval(interval);
    },
    customClass: {
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button'
    },
    buttonsStyling: false
  });

  if (result.isConfirmed) {
    onClick({ button: 'confirm', value: result.value, origin:origin });
  } else if (result.isDismissed) {
    onClick({ button: 'cancel', value: null, origin:origin });
  }
};

/* Password Input */
export const SweetPassword = async({ title, inputLabel, inputPlaceholder, showCancelButton, maxLength, onChange, onClick }) => {
  const result = await Swal.fire({
    title: title,
    input: "password",
    inputLabel: inputLabel,
    inputPlaceholder: inputPlaceholder,
    showCancelButton: showCancelButton || true,
    confirmButtonText: 'Continue',
    cancelButtonText: 'Back',
    reverseButtons: true,
    inputAttributes: {
      maxlength: maxLength,
      autocapitalize: "off",
      autocorrect: "off"
    },
    customClass: {
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button'
    },
    buttonsStyling: false
  });

  if (result.isConfirmed) {
    onClick('confirm');
    onChange(result.value);
  } else if (result.isDismissed) {
    onClick('cancel');
  }
};

/* Text Input */
export const SweetText = async({ title, inputLabel, onChange }) => {
    const { value: text } = await Swal.fire({
        title: title,
        icon:'success', 
        input: "text",
        inputLabel: inputLabel,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        }
      });  
    if (text) { onChange(text); }
};

/* Multy  Inputs */
export const SweetMultyInput = async({ title, onChange }) => {
  const { value: formValues } = await Swal.fire({
    title: title,
    html: `
      <input id="swal-input1" class="swal2-input">
      <input id="swal-input2" class="swal2-input">
    `,
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value
      ];
    }
  });
  if (formValues) {
    onChange(formValues);
  }
}