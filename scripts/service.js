/*
Feature: Side Navigation
Set the shortcut function on the side to move to the selected section
*/

const navbar = document.getElementById("navbar");
const navbarImg = document.querySelector("#navbar img");
const sideNav = document.querySelector(".side-nav");
const sideNavClose = document.querySelector(".side-nav__close");
let sideNavTimer;

window.addEventListener("scroll", () => {
  let docElem = document.documentElement;
  let scrollPos = docElem.scrollTop;

  // Navbar becomes sticky and follows the screen
  if (scrollPos > 20) {
    navbar.classList.add("nav--sticky");
  } else {
    navbar.classList.remove("nav--sticky");
  }

  // Activate the side nav whenever the user scrolls
  sideNav.classList.add("side-nav--active");

  // Reset all time settings
  clearInterval(sideNavTimer);

  // If the scroll value does not change after scrolling, it automatically disappears after 3 seconds
  sideNavTimer = setInterval(() => {
    sideNav.classList.remove("side-nav--active");
  }, 3000);
});

sideNavClose.onclick = () => {
  clearInterval(sideNavTimer);
  sideNav.classList.remove("side-nav--active");
};

sideNav.addEventListener("mouseover", () => {
  clearInterval(sideNavTimer);
});

sideNav.addEventListener("mouseout", () => {
  clearInterval(sideNavTimer);
  sideNavTimer = setInterval(() => {
    sideNav.classList.remove("side-nav--active");
  }, 3000);
});

/*
Feature: Photo Editor (Final Edit Section)
Users can directly check what functions are provided by adding Photoshop functions to the photo
*/

const finalEditDots = document.getElementsByClassName("final-edit__dots");
const finalImageBox = document.querySelector(".final-edit__image-box");
const finalOverlap = document.querySelectorAll(".final-edit__image-box > div");
const finalImg = document.querySelector(".final-edit__image");
const finalButton = document.querySelector(".final-edit__button");
const finalSwitch1 = document.querySelector(".final-edit__switch__on");
const finalSwitch2 = document.querySelector(".final-edit__switch__off");

let previewDotIndex = 0,
  leftDotIndex = 0,
  rightDotIndex = 0,
  leftDot = 2,
  rightDot = 1;

mainDot(0);

// Function operated by pressing the color button
for (let i = 0; i < finalEditDots.length; i++) {
  ((i) => {
    finalEditDots[i].onclick = () => {
      removeAll();
      searchDot(i);
      zIndexDot(i);
      mainDot(i);
    };
  })(i);
}

// Reset all settings
function removeAll() {
  for (let i = 0; i < finalEditDots.length; i++) {
    finalOverlap[i].classList.remove("final-edit__image--fade");
  }
}

// Find the position of the button the user clicked and set which color would be left and right.
function searchDot(n) {
  leftDot = 2;
  rightDot = 1;
  if (n == 1) {
    leftDot = 0;
    rightDot = 2;
  }
  if (n == 2) {
    leftDot = 1;
    rightDot = 0;
  }
}

// Put the z-index to determine the color to be in front and the color to be moved to the back to display animation effect
function zIndexDot(n) {
  if (previewDotIndex < n) {
    leftDotIndex = 2;
    rightDotIndex = 1;
    if (previewDotIndex == 0 && n == 2) {
      leftDotIndex = 1;
      rightDotIndex = 2;
    }
  }
  if (previewDotIndex > n) {
    leftDotIndex = 1;
    rightDotIndex = 2;
    if (previewDotIndex == 2 && n == 0) {
      leftDotIndex = 2;
      rightDotIndex = 1;
    }
  }
  previewDotIndex = n;

  finalEditDots[leftDot].style.zIndex = leftDotIndex;
  finalEditDots[rightDot].style.zIndex = rightDotIndex;
}

// adds a transform to display 3d effect
function mainDot(n) {
  finalOverlap[n].classList.add("final-edit__image--fade");

  finalEditDots[n].style.zIndex = 5;

  finalEditDots[n].style.left = "50%";
  finalEditDots[n].style.transform = "translateX(-50%) scale(1.5)";

  finalEditDots[leftDot].style.left = "0%";
  finalEditDots[leftDot].style.transform = "none";

  finalEditDots[rightDot].style.left = "100%";
  finalEditDots[rightDot].style.transform = "translateX(-100%)";
}

// Operated when the filter button is pressed
finalButton.onclick = () => {
  finalImg.classList.toggle("final-edit__image--filter");
  finalSwitch1.classList.toggle("final-edit__switch--on");
  finalSwitch2.classList.toggle("final-edit__switch--off");
};

// Operated when the picture is pressed
finalImageBox.onclick = () => {
  for (let i = 0; i < finalOverlap.length; i++) {
    finalOverlap[i].classList.toggle("final-edit__image-zoom");
  }
};
