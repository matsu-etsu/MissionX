// Luka's update: A submit event belongs to the form, not the button.
// This is a front-end demo, so it never claims to verify real credentials.
//
// This is a front-end demo, so it does not verify real credentials.
//
// Etsuko's update: Restored the custom validation UI from the Figma design
// while keeping the team's accessibility improvements.

// Form and input elements
const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#login-email");
const passwordInput = document.querySelector("#login-password");

// Error messages
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const loginError = document.querySelector("#login-error");

// Login states
const loginButton = document.querySelector(".login-button");
const loginSuccess = document.querySelector(".login-success-bar");

// Check login form
function checkLogin() {
  let isValid = true;

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

  // Check password
  if (passwordInput.value === "") {
    passwordError.textContent = "! Enter your password";
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

  return isValid;
}

// Submit form
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const loginOk = checkLogin();

  if (!loginOk) {
    return;
  }

  // Demo loading state
  loginButton.textContent = "Loading...";
  loginButton.classList.add("loading-button");

  window.setTimeout(function () {
    loginSuccess.hidden = false;

    loginButton.textContent = "Logged in";
    loginButton.classList.remove("loading-button");
    loginButton.classList.add("logged-in-button");
  }, 800);

  // Redirect to My Reports
  window.setTimeout(function () {
    window.location.href = "history.html";
  }, 2300);

  // Demo data only - not sent to a server
  const data = {
    Email: emailInput.value,
    // Password:
  };

  console.log(data);
});

// note: setTimeout is used to simulate a loading state.
// console.log(data); for testing.
