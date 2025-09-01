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

const navFade = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(function (li) {
      if (li !== link) li.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function (e) {
  navFade(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  navFade(e, 1);
});

///////////////////////////////////////
// scrolling and top view
// const initialValue = section1.getBoundingClientRect();
// console.log(initialValue);

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialValue.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

const displayNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const observeEl = new IntersectionObserver(displayNav, {
  root: null,
  threshold: 0,
  rootMargin: '-70px',
});
observeEl.observe(header);

///////////////////////////////////////
//Reveal content
const section = document.querySelector('.section');
const allSection = document.querySelectorAll('.section');

const showSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const observeSect = new IntersectionObserver(showSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (sect) {
  observeSect.observe(sect);
  sect.classList.add('section--hidden');
});

///////////////////////////////////////
//Lazy Loading
const imgFeature = document.querySelectorAll('img[data-src]');

const loadimg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Adding the loading function
  entry.target.src = entry.target.dataset.src;
  //in-order to listen to entry and load when its done displaying (to avoid network issue)
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyLoading = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgFeature.forEach(img => lazyLoading.observe(img));

///////////////////////////////////////
//slide functionality
const slide = document.querySelectorAll('.slide');
const btnRightSlide = document.querySelector('.slider__btn--right');
const btnLeftSlide = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');

let btnMove = 0;
const maxLength = slide.length;

//translating all the slide child component moving it from one point point to another
const movSlide = function (btnMove) {
  slide.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - btnMove)}%)`)
  );
};
movSlide(0);

const slideFunc = function () {
  if (btnMove === maxLength - 1) {
    btnMove = 0;
  } else {
    btnMove++;
  }
  movSlide(btnMove);
  activeSlide(btnMove)
};

const slideLeftFunc = function () {
  if (btnMove > 0) {
    btnMove--;
  } else {
    btnMove = 0;
  }

  movSlide(btnMove);
  activeSlide(btnMove)
};
//the dot slide
const dots = function () {
  slide.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot dots__dot--active" data-slide=${i}></button>`
    );
  });
};
dots();

const activeSlide = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(s => s.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide = "${slide}"]`).classList.add("dots__dot--active")
};
activeSlide(0);

//Event Listener
btnRightSlide.addEventListener('click', slideFunc);
btnLeftSlide.addEventListener('click', slideLeftFunc);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') slideFunc();
  if (e.key === 'ArrowLeft') slideLeftFunc();
});



dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    btnMove = Number(e.target.dataset.slide);
    movSlide(btnMove);
    activeSlide(btnMove);
  }
});

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

