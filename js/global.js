// Luka's update: Etsuko already included a menu on some pages.
// One shared script now makes the same menu work everywhere.
const menuButton = document.querySelector(".menu-button");
const menuList = document.querySelector(".menu-list");
const menuClose = document.querySelector(".menu-close");

if (menuButton && menuList) {
  function closeMenu() {
    menuList.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.focus();
  }

  menuButton.addEventListener("click", function () {
    menuList.hidden = !menuList.hidden;
    menuButton.setAttribute("aria-expanded", String(!menuList.hidden));
    if (!menuList.hidden) {
      menuClose.focus();
    }
  });

  menuClose.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !menuList.hidden) {
      closeMenu();
    }
  });
}

// Etsuko's update: Close the menu when clicking outside of it
document.addEventListener("click", function (event) {
  if (
    !menuList.hidden &&
    !menuList.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    closeMenu();
  }
});