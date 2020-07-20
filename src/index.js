import word from "./words";
import keyMaps from "./keyMaps";
import MicroModal from "micromodal";
MicroModal.init();
const wordNumber = 20;
let openPunctation = false;
let generatorMode = "alphabet";
let wordArea = document.querySelector(".words");
let words = "";
let swords = [];
let alleters;
draw();
let current = 0;
alleters[current].classList.add("cursor");
// curtime end finTime for calculate wpm speed
let curTime;
let finTime;
window.addEventListener("click", isFocused);
let activate = document.querySelector(".activate");
// checks wordArea is focused or not, if so start keyboard event.
function isFocused(e) {
  console.log(e.target);
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
  e.preventDefault();
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

// generates words or numeric values
function generate() {
  swords = [];
  if (generatorMode === "alphabet") {
    for (let i = 0; i < wordNumber; i++) {
      let random = Math.floor(Math.random() * 999);
      swords.push(word.mostCommon[random]);
      if (openPunctation) {
        swords.push(getRandomPunctation());
      }
      swords.push(" ");
    }
  } else {
    // generator mode is numeric
    for (let i = 0; i < 30; i++) {
      let random = Math.floor(Math.random() * 10);
      swords.push(String(random));
    }
  }
  swords.pop();
  words = swords.join("");
}

function getRandomPunctation() {
  const punctations = [".", ",", ";", ":", "'", "?", "!"];
  return punctations[Math.floor(Math.random() * punctations.length)];
}

// Enable/disable punctation
const enablePuncBtn = document.querySelector(".enable-punctation");
enablePuncBtn.addEventListener("click", () => {
  if (openPunctation) {
    enablePuncBtn.textContent = "Enable Punctation";
    enablePuncBtn.classList.remove("disable-punctation");
    openPunctation = false;
  } else {
    enablePuncBtn.textContent = "Disable Punctation";
    enablePuncBtn.classList.add("disable-punctation");
    openPunctation = true;
  }
});
// Changes generator mode like alphabet or numeric
const changeGeneratorMode = document.querySelector(".change-mode");
changeGeneratorMode.addEventListener("click", () => {
  if (generatorMode === "alphabet") {
    generatorMode = "numeric";
  } else {
    generatorMode = "alphabet";
  }
  changeGeneratorMode.textContent = `Mode: ${generatorMode}`;
});
// loop through swords array and appends span elements to wordArea
function draw() {
  generate();
  swords.forEach((e) => {
    let wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    for (let i = 0; i < e.length; i++) {
      let span = document.createElement("span");
      span.classList.add("letter");
      if (e[i].match(/[a-z0-9]/i)) {
        span.textContent = e[i];
        wrapper.appendChild(span);
      } else if (e[i].match(/[?!.,;:']/i)) {
        span.classList.add("punctation");
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
  if (wpm < 0) {
    wpm = 0;
  }
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
  setWrongLetter();
  localStorage.setItem("stats", JSON.stringify(stats));
  speed.innerHTML = `Speed: ${wpm}`;
  errors.innerHTML = `Errors: ${wrong}`;
  acc.innerHTML = `Accuracy: ${ac}%`;
}
// sum of same keys values in objects, thx to stackoverflow
function sumObjectsByKey(...objs) {
  return objs.reduce((a, b) => {
    for (let k in b) {
      // eslint-disable-next-line no-prototype-builtins
      if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
    }
    return a;
  }, {});
}
function setWrongLetter() {
  const getItem = localStorage.getItem("wrongLetters");
  const wrongs = getWrongLetters();

  let result;
  if (!getItem) {
    localStorage.setItem("wrongLetters", JSON.stringify(wrongs));
  } else {
    result = sumObjectsByKey(wrongs, JSON.parse(getItem));
    localStorage.setItem("wrongLetters", JSON.stringify(result));
  }
}
function getWrongLetters() {
  const fil = [...alleters]
    .filter((letter) => [...letter.classList].includes("wrong"))
    .map((i) => i.textContent)
    .reduce((acc, item) => {
      if (!acc[item]) {
        acc[item] = 0;
      }
      acc[item]++;
      return acc;
    }, {});
  console.log(fil);
  return fil;
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
  let correct = 0;
  alleters.forEach((el) => {
    if (![...el.classList].includes("wrong")) {
      correct++;
    }
  });
  const percentage = (100 * correct) / alleters.length;
  return Math.floor(percentage);
}

// light/dark mode
let currentMode = "dark";
function changeStyle(variable, value) {
  document.documentElement.style.setProperty(variable, value);
  // body...
}
function changeMode() {
  if (currentMode == "dark") {
    changeStyle(`--dark`, "#f5f5f5");
    changeStyle(`--light`, "#313131");
    changeStyle(`--accent-color`, "#d8737a");
    currentMode = "light";
  } else {
    changeStyle(`--dark`, "#313131");
    changeStyle(`--light`, "#f5f5f5");
    changeStyle(`--accent-color`, "#ca3e47");
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
