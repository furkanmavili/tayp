let words =
  "lorem ipsum dolor sit amet consectetur adipisicing elit perferendis labore ue sint";
swords = words.split("");

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

const values = Object.values(keyMaps);
const keys = Object.keys(keyMaps);
let wordArea = document.querySelector(".words");
let key;
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
let current = 0;
let alleters = document.querySelectorAll(".letter");
let wrong = 0;
alleters[current].classList.add("cursor");
window.addEventListener("click", isFocused);
let curTime;
let finTime;
let activate = document.querySelector(".activate");
function isFocused(e) {
  if (Array.from(e.target.classList).includes("words")) {
    curTime = "";
    finTime = "";
    activate.style.display = "none";
    wordArea.classList.remove("words-off");
    curTime = new Date();
    window.addEventListener("keyup", start);
  } else {
    curTime = "";
    finTime = "";
    activate.style.display = "block";
    wordArea.classList.add("words-off");
    window.removeEventListener("keyup", start);
  }
}

function start(e) {
  console.log(curTime.getMinutes());
  if (keyMaps[words.charAt(current)] == e.keyCode) {
    alleters[current].classList.remove("cursor");
    current++;
    if (current == words.length) {
      finTime = new Date();
      alert(`You have finished with ${wrong} mistakes`);
      calculate();
      window.removeEventListener("keyup", start);
    }
    alleters[current].classList.add("cursor");
  } else {
    alleters[current].classList.add("wrong");
    wrong++;
  }
}

function calculate() {
  console.log(curTime);
  console.log(finTime);
  let diff = finTime.getTime() - curTime.getTime();
  let min = diff / 1000 / 60;
  const wpm = words.split(" ").length / min;
  console.log(`your typing speed is ${wpm} wpm`);
}
