// Luka's update: A submit event belongs to the form, not the button.
// This is a front-end demo, so it never claims to verify real credentials.
const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!loginForm.reportValidity()) {
    return;
  }
  loginMessage.hidden = false;
  loginMessage.textContent = "Demo sign-in complete. Opening My reports...";
  window.setTimeout(function () {
    window.location.href = "history.html";
  }, 800);
});
