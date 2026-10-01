// Luka's update: The map is Google Maps now. I kept this small: change
// map address, ask for GPS if needed, and check location before moving on.

const locationForm = document.querySelector("#location-form");
const address = document.querySelector("#address");
const locationError = document.querySelector("#location-error");
const mapStatus = document.querySelector("#map-status");
const liveMap = document.querySelector("#live-map");
const googleMapLink = document.querySelector("#google-map-link");
const findButton = document.querySelector("#find-button");
const locateButton = document.querySelector("#locate-button");

let checkedPlace = "";

function showPlace(place) {
  const search = encodeURIComponent(place);

  // Luka's update: The Google Maps URL opens the same place in a larger map.
  // does not need a JS map library.

  liveMap.src = "https://maps.google.com/maps?q=" + search + "&output=embed";
  googleMapLink.href =
    "https://www.google.com/maps/search/?api=1&query=" + search;
  checkedPlace = place;
  mapStatus.textContent = "Check the place on the map, then select Continue.";
  locationError.hidden = true;
}

address.value = localStorage.getItem("fixitLocation") || "";

if (address.value) {
  showPlace(address.value);
}

address.addEventListener("input", function () {
  checkedPlace = "";
  mapStatus.textContent = "Location changed. Select Find on map to check it.";
});

findButton.addEventListener("click", function () {
  const place = address.value.trim();

  if (!place) {
    locationError.textContent = "Enter an address or nearby landmark first.";
    locationError.hidden = false;
    address.focus();
    return;
  }

  showPlace(place);
});

// Luka's update:Geolocation API
locateButton.addEventListener("click", function () {
  if (!navigator.geolocation) {
    locationError.textContent =
      "Current location is unavailable. Enter a place instead.";
    locationError.hidden = false;
    return;
  }

  locateButton.disabled = true;
  mapStatus.textContent = "Finding your location...";

  navigator.geolocation.getCurrentPosition(
    function (position) {
      address.value =
        position.coords.latitude.toFixed(5) +
        ", " +
        position.coords.longitude.toFixed(5);
      showPlace(address.value);
      locateButton.disabled = false;
    },
    function () {
      locationError.textContent =
        "Location was unavailable. Enter a place instead.";
      locationError.hidden = false;
      mapStatus.textContent = "No new location selected.";
      locateButton.disabled = false;
    },
  );
});

locationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const place = address.value.trim();

  if (!place) {
    locationError.textContent = "Please add the issue location.";
    locationError.hidden = false;
    address.focus();
    return;
  }

  if (place !== checkedPlace) {
    showPlace(place);
    mapStatus.textContent =
      "Please check this location, then select Continue again.";
    return;
  }

  localStorage.setItem("fixitLocation", place);
  window.location.href = "contact.html";
});
