// Luka's update: Show the actual code created at submission instead of
// the same Figma placeholder on every report.
const reference = localStorage.getItem("fixitReference");
const referenceText = document.querySelector("#reference-number");
const receiptMessage = document.querySelector("#receipt-message");

if (reference) {
  referenceText.textContent = reference;
} else {
  referenceText.textContent = "No report submitted yet";
  receiptMessage.textContent = "Complete a report to get a reference number.";
}
