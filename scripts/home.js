/*
Feature: Slideshow
Feature to slide sideways by pressing a button on the banner
*/

const prevButton = document.querySelector(".slideshow__button--prev");
const nextButton = document.querySelector(".slideshow__button--next");
const slideshowTextH4 = document.querySelectorAll(".slideshow__image h4");
const slideshowTextP = document.querySelectorAll(".slideshow__image p");
const slideshowImage = document.getElementsByClassName("slideshow__image");
const slideshowDot = document.getElementsByClassName("slideshow__dot");

let leftTrue = true,
  rightTrue = false;
let leftIndex = slideshowImage.length - 1,
  rightIndex = 1;
let timer;
let currentIndex = 0;

slideMain();

function slideMain() {
  slideTimer();
  slideClear();
  slideCalc();
  slideLeftRight(leftIndex, rightIndex);
  slideOutput(currentIndex);
}

prevButton.addEventListener("click", () => {
  buttonDisabled();
  currentIndex -= 1;
  leftTrue = true;
  rightTrue = false;

  leftIndex = currentIndex - 1;
  rightIndex = currentIndex + 1;
  slideMain();
});

nextButton.addEventListener("click", () => {
  buttonDisabled();
  currentIndex += 1;
  rightTrue = true;
  leftTrue = false;

  leftIndex = currentIndex - 1;
  rightIndex = currentIndex + 1;
  slideMain();
});

// Slide function with left or right button
function slideLeftRight(l, r) {
  if (l < 0) {
    l = slideshowImage.length - 1;
  }
  if (r > slideshowImage.length - 1) {
    r = 0;
  }

  if (leftTrue) {
    slideshowImage[r].style.zIndex = "3";
  }
  if (rightTrue) {
    slideshowImage[l].style.zIndex = "3";
  }
  slideshowImage[currentIndex].style.zIndex = "4";
}

// Initialize each class name and properties
function slideClear() {
  for (let i = 0; i < slideshowImage.length; i++) {
    slideshowTextH4[i].classList.remove("slideshow__text--animation-0");
    slideshowTextP[i].classList.remove("slideshow__text--animation-1");
    slideshowDot[i].classList.remove("slideshow__dot--active");

    slideshowImage[i].style.zIndex = "1";
    slideshowImage[i].style.left = "0%";
  }
}

// Calculate when the slide reaches the end and link to the next slide
function slideCalc() {
  if (currentIndex < 0) {
    currentIndex = slideshowImage.length - 1;
  }
  if (currentIndex > slideshowImage.length - 1) {
    currentIndex = 0;
  }
}

// Set the position value of the selected element to display on the screen
function slideOutput(currentIndex) {
  for (let i = 0; i < slideshowImage.length; i++) {
    if (currentIndex < i) {
      slideshowImage[i].style.left = "100%";
      if (currentIndex == 0) {
        slideshowImage[slideshowImage.length - 1].style.left = "-100%";
      }
    } else if (currentIndex > i) {
      slideshowImage[i].style.left = "-100%";
      if (currentIndex == slideshowImage.length - 1) {
        slideshowImage[0].style.left = "100%";
      }
    }
  }

  slideshowTextH4[currentIndex].classList.add("slideshow__text--animation-0");
  slideshowTextP[currentIndex].classList.add("slideshow__text--animation-1");
  slideshowDot[currentIndex].classList.add("slideshow__dot--active");
}

// The dot is also given the ability to slide
for (let i = 0; i < slideshowDot.length; i++) {
  ((i) => {
    slideshowDot[i].onclick = () => {
      leftIndex = 0;
      rightIndex = 0;
      if (currentIndex < i) {
        rightTrue = true;
        leftTrue = false;
        leftIndex = currentIndex;
      } else if (currentIndex > i) {
        rightTrue = false;
        leftTrue = true;
        rightIndex = currentIndex;
      }
      currentIndex = i;
      buttonDisabled();
      slideMain();
    };
  })(i);
}

// Automatically slides over time.
function slideTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    buttonDisabled();

    currentIndex += 1;

    leftTrue = false;
    rightTrue = true;

    leftIndex = currentIndex - 1;
    rightIndex = currentIndex + 1;

    slideMain();
  }, 7000);
}

// Avoid consecutive clicks on buttons
function buttonDisabled() {
  for (let i = 0; i < slideshowDot.length; i++) {
    slideshowDot[i].disabled = true;
  }
  prevButton.disabled = true;
  nextButton.disabled = true;
  setTimeout(function () {
    prevButton.disabled = false;
    nextButton.disabled = false;
    for (let i = 0; i < slideshowDot.length; i++) {
      slideshowDot[i].disabled = false;
    }
  }, 1000);
}

/*
Feature: Scroll Event (Navbar and About)
Set the event function according to the Y scroll position
*/

const navbar = document.getElementById("navbar");
const navbarImg = document.querySelector("#navbar img");
const aboutImage = document.getElementsByClassName("about__image");
const aboutImageBox = document.getElementsByClassName("about__image-box");
const aboutText = document.getElementsByClassName("about__text");

window.addEventListener("scroll", function () {
  let docElem = document.documentElement;
  let scrollPos = docElem.scrollTop;

  // Navbar becomes sticky and follows the screen
  if (scrollPos > 20) {
    navbar.classList.add("nav--sticky");
  } else {
    navbar.classList.remove("nav--sticky");
  }

  // The picture in About moves in 3D with the mouse position
  let CalcPos = scrollPos * 0.015;
  let CalcPos2 = scrollPos * -0.015;

  if (scrollPos < 1500) {
    aboutImage[0].style.transform = `rotateY(20deg) rotateX(${CalcPos - 8}deg)`;
    aboutImage[1].style.transform = `rotateY(-10deg) rotateX(${
      CalcPos2 + 20
    }deg)`;
  }
});

// When user clicks on a photo in about section, set the toggle to hide the text and resize the photo
for (let i = 0; i < aboutImage.length; i++) {
  ((i) => {
    aboutImage[i].onclick = () => {
      aboutImageBox[i].classList.toggle("about__image-box--active");
      aboutText[i].classList.toggle("about__text--animation");
    };
  })(i);
}
