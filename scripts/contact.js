const navbar = document.getElementById('navbar');
const navbarImg = document.querySelector('#navbar img');

window.addEventListener('scroll', () => {

    let docElem = document.documentElement;
    let scrollPos = docElem.scrollTop;

    if (scrollPos > 20) {
        navbarImg.style.width = '4rem';
    } else {
        navbarImg.style.width = '5rem';
    }
});

/*
Feature: Email
When a user writes an email, it sends an email to the developer
*/

const emailSuccess = document.getElementsByClassName("success");
const emailError = document.getElementsByClassName("error");
const emailForm = document.getElementById('email__form');
const emailLoading = document.getElementsByClassName('loading');
const emailConfirmBtn = document.getElementById('confirm');

// Reset all status modals
emailConfirmBtn.onclick = function() {
    emailSuccess[0].classList.remove("status--display");
    emailError[0].classList.remove("status--display");
    emailLoading[0].classList.remove("status--display");
}

// Send the user's values to an email
function sendMail() {
    emailLoading[0].classList.add("status--display");
    // get values
    var tempParams = {
        from_name: document.getElementById("firstName").value,
        to_name: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };
    // send the email
    emailjs.send('service_knwby3s', 'template_p2qmm7d', tempParams)
        .then(function(res) {
            // When sending email success
            if (res.status) {
                // display Success modal
                emailLoading[0].classList.remove("status--display");
                emailSuccess[0].classList.add("status--display");
                // close the notification after 3 sec
                setTimeout(function() {
                    emailSuccess[0].classList.remove('status--display');
                }, 3000);
                emailConfirmBtn.disabled = true;
                emailForm.reset();
            }
            // when sending email got error
            else {
                // display Error modal
                emailLoading[0].classList.remove("status--display");
                emailError[0].classList.add("status--display");
                setTimeout(function() {
                    emailError[0].classList.remove('status--display');
                }, 3000);
            }
        });
}

// Make sure a user has completed the required lists before sending the email

let inputs = document.querySelectorAll('#email__form input');
let texts = document.querySelector('#email__form textarea');

emailConfirmBtn.disabled = true;

emailForm.addEventListener('input', () => {
    let isValid = false;
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].matches(':invalid')) {
            isValid = true;
            break;
        }
    }
    if (texts.matches(':invalid')) {
        isValid = true;
    }
    emailConfirmBtn.disabled = isValid;
})

/*
Feature: Date Checker
Adding a function to check if the store is open with a check mark
*/

const checkMark = document.getElementsByClassName('check-mark');

weekdayCalculate();

function weekdayCalculate() {
    let d = new Date();
    let n = d.getDay();
    if (n == 0) {
        checkMark[2].style.display = 'inline-block';
    } else if (n > 0 && n < 6) {
        checkMark[0].style.display = 'inline-block';
    } else if (n == 6) {
        checkMark[1].style.display = 'inline-block';
    }

}