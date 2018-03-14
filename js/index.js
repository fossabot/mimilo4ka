var flowers = void 0;
var frequency = 200;

function startThisShit() {
  flowers = setInterval(function () {
    var flower = document.createElement('div');
    flower.classList.add('flower');
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.top = Math.random() * 100 + 'vh';
    flower.innerHTML = '🌸';
    document.body.appendChild(flower);
    flower.addEventListener('animationend', function () {
      flower.remove();
    });
  }, frequency);
}

function stopThisShit() {
  clearInterval(flowers);
}

var doc = document.body;
var btn = document.querySelector('.js-btn');
var range = document.querySelector('.js-range');

doc.addEventListener('keydown', function (e) {
  if (e.keyCode === 32 && e.repeat === false) {
    startThisShit();
  }
});
doc.addEventListener('keyup', function (e) {
  if (e.keyCode === 32) {
    stopThisShit();
  }
});
btn.addEventListener('mousedown', startThisShit);
btn.addEventListener('mouseup', stopThisShit);
range.addEventListener('change', function () {
  frequency = 1000 / range.value;
});