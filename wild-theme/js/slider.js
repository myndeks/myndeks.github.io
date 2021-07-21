// DOM
const paginationBtn = document.querySelectorAll('.pagination--btn');
const header = document.getElementById('header');
console.log(header);


paginationBtn.forEach(item => {
    item.addEventListener('click', (e) => {
      console.log(e.target.className);
      if (e.target.className.includes('pagination--indexOne')) {
        header.style.backgroundImage = "url('https://max-themes.net/demos/greennature/upload/slider-1.jpg')";
        header.style.transform ="translate3d(" + innerTranslate + "px, 0, 0)";
      } else if (e.target.className.includes('pagination--indexTwo')) {
        header.style.backgroundImage = "url('https://max-themes.net/demos/greennature/upload/slider-2.jpg')";
      } else if (e.target.className.includes('pagination--indexThree')) {
        header.style.backgroundImage = "url('https://max-themes.net/demos/greennature/upload/slider-3.jpg')";
      }
    })
});


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
const acres = document.getElementById("acres");
animateValue(acres, 0, 1000, 5000);

const scientists = document.getElementById("scientists");
animateValue(scientists, 0, 700, 5000);

const recycling = document.getElementById("recycling");
animateValue(recycling, 0, 99, 5000);

const solar = document.getElementById("solar");
animateValue(solar, 0, 2000, 5000);
