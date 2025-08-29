'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');
const navLink = document.querySelectorAll('.nav__link');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/*
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We used cookies for improved functionality and analytics. <button class = "btn btn--close--cookie">Got it</button>`;
header.append(message);

document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function (e) {
    e.preventDefault();
    message.remove();
  });

message.style.backgroundColor = "#37383d";
message.style.width = "120%";

message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

//Attributes*/

///////////////////////////////////////
// Smooth scrolling
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //selecting only links
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
//operation tab
const operationTab = document.querySelectorAll('.operations__tab');
const operationTabContainer = document.querySelector(
  '.operations__tab-container'
);
const operationContent = document.querySelectorAll('.operations__content');

console.log(operationTab);

operationTabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  //remove active classes
  operationContent.forEach(con =>
    con.classList.remove('operations__content--active')
  );
  operationTab.forEach(tab => tab.classList.remove('operations__tab--active'));
  //add active class to clicked tab
  clicked.classList.add('operations__tab--active');

  const data = clicked.dataset.tab;
  console.log(document.querySelector(`.operations__content--${data}`));
  document
    .querySelector(`.operations__content--${data}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
//Nav fade animation
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(function(li){
      if(li !== link)
        li.style.opacity = 0.5
    })
    logo.style.opacity = 0.5;
  };
});

nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(function(li){
      if(li !== link)
        li.style.opacity = 1
    })
    logo.style.opacity = 1;
  };
})

///////////////////////////////////////
//learning

/*
const h1 = document.querySelector("h1")
h1.addEventListener("mouseaway", function(){
  alert("hola")
})

const hoverNav = function(e){
  e.preventDefault();
  document.querySelector(".nav__links").style.color ="grey";
  
}

document.querySelector(".nav__links").addEventListener("mouseover", hoverNav)
document.querySelector(".nav__links").endEventListener("mouseover", hoverNav)*/
