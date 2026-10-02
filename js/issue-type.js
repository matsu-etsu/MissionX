// Luka's update: Radio buttons keep Etsuko's selected look while making
// issue choices work with a keyboard and screen reader.

// Etsuko's update: localStorage to sessionStorage
const issueForm = document.querySelector("#issue-form");
const issueError = document.querySelector("#issue-error");
const savedIssue = sessionStorage.getItem("fixitIssue");
const choices = document.querySelectorAll('input[name="issue"]');

function updateSelectedIssues() {
  choices.forEach(function (choice) {
    choice.closest(".issue").classList.toggle("selected", choice.checked);
  });
}

choices.forEach(function (choice) {
  choice.addEventListener("change", updateSelectedIssues);
});

if (savedIssue) {
  choices.forEach(function (choice) {
    if (choice.value === savedIssue) {
      choice.checked = true;
    }
  });
}
updateSelectedIssues();

// Luka's update: The search bar now narrows the visible issue choices,
// so it helps with the task instead of being decoration.
const issueSearch = document.querySelector("#search-input");
document.querySelector(".search-form").addEventListener("submit", function (event) {
  event.preventDefault();
});
issueSearch.addEventListener("input", function () {
  const searchText = issueSearch.value.toLowerCase();
  const rows = document.querySelectorAll(".issue");
  rows.forEach(function (row) {
    row.hidden = !row.textContent.toLowerCase().includes(searchText);
  });
});

issueForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const selected = document.querySelector('input[name="issue"]:checked');

if (!selected) {
  issueError.classList.add("visible");
  return;
}

issueError.classList.remove("visible");

  issueError.hidden = true;
  sessionStorage.setItem("fixitIssue", selected.value);
  window.location.href = "details.html";
});
