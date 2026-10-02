// Luka's update: I kept Etsuko's password check, but stop the form from
// leaving for a page that does not exist. No passwords are stored or logged.
// Etsuko's update: Restored the Figma validation UI for
// name, email, phone, password and password confirmation.
//
// Input
const registerForm = document.querySelector("#register-form");
const nameInput = document.querySelector("#register-name");
const emailInput = document.querySelector("#register-email");
const phoneInput = document.querySelector("#register-phone");
const passwordInput = document.querySelector("#register-password");
const confirmInput = document.querySelector("#register-confirm");

// Error messages
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const phoneError = document.querySelector("#phone-error");
const passwordError = document.querySelector("#password-error");
const confirmError = document.querySelector("#confirm-error");

// Password hint
const passwordHint = document.querySelector("#password-hint");

// Result messages
const registerError = document.querySelector("#register-error");
const registerMessage = document.querySelector("#register-message");

// Check registration form
function checkRegister() {
  let isValid = true;

  // Check name
  if (nameInput.value.trim() === "") {
    nameError.textContent = "! Enter your name";
    nameError.classList.add("visible");
    nameInput.classList.add("input-error");
    nameInput.setAttribute("aria-invalid", "true");
    isValid = false;
  } else {
    nameError.textContent = "";
    nameError.classList.remove("visible");
    nameInput.classList.remove("input-error");
    nameInput.setAttribute("aria-invalid", "false");
  }

  // Check email
  if (emailInput.value.trim() === "") {
    emailError.textContent = "! Enter your email address";
    emailError.classList.add("visible");
    emailInput.classList.add("input-error");
    emailInput.setAttribute("aria-invalid", "true");
    isValid = false;
  } else if (!emailInput.validity.valid) {
    emailError.textContent = "! Enter a valid email address";
    emailError.classList.add("visible");
    emailInput.classList.add("input-error");
    emailInput.setAttribute("aria-invalid", "true");
    isValid = false;
  } else {
    emailError.textContent = "";
    emailError.classList.remove("visible");
    emailInput.classList.remove("input-error");
    emailInput.setAttribute("aria-invalid", "false");
  }

  // Check phone
  // Phone number is optional.
  if (
    phoneInput.value.trim() !== "" &&
    !/^[0-9+\-\s()]+$/.test(phoneInput.value)
  ) {
    phoneError.textContent = "! Enter a valid phone number";
    phoneError.classList.add("visible");
    phoneInput.classList.add("input-error");
    phoneInput.setAttribute("aria-invalid", "true");
    isValid = false;
  } else {
    phoneError.textContent = "";
    phoneError.classList.remove("visible");
    phoneInput.classList.remove("input-error");
    phoneInput.setAttribute("aria-invalid", "false");
  }

  // Check password
  if (passwordInput.value === "") {
    passwordError.textContent = "! Enter your password";
    passwordError.classList.add("visible");
    passwordInput.classList.add("input-error");
    passwordInput.setAttribute("aria-invalid", "true");
    isValid = false;
  } else if (
    passwordInput.value.length < 6 ||
    !/\d/.test(passwordInput.value)
  ) {
    passwordError.textContent =
      "! Password must be 6+ characters and include a number";
    passwordError.classList.add("visible");
    passwordInput.classList.add("input-error");
    passwordInput.setAttribute("aria-invalid", "true");
    isValid = false;
  } else {
    passwordError.textContent = "";
    passwordError.classList.remove("visible");
    passwordInput.classList.remove("input-error");
    passwordInput.setAttribute("aria-invalid", "false");
  }

  // Check confirmation password
  if (confirmInput.value === "") {
    confirmError.textContent = "! Confirm your password";
    confirmError.classList.add("visible");
    confirmInput.classList.add("input-error");
    confirmInput.setAttribute("aria-invalid", "true");
    isValid = false;
  } else if (confirmInput.value !== passwordInput.value) {
    confirmError.textContent = "! Passwords do not match";
    confirmError.classList.add("visible");
    confirmInput.classList.add("input-error");
    confirmInput.setAttribute("aria-invalid", "true");
    isValid = false;
  } else {
    confirmError.textContent = "";
    confirmError.classList.remove("visible");
    confirmInput.classList.remove("input-error");
    confirmInput.setAttribute("aria-invalid", "false");
  }

  return isValid;
}

// Check password hint while typing
function checkPasswordHint() {
  if (
    passwordInput.value.length >= 6 &&
    /\d/.test(passwordInput.value)
  ) {
    passwordHint.textContent =
      "✓ Password must be 6+ characters and include a number";
  } else {
    passwordHint.textContent =
      "Password must be 6+ characters and include a number";
  }
}

// Etsuko's update: Check password requirement while typing.
passwordInput.addEventListener("input", checkPasswordHint);

// Submit form
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const registerOk = checkRegister();

  if (!registerOk) {
    return;
  }

  registerError.hidden = true;
  registerMessage.hidden = false;
  registerMessage.textContent =
    "Demo account details checked. You can now log in.";

  // Demo only - account details are not saved.
  // Password is never stored or logged.

  window.location.href = "#account-created.html";
});
