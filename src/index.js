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
  for (let i = 0; i < 4; i++) {
    let random = Math.round(Math.random() * 999);
    swords.push(word.mostCommon[random]);
    swords.push(" ");
  }
  swords.pop();
  words = swords.join("");
}
// loop through swords array and creates span elements to wordArea
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
  localStorageCalc();
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

function localStorageCalc() {
  const items = JSON.parse(localStorage.getItem("stats"));

  let totalSpeed = 0;
  let totalError = 0;
  let totalAcc = 0;
  items.forEach((item) => {
    totalSpeed += item.speed;
    totalError += item.error;
    totalAcc += item.accuracy;
  });
  const speedAvg = Number(totalSpeed / items.length).toFixed(2);
  console.log("speed:", speedAvg);
  const errorAvg = Number(totalError / items.length).toFixed(2);
  console.log("error:", errorAvg);
  const accAvg = Math.floor(totalAcc / items.length);
  console.log("acc:", accAvg);
}
