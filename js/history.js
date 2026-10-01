// Luka's update: Keep Etsuko's sample history, and show the latest demo
// report too so the confirmation number has somewhere to be found.
const latestReference = localStorage.getItem("fixitReference");
const latestIssue = localStorage.getItem("fixitLastIssue");
const savedReport = localStorage.getItem("fixitReport");
const latestRow = document.querySelector("#latest-row");

if (latestReference && latestIssue) {
  document.querySelector("#latest-issue").textContent = latestIssue;
  document.querySelector("#latest-reference").textContent = "#" + latestReference;
  latestRow.hidden = false;
}

if (savedReport) {
  const report = JSON.parse(savedReport);
  document.querySelector("#latest-location").textContent = report.location;
}

// Luka's update: The three tabs now filter the cards for real. The latest
// demo report appears under All until it has a proper progress status.
const filters = document.querySelectorAll(".filter-button");
const reports = document.querySelectorAll(".history-row");
const hasLatest = Boolean(latestReference && latestIssue);
let total = hasLatest ? 1 : 0;
let inProgress = 0;
let resolved = 0;

reports.forEach(function (report) {
  if (report.id !== "latest-row") {
    total++;
  }
  if (report.dataset.status === "in-progress") {
    inProgress++;
  }
  if (report.dataset.status === "resolved") {
    resolved++;
  }
});

document.querySelector("#all-count").textContent = total;
document.querySelector("#progress-count").textContent = inProgress;
document.querySelector("#resolved-count").textContent = resolved;

filters.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedFilter = button.dataset.filter;

    filters.forEach(function (filter) {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });

    reports.forEach(function (report) {
      if (report.id === "latest-row" && !hasLatest) {
        report.hidden = true;
      } else {
        report.hidden = selectedFilter !== "all" && report.dataset.status !== selectedFilter;
      }
    });
  });
});
