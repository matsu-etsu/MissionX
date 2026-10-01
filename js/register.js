// Luka's update: I kept Etsuko's password check, but stop the form from
// leaving for a page that does not exist. No passwords are stored or logged.
const registerForm = document.querySelector("#register-form");
const password = document.querySelector("#register-password");
const confirmPassword = document.querySelector("#register-confirm");
const registerError = document.querySelector("#register-error");
const registerMessage = document.querySelector("#register-message");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!registerForm.reportValidity()) {
    return;
  }
  if (password.value.length < 6 || !/[0-9]/.test(password.value)) {
    registerError.textContent = "Use at least 6 characters and one number.";
    registerError.hidden = false;
    password.focus();
    return;
  }
  if (password.value !== confirmPassword.value) {
    registerError.textContent = "The passwords do not match.";
    registerError.hidden = false;
    confirmPassword.focus();
    return;
  }
  registerError.hidden = true;
  registerMessage.hidden = false;
  registerMessage.textContent = "Demo account details checked. You can now log in.";
  registerForm.reset();
});
