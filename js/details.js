// Luka's update: Three photo spaces now stay the same size. I used the
// simple input, click and DOM ideas from class instead of a preview API.
const detailsForm = document.querySelector("#details-form");
const description = document.querySelector("#description");
const counter = document.querySelector("#character-count");
const detailsError = document.querySelector("#details-error");
const photoInput = document.querySelector("#photo-input");
const cameraInput = document.querySelector("#camera-input");
const photoStatus = document.querySelector("#photo-status");
const photoSlots = document.querySelectorAll(".photo-slot");
const selectedPhotos = [];

description.value = localStorage.getItem("fixitDescription") || "";
counter.textContent = description.value.length + " / 500 characters";

description.addEventListener("input", function () {
  counter.textContent = description.value.length + " / 500 characters";
  localStorage.setItem("fixitDescription", description.value);
});

function showPhotos() {
  photoSlots.forEach(function (slot, index) {
    const name = slot.querySelector(".photo-name");
    const remove = slot.querySelector("button");
    const hasPhoto = Boolean(selectedPhotos[index]);

    name.textContent = hasPhoto ? selectedPhotos[index] : "";
    name.hidden = !hasPhoto;
    remove.hidden = !hasPhoto;
  });
}

function addPhotos(files) {
  if (selectedPhotos.length + files.length > 3) {
    photoStatus.textContent = "Please choose no more than three photos.";
    photoStatus.className = "error-message";
    return;
  }

  for (let i = 0; i < files.length; i++) {
    if (files[i].size > 3000000 ||
        (files[i].type !== "image/jpeg" && files[i].type !== "image/png")) {
      photoStatus.textContent = "Please use JPG or PNG files under 3 MB.";
      photoStatus.className = "error-message";
      return;
    }
  }

  for (let i = 0; i < files.length; i++) {
    selectedPhotos.push(files[i].name);
  }

  showPhotos();
  photoStatus.textContent = selectedPhotos.length + " of 3 photos selected. This is a demo; files are not sent.";
  photoStatus.className = "help-text";
}

photoInput.addEventListener("change", function () {
  addPhotos(photoInput.files);
  photoInput.value = "";
});

cameraInput.addEventListener("change", function () {
  addPhotos(cameraInput.files);
  cameraInput.value = "";
});

photoSlots.forEach(function (slot, index) {
  slot.querySelector("button").addEventListener("click", function () {
    selectedPhotos.splice(index, 1);
    showPhotos();
    photoStatus.textContent = selectedPhotos.length + " of 3 photos selected.";
    photoStatus.className = "help-text";
  });
});

detailsForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (description.value.trim() === "") {
    detailsError.hidden = false;
    description.focus();
    return;
  }

  detailsError.hidden = true;
  localStorage.setItem("fixitDescription", description.value.trim());
  window.location.href = "location.html";
});
