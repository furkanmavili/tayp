import word from "./words";
import keyMaps from "./keyMaps";
import MicroModal from "micromodal";
MicroModal.init();
let wordArea = document.querySelector(".words");
let words = "";
let swords = [];
let alleters;
draw();

let current = 0;
alleters[current].classList.add("cursor");

window.addEventListener("click", isFocused);
document.onload = function () {
  wordArea.focus();
};
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
    show();
    window.addEventListener("keypress", start);
  } else {
    curTime = "";
    finTime = "";
    current = 0;
    activate.style.display = "block";
    wordArea.classList.add("words-off");
    reset(true);
    window.removeEventListener("keypress", start);
  }
}

// compares e.keyCode with expected letter
function start(e) {
  if (current == 0) {
    curTime = new Date();
  }
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
    }
    alleters[current].classList.add("cursor");
  } else {
    alleters[current].classList.add("wrong");
  }
}

// generates word list from mostcommon words
function generate() {
  swords = [];
  for (let i = 0; i < 20; i++) {
    let random = Math.round(Math.random() * 999);
    swords.push(word.mostCommon[random]);
    swords.push(" ");
  }
  swords.pop();
  words = swords.join("");
}
// loop through swords array and appends span elements to wordArea
function draw() {
  generate();
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

// when typing is end, remove all letters
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
function reset(op) {
  alleters.forEach((el) => {
    if (op) {
      el.style.opacity = "0.5";
    }
    el.classList.remove("correct", "wrong", "cursor");
  });
}

const speed = document.querySelector("#speed");
const errors = document.querySelector("#errors");
const acc = document.querySelector("#accuracy");
// calculates wpm speed. words/min
function calculate() {
  let diff = finTime.getTime() - curTime.getTime();
  let min = diff / 1000 / 60;
  const wrong = totalError();
  let wpm = (words.length / 5 - wrong) / min;
  wpm = Math.floor(wpm);
  const ac = accuracy();
  const stat = {
    speed: wpm,
    error: wrong,
    accuracy: ac,
  };
  let stats = [];
  const getItems = localStorage.getItem("stats");
  if (getItems) {
    stats = [...JSON.parse(getItems), stat];
  } else {
    stats.push(stat);
  }

  localStorage.setItem("stats", JSON.stringify(stats));
  speed.innerHTML = `Speed: ${wpm}`;
  errors.innerHTML = `Errors: ${wrong}`;
  acc.innerHTML = `Accuracy: ${ac}%`;
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

// calulate accuracy. (correct - wrong) * 100 / total characters
function accuracy() {
  console.log("new");
  let correct = 0;
  alleters.forEach((el) => {
    if (![...el.classList].includes("wrong")) {
      correct++;
    }
  });
  const percentage = (100 * correct) / alleters.length;
  console.log("correct:", correct, "total:", alleters.length);
  return Math.floor(percentage);
}

// light/dark mode
let currentMode = "dark";
function changeMode() {
  console.log(("mode:", currentMode));
  if (currentMode == "dark") {
    document.documentElement.style.setProperty(`--dark`, "#f5f5f5");
    document.documentElement.style.setProperty(`--light`, "#313131");
    document.documentElement.style.setProperty(`--accent-color`, "#d8737a");
    currentMode = "light";
  } else {
    document.documentElement.style.setProperty(`--dark`, "#313131");
    document.documentElement.style.setProperty(`--light`, "#f5f5f5");
    document.documentElement.style.setProperty(`--accent-color`, "#ca3e47");
    currentMode = "dark";
  }
}
const mode = document.querySelector(".fa-adjust");
mode.addEventListener("click", changeMode);

// Expand word area

const scoreArea = document.querySelector(".score");
const nav = document.querySelector("nav");
function resize(e) {
  if ([...e.target.classList].includes("fa-expand-alt")) {
    if ([...wordArea.classList].includes("expand-words")) {
      wordArea.classList.remove("expand-words");
      scoreArea.style.display = "block";
      removeExpandIcon();
    } else {
      wordArea.classList.add("expand-words");
      scoreArea.style.display = "none";
      createExpandIcon();
    }
  }
}
function createExpandIcon() {
  console.log("hi");

  const i = document.createElement("i");
  i.classList.add("fas");
  i.classList.add("fa-expand-alt");
  nav.appendChild(i);
}
function removeExpandIcon() {
  const ic = document.querySelector("nav .fa-expand-alt");
  ic.remove();
}
nav.addEventListener("click", resize);
scoreArea.addEventListener("click", resize);
