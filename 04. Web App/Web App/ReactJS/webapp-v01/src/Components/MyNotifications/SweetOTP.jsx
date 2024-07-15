import Swal from "sweetalert2";

export const SweetOTP = async ({ title, inputLabel, onClick, timer=10 }) => {
  let time = timer;
  let interval;

  const updateTimer = () => {
    if (time > 0) {
      time -= 1;
      document.getElementById('otp-timer').innerText = `The OTP is valid for next ${time} seconds.`;
    } else {
      clearInterval(interval);
      document.getElementById('otp-timer').innerHTML = `Didn't receive an OTP? <span id="resend-otp" style="cursor: pointer;"><b><u> Resend OTP </u></b></span>`;
      document.getElementById('resend-otp').addEventListener('click', resendHandle);
    }
  };

  const resendHandle = () => {
    time = timer;
    document.getElementById('otp-timer').innerText = `The OTP is valid for next ${time} seconds.`;
    onClick({ button: 'resend', value: null });
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
    onClick({ button: 'confirm', value: result.value });
  } else if (result.isDismissed) {
    onClick({ button: 'cancel', value: null });
  }
};
