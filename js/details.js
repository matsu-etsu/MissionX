// const photoError = document.querySelector(".photo-error");
// const addPhotosButton = document.querySelector(".add-photos");

// addPhotosButton.addEventListener("click", () => {
//     photoError.hidden = false;
//   photoError.classList.toggle("show");
// });

const photoError = document.querySelector(".photo-error");
const addPhotosButton = document.querySelector(".add-photos");

addPhotosButton.addEventListener("click", () => {
  photoError.hidden = false;
  photoError.classList.add("show");
});