/*
Feature: Side Navigation
Set the shortcut function on the side to move to the selected section
*/

const navbar = document.getElementById('navbar');
const navbarImg = document.querySelector('#navbar img');
const sideNav = document.querySelector('.side-nav');
const sideNavClose = document.querySelector('.side-nav__close');
let sideNavTimer;

window.addEventListener('scroll', () => {
    let docElem = document.documentElement;
    let scrollPos = docElem.scrollTop;

    if (scrollPos > 20) {
        navbarImg.style.width = '4rem';
    } else {
        navbarImg.style.width = '5rem';
    }

    // Activate the side nav whenever the user scrolls
    sideNav.classList.add('side-nav--active');

    // Reset all time settings
    clearInterval(sideNavTimer);

    // If the scroll value does not change after scrolling, it automatically disappears after 3 seconds
    sideNavTimer = setInterval(() => { sideNav.classList.remove('side-nav--active') }, 3000);
});

sideNavClose.onclick = () => {
    clearInterval(sideNavTimer);
    sideNav.classList.remove('side-nav--active');
}

sideNav.addEventListener('mouseover', () => {
    clearInterval(sideNavTimer);
});

sideNav.addEventListener('mouseout', () => {
    clearInterval(sideNavTimer);
    sideNavTimer = setInterval(() => { sideNav.classList.remove('side-nav--active') }, 3000);
});