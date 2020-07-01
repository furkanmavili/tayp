import Chart from "chart.js";
import MicroModal from "micromodal";
MicroModal.init();
var ctx = document.getElementById("chart");
const nodata = document.querySelector(".no-data");
let data = localStorage.getItem("stats");
if (data) {
  data = JSON.parse(data);
  nodata.style.display = "none";
} else {
  ctx.remove();
  nodata.style.display = "block";
}
const speedData = data.map((i) => i.speed);
const accData = data.map((i) => i.accuracy);
const labelData = data.map((v, i) => i);

// For statics section ---------------------------------
const ts = document.getElementById("top-speed");
const as = document.getElementById("avg-speed");
const ae = document.getElementById("avg-error");
const aa = document.getElementById("avg-accuracy");
const totSample = document.getElementById("total-sample");
calculateAvg();
// -------------------------------------------------------
Chart.defaults.global.defaultFontColor = "white";
var myLineChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labelData,
    datasets: [
      {
        label: "Speed",
        backgroundColor: "rgb(50, 10, 50)",
        borderColor: "rgb( 0, 131, 254)",
        data: speedData,
        fill: false,
      },
      {
        label: "Accuracy",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb( 254, 49, 5)",
        data: accData,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Stats",
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Try",
          fontColor: "#fff",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value",
          fontColor: "#fff",
        },
      },
    },
  },
});

// Calculate all time stats and show
function calculateAvg() {
  let totalSpeed = 0;
  let totalError = 0;
  let totalAcc = 0;
  data.forEach((item) => {
    totalSpeed += item.speed;
    totalError += item.error;
    totalAcc += item.accuracy;
  });
  const topSpeed = data.map((i) => i.speed).reduce((a, b) => Math.max(a, b));
  const speedAvg = Number(totalSpeed / data.length).toFixed(2);
  const errorAvg = Number(totalError / data.length).toFixed(2);
  const accAvg = Math.floor(totalAcc / data.length);
  ts.textContent += " " + topSpeed + " wpm";
  as.textContent += " " + speedAvg + " wpm";
  ae.textContent += " " + errorAvg;
  aa.textContent += " " + accAvg + "%";
  totSample.textContent += " " + data.length;
}

const wrongLetters = localStorage.getItem("wrongLetters");
let keys;
let values;
if (!wrongLetters) {
  keys = [];
  values = [];
} else {
  keys = Object.keys(JSON.parse(wrongLetters));
  values = Object.values(JSON.parse(wrongLetters));
}
const barChartData = {
  labels: keys,
  datasets: [
    {
      label: "Errors",
      backgroundColor: "rgb( 0, 131, 254)",
      borderWidth: 1,
      data: values,
    },
  ],
};
window.onload = function () {
  var ctx = document.getElementById("wrong-letter-chart").getContext("2d");
  window.myBar = new Chart(ctx, {
    type: "bar",
    data: barChartData,
    options: {
      responsive: true,
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Wrong Letters",
      },
    },
  });
};
