// DOM
const paginationBtn = document.querySelectorAll('.pagination--btn');
const header = document.getElementById('header');
const hamburgerIcon = document.getElementById('hamburger-menu');
const hamburgerMenuContent = document.getElementById('menu--content');

// hamburger menu toggle
hamburgerIcon.addEventListener('click', () => {
  hamburgerMenuContent.classList.toggle('menu--content-showed');
  hamburgerIcon.classList.toggle('active');
  hamburgerMenuContent.style.opacity = "1";
})

// Slider
paginationBtn.forEach(item => {
    item.addEventListener('click', (e) => {
      console.log(e.target.className);
      if (e.target.className.includes('pagination--indexOne')) {
        header.style.backgroundImage = "url('https://max-themes.net/demos/greennature/upload/slider-1.jpg')";
        header.style.transition = "background 1s ease-in-out"

      } else if (e.target.className.includes('pagination--indexTwo')) {
        header.style.backgroundImage = "url('https://max-themes.net/demos/greennature/upload/slider-2.jpg')";
              header.style.transition = "background 1s ease-in-out"

      } else if (e.target.className.includes('pagination--indexThree')) {
        header.style.backgroundImage = "url('https://max-themes.net/demos/greennature/upload/slider-3.jpg')";
        header.style.transition = "background 1s ease-in-out"

      }
    })
});


// Function for counter animation
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Counter effect only once
let called = false;
function startCounterEffect () {
  let scroll = this.scrollY;
    if (called === false) {
      if (Number.parseFloat(scroll).toFixed(0) >= Number.parseFloat(2636) ) {
        const acres = document.getElementById("acres");
        animateValue(acres, 0, 1000, 5000);

        const scientists = document.getElementById("scientists");
        animateValue(scientists, 0, 700, 5000);

        const recycling = document.getElementById("recycling");
        animateValue(recycling, 0, 99, 5000);

        const solar = document.getElementById("solar");
        animateValue(solar, 0, 2000, 5000);

        called = true;

      }
    }
}

document.addEventListener('scroll', () => {
  startCounterEffect();
})
