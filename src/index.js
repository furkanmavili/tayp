import word from "./words";
console.log(word.mostCommon[2]);
const keyMaps = {
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  " ": 32,
};
let wordArea = document.querySelector(".words");

let words = "";
let swords = [];
let alleters;
draw();
let current = 0;
let wrong = 0;
alleters[current].classList.add("cursor");
window.addEventListener("click", isFocused);

// curtime end finTime for calculate wpm speed
let curTime;
let finTime;

let activate = document.querySelector(".activate");
// checks wordArea is focused or not, if so start keyboard event.
function isFocused(e) {
  if (Array.from(e.target.classList).includes("words")) {
    curTime = "";
    finTime = "";
    activate.style.display = "none";
    wordArea.classList.remove("words-off");
    curTime = new Date();
    show();
    window.addEventListener("keyup", start);
  } else {
    curTime = "";
    finTime = "";
    current = 0;
    wrong = 0;
    activate.style.display = "block";
    wordArea.classList.add("words-off");
    reset();
    window.removeEventListener("keyup", start);
  }
}

// compares e.keyCode with expected letter
function start(e) {
  console.log(e.keyCode);
  if (keyMaps[words.charAt(current)] == e.keyCode) {
    alleters[current].classList.remove("cursor");
    alleters[current].classList.add("correct");
    current++;
    if (current == words.length) {
      finTime = new Date();
      alert(`You have finished with ${wrong} mistakes`);
      clear();
      calculate();
      draw();
      window.removeEventListener("keyup", start);
    }
    alleters[current].classList.add("cursor");
  } else {
    alleters[current].classList.add("wrong");
    wrong++;
  }
}

function generate() {
  swords = [];
  for (let i = 0; i < 20; i++) {
    let random = Math.round(Math.random() * 999);
    swords.push(word.mostCommon[random]);
    swords.push(" ");
  }
  words = swords.join("");
  console.log(words);
}

function draw() {
  generate();
  console.log(words);
  console.log(swords);
  swords.forEach((e) => {
    for (let i = 0; i < e.length; i++) {
      let span = document.createElement("span");
      span.classList.add("letter");
      if (e[i].length === 1 && e[i].match(/[a-z]/i)) {
        span.textContent = e[i];
      } else {
        span.innerHTML = "␣";
        span.classList.add("space");
      }
      wordArea.appendChild(span);
    }
  });
  alleters = document.querySelectorAll(".letter");
}

// when typing is end, clear the screen
function clear() {
  current = 0;
  wrong = 0;
  while (wordArea.firstChild) {
    wordArea.lastChild.remove();
  }
}
// if wordArea focused, opacity = 1
function show() {
  alleters.forEach((el) => {
    el.style.opacity = "1";
  });
}
// if wordArea not focused, opacity = 0.5
function reset() {
  alleters.forEach((el) => {
    el.style.opacity = "0.5";
  });
}
// calculates wpm speed. words/min
function calculate() {
  console.log(curTime);
  console.log(finTime);
  let diff = finTime.getTime() - curTime.getTime();
  let min = diff / 1000 / 60;
  const wpm = words.split(" ").length / min;
  console.log(`your typing speed is ${wpm} wpm`);
}
