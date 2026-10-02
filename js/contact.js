// Luka's update: Choosing anonymous now really hides the fields, as in
// Etsuko's feedback on the two contact states.
const contactForm = document.querySelector("#contact-form");
const contactFields = document.querySelector("#contact-fields");
const emailError = document.querySelector("#email-error");
const contactChoices = document.querySelectorAll(
  'input[name="contact-choice"]',
);
const contactEmail = document.querySelector("#contact-email");
const contactInputs = contactFields.querySelectorAll("input");
const stepsError = document.querySelector("#steps-error");

function showContactFields() {
  const anonymous = document.querySelector("#anonymous").checked;
  contactFields.hidden = anonymous;
  contactInputs.forEach(function (input) {
    input.disabled = anonymous;
  });
  contactEmail.required = !anonymous;
  contactChoices.forEach(function (choice) {
    choice
      .closest(".contact-choice")
      .classList.toggle("selected", choice.checked);
  });
}

contactChoices.forEach(function (choice) {
  choice.addEventListener("change", showContactFields);
});

showContactFields();

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const anonymous = document.querySelector("#anonymous").checked;

  //  Error message for email field if not anonymous and email is empty
  if (!anonymous && contactEmail.value.trim() === "") {
    emailError.textContent = "Please enter your email address.";
    emailError.classList.add("visible");
    contactEmail.classList.add("input-error");
    contactEmail.setAttribute("aria-invalid", "true");
    contactEmail.focus();
    return;
  }
  if (!anonymous && !contactEmail.validity.valid) {
  emailError.textContent =
    "Please enter a valid email address.";
  emailError.classList.add("visible");
  contactEmail.classList.add("input-error");
  contactEmail.setAttribute("aria-invalid", "true");
  contactEmail.focus();
  return;
}

  emailError.classList.remove("visible");
  contactEmail.classList.remove("input-error");
  contactEmail.setAttribute("aria-invalid", "false");

  const issue = sessionStorage.getItem("fixitIssue");
  const location = sessionStorage.getItem("fixitLocation");

  // Error message if the user tries to submit the contact form without completing the earlier steps
  if (!issue || !location) {
    stepsError.textContent = "Please complete the earlier report steps first.";
    stepsError.classList.add("visible");
    return;
  }

  // Luka's update: The reference makes the confirmation useful. Only the
  // issue and reference enter local storage; contact details stay out.

  // Etsuko's update: I change some of localStorage to sessionStorage
  const reference = "FIX" + Date.now().toString().slice(-6);
  const report = {
    reference: reference,
    issue: issue,
    description: sessionStorage.getItem("fixitDescription"),
    location: location,
  };
  localStorage.setItem("fixitReport", JSON.stringify(report));
  localStorage.setItem("fixitReference", reference);
  localStorage.setItem("fixitLastIssue", issue);
  sessionStorage.removeItem("fixitIssue");
  sessionStorage.removeItem("fixitDescription");
  sessionStorage.removeItem("fixitLocation");
  window.location.href = "confirmation.html";
});
