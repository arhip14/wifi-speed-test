let startTime, endTime;
let imageSize = "";
let image = new Image();

let bitSpeed = document.getElementById("bits"),
  kbSpeed = document.getElementById("kbs"),
  mbSpeed = document.getElementById("mbs"),
  info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbsSpeed = 0;
let numTests = 5;
let testCompleted = 0;

let imageApi = "https://source.unsplash.com/random?topic=nature";

image.onload = async function () {
  endTime = new Date().getTime();

  await fetch(imageApi).then((response) => {
    imageSize = response.headers.get("content-length");
    calculateSpeed();
  });
};

function calculateSpeed() {
  let timeDuration = (endTime - startTime) / 1000;

  let loadedBits = imageSize * 8;
  let speedInBts = loadedBits / timeDuration;
  let speedInKbs = speedInBts / 1024;
  let speedInMbs = speedInKbs / 1024;

  totalBitSpeed += speedInBts;
  totalKbSpeed += speedInKbs;
  totalMbsSpeed += speedInMbs;

  testCompleted++;

  if (testCompleted === numTests) {
    let averageSpeedInBts = (totalBitSpeed / numTests).toFixed(2);
    let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
    let averageSpeedInMbs = (totalMbsSpeed / numTests).toFixed(2);

    bitSpeed.innerHTML = `<span>Speed in Bits: ${averageSpeedInBts}</span>`;
    kbSpeed.innerHTML = `<span>Speed in Kbs: ${averageSpeedInKbps}</span>`;
    mbSpeed.innerHTML = `<span>Speed in Mbs: ${averageSpeedInMbs}</span>`;
    info.innerHTML = "Test Completed!!!";

  } else {
    startTime = new Date().getTime();
    image.src = imageApi;
  }
}

const init = async () => {
  info.innerHTML = "Testing... :(";
  startTime = new Date().getTime();
  image.src = imageApi;
};

window.onload = () => {
  for (let i = 0; i < numTests; i++) {
    init();
  }
};
