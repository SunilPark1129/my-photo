const navbar = document.getElementById("navbar");
const navbarImg = document.querySelector("#navbar img");

window.addEventListener("scroll", () => {
  let docElem = document.documentElement;
  let scrollPos = docElem.scrollTop;

  if (scrollPos > 20) {
    navbarImg.style.width = "4rem";
  } else {
    navbarImg.style.width = "5rem";
  }
});

/*
Feature: Email
*/

const emailForm = document.getElementById("email__form");
const emailConfirmBtn = document.getElementById("confirm");

// Make sure a user has completed the required lists before sending the email

let inputs = document.querySelectorAll("#email__form input");
let texts = document.querySelector("#email__form textarea");

emailConfirmBtn.disabled = true;

emailForm.addEventListener("input", () => {
  let isValid = false;
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].matches(":invalid")) {
      isValid = true;
      break;
    }
  }
  if (texts.matches(":invalid")) {
    isValid = true;
  }
  emailConfirmBtn.disabled = isValid;
});

/*
Feature: Date Checker
Adding a function to check if the store is open with a check mark
*/

const checkMark = document.getElementsByClassName("check-mark");

weekdayCalculate();

function weekdayCalculate() {
  let d = new Date();
  let n = d.getDay();
  if (n == 0) {
    checkMark[2].style.display = "inline-block";
  } else if (n > 0 && n < 6) {
    checkMark[0].style.display = "inline-block";
  } else if (n == 6) {
    checkMark[1].style.display = "inline-block";
  }
}
