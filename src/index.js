import word from "./words";
import keyMaps from "./keyMaps";
let wordArea = document.querySelector(".words");

let words = "";
let swords = [];
let alleters;
draw();

let current = 0;
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
    alleters[current].classList.add("cursor");
    curTime = new Date();
    show();
    window.addEventListener("keypress", start);
  } else {
    curTime = "";
    finTime = "";
    current = 0;
    activate.style.display = "block";
    wordArea.classList.add("words-off");
    reset();
    window.removeEventListener("keypress", start);
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
      calculate();
      clear();
      draw();
      reset();
      window.removeEventListener("keyup", start);
    }
    alleters[current].classList.add("cursor");
  } else {
    alleters[current].classList.add("wrong");
  }
}

function generate() {
  swords = [];
  for (let i = 0; i < 5; i++) {
    let random = Math.round(Math.random() * 999);
    swords.push(word.mostCommon[random]);
    swords.push(" ");
  }
  swords.pop();
  words = swords.join("");
  console.log(words);
}
// loop through swords array and creates span elements to wordArea
function draw() {
  generate();
  console.log(swords);
  swords.forEach((e) => {
    let wrapper = document.createElement("div");
    for (let i = 0; i < e.length; i++) {
      let span = document.createElement("span");
      span.classList.add("letter");
      if (e[i].match(/[a-z]/i)) {
        span.textContent = e[i];
        wrapper.appendChild(span);
      } else {
        span.innerHTML = "␣";
        span.classList.add("space");
        wrapper.appendChild(span);
      }
    }
    wordArea.appendChild(wrapper);
  });
  alleters = document.querySelectorAll(".letter");
}

// when typing is end, clear the screen
function clear() {
  current = 0;
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
    el.classList.remove("correct", "wrong", "cursor");
  });
}

const speed = document.querySelector("#speed");
const errors = document.querySelector("#errors");
// calculates wpm speed. words/min
function calculate() {
  let diff = finTime.getTime() - curTime.getTime();
  let min = diff / 1000 / 60;
  let wpm = words.split(" ").length / min;
  wpm = Math.floor(wpm);
  const wrong = totalError();
  console.log(wrong);
  speed.innerHTML = `Speed: ${wpm}`;
  errors.innerHTML = `Errors: ${wrong}`;
}

// loop through all letters and count "wrong" class in classList
function totalError() {
  let error = 0;
  alleters.forEach((el) => {
    if ([...el.classList].includes("wrong")) {
      error++;
    }
  });
  return error;
}
