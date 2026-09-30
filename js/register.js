// Error for register --------------------------------------------
const nameError = document.getElementById("name-error");
const nameInput = document.getElementById("register-name");
const emailError = document.getElementById("email-error");
const emailInput = document.getElementById("register-email");
const phoneError = document.getElementById("phone-error");
const phoneInput = document.getElementById("register-phone");
const passwordHint = document.getElementById("password-hint");
const passwordError = document.getElementById("password-error");
const passwordInput = document.getElementById("register-password");
const confirmError = document.getElementById("confirm-error");
const confirmInput = document.getElementById("register-confirm");

function checkRegister() {
  let isValid = true;

  //   Check Name Error
  if (nameInput.value === "") {
    nameError.textContent = "! Enter your name";
    nameError.hidden = false;
    isValid = false;
  } else {
    nameError.textContent = "";
    nameError.hidden = true;
  }
  // Check Email Error
  if (emailInput.value === "") {
    emailError.textContent = "! Enter your email address";
    emailError.hidden = false;
    isValid = false;
  } else if (!emailInput.validity.valid) {
    emailError.textContent = "! Enter a valid email address";
    emailError.hidden = false;
    isValid = false;
  } else {
    emailError.textContent = "";
    emailError.hidden = true;
  }
  // Check Phone Error
  if (phoneInput.value === "") {
    phoneError.textContent = "! Enter your phone number";
    phoneError.hidden = false;
    isValid = false;
  } else if (!/\d/.test(phoneInput.value)) {
    phoneError.textContent = "! Enter a valid phone number";
    phoneError.hidden = false;
    isValid = false;
  } else {
    phoneError.textContent = "";
    phoneError.hidden = true;
  }
  //   Check Confirmation password Error
  if (confirmInput.value === "") {
    confirmError.textContent = "! Confirm your password";
    confirmError.hidden = false;
    isValid = false;
  } else if (confirmInput.value !== passwordInput.value) {
    confirmError.textContent = "! Passwords do not match";
    confirmError.hidden = false;
    isValid = false;
  } else {
    confirmError.textContent = "";
    confirmError.hidden = true;
  }
  return isValid;
}

//   Check Password Error
function checkPassword() {
  let isValid = true;

  if (passwordInput.value === "") {
    passwordError.textContent = "! Enter your password";
    passwordError.hidden = false;
    passwordHint.hidden = true;
    isValid = false;
    // if not 6 + character and include a number
  } else if (
    passwordInput.value.length < 6 ||
    !/\d/.test(passwordInput.value)
  ) {
    passwordError.textContent =
      "! Password must be 6+ characters and include a number";
    passwordError.hidden = false;
    passwordHint.hidden = true;
    isValid = false;
  } else {
    passwordError.textContent = "";
    passwordError.hidden = true;
    passwordHint.hidden = false;
    passwordHint.textContent =
      "✓ Password must be 6+ characters and include a number";
  }
  return isValid;
}

// When user click button or input, JS will check if it is error or not
const registerButton = document.querySelector(".register-button");
registerButton.addEventListener("click", () => {
  const registerOk = checkRegister();
  const passwordOk = checkPassword();

  if (registerOk && passwordOk) {
    // next page
    window.location.href = "account-created.html";

    // Get data
    const data = {
      Name: nameInput.value,
      Email: emailInput.value,
      Phone: phoneInput.value,
      Password: passwordInput.value,
    };
    console.log(data);
  }
});
passwordInput.addEventListener("input", checkPassword);
