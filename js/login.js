// Error for login --------------------------------------------
const emailError = document.getElementById("email-error");
const emailInput = document.getElementById("login-email");
const passwordError = document.getElementById("password-error");
const passwordInput = document.getElementById("login-password");
const loginError = document.getElementById("login-error");

function checkLogin() {
  let isValid = true;

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
  //   Check Password Error
  if (passwordInput.value === "") {
    passwordError.textContent = "! Enter your password";
    passwordError.hidden = false;
    isValid = false;
  } else {
    passwordError.textContent = "";
    passwordError.hidden = true;
  }
  //   This is not for the MissionX
  //   Email or password is incorrect
  //   if (emailInput.value !== "" && passwordInput.value !== "") {
  //     loginError.textContent = "! Incorrect email or password";
  //     loginError.hidden = false;
  //   }
  return isValid;
}

const loginButton = document.querySelector(".login-button");
const loginSuccess = document.querySelector(".login-success-bar");
loginButton.addEventListener("submit", () => {
  const loginOk = checkLogin();
  if (loginOk) {
    loginSuccess.style.visibility = "visible";
    loginButton.textContent = "Logged in";
    loginButton.classList.add("logged-in-button");
    // next page
    setTimeout(() => {
      window.location.href = "history.html";
    }, 1500);

    // Get data
    const data = {
      Email: emailInput.value,
      Password: passwordInput.value,
    };
    console.log(data);
  }
});
