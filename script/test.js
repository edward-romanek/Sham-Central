let mdlPts = 0;
let hrpPts = 0;
let sdcPts = 0;
let plkPts = 0;
let runPts = 0;
// =========================
// ACCURATE 2025 SCORE DATA
// =========================
const scoreTable = {
  male: {
    "17-21": { 100: 340, 98: 330, 96: 320, 94: 310, 92: 300, 89: 290, 87: 280, 85: 270, 83: 260, 81: 250, 79: 240, 77: 230, 75: 220, 73: 210, 70: 200, 69: 190, 67: 180, 65: 170, 63: 160, 60: 150, 50: 130, 40: 120, 30: 110, 20: 100, 10: 90, 0: 80 },
    "22-26": { 100: 350, 99: 340, 97: 330, 95: 320, 93: 310, 91: 300, 89: 290, 87: 280, 85: 270, 83: 260, 81: 250, 79: 240, 77: 230, 75: 220, 73: 210, 71: 200, 70: 190, 67: 180, 65: 170, 63: 160, 60: 150, 50: 130, 40: 120, 30: 110, 20: 100, 10: 90, 0: 80 },
    "27-31": { 100: 350, 99: 340, 98: 340, 97: 330, 95: 320, 93: 310, 91: 300, 89: 290, 87: 280, 85: 270, 83: 260, 81: 250, 79: 240, 77: 230, 75: 220, 73: 210, 71: 200, 70: 190, 67: 180, 65: 170, 63: 160, 60: 150, 50: 130, 40: 120, 30: 110, 20: 100, 10: 90, 0: 80 }
    // Add more groups following the M|C columns in your image
  },
  female: {
    "17-21": { 100: 220, 98: 210, 97: 200, 94: 190, 91: 180, 88: 170, 84: 160, 80: 150, 75: 140, 68: 130, 60: 120, 50: 110, 40: 100, 30: 90, 20: 80, 10: 70, 0: 60 },
    "22-26": { 100: 230, 98: 220, 97: 210, 95: 200, 93: 190, 89: 180, 86: 170, 82: 160, 78: 150, 73: 140, 67: 130, 60: 120, 50: 110, 40: 100, 30: 90, 20: 80, 10: 70, 0: 60 }
    // Add more groups following the F columns in your image
  }
};

// =========================
// ELEMENTS
// =========================
const slider = document.getElementById("mdlSlider");
const valueOutput = document.getElementById("value1");
const pointsOutput = document.getElementById("points1");
const statusOutput = document.getElementById("status1");
const genderSelect = document.getElementById("genderSelect");
const ageSelect = document.getElementById("ageSelect");

// =========================
// CALCULATION LOGIC
// =========================
function getDeadliftPoints(weight, gender, age) {
  const ageData = scoreTable[gender]?.[age];
  
  // If no data or weight is 0, return 0 points immediately
  if (!ageData || weight === 0) return 0;

  const pointThresholds = Object.keys(ageData).map(Number).sort((a, b) => b - a);

  for (let pts of pointThresholds) {
    if (weight >= ageData[pts]) {
      return pts;
    }
  }
  
  return 0; // Default fallback
}

function updateScore() {
  const weight = parseInt(slider.value);
  const gender = genderSelect.value;
  const age = ageSelect.value;

  valueOutput.textContent = weight + " lbs";

  const points = getDeadliftPoints(weight, gender, age);
  pointsOutput.textContent = points + " pts";

  if (statusOutput) {
    // If weight is 0 or points are below 60, it's a NO GO
    if (points >= 60 && weight > 0) {
      statusOutput.textContent = "GO";
      statusOutput.style.color = "limegreen";
    } else {
      statusOutput.textContent = "NO GO";
      statusOutput.style.color = "red";
    }
  }
}

// =========================
// EVENTS & INIT
// =========================
slider.addEventListener("input", updateScore);
genderSelect.addEventListener("change", updateScore);
ageSelect.addEventListener("change", updateScore);

// Run once on load
updateScore();






// =========================
// HAND RELEASE PUSH UP
// =========================
const hrpTable = {
  male: {
    "17-21": {
      100: 60, 98: 58, 96: 57, 94: 56, 92: 55,
      90: 53, 88: 52, 86: 51, 84: 50, 82: 48,
      80: 47, 78: 45, 76: 44, 74: 43, 72: 41,
      70: 40, 60: 35, 50: 30, 40: 25, 30: 20,
      20: 15, 10: 10, 0: 0
    }
  },
  female: {
    "17-21": {
      100: 50, 98: 48, 96: 47, 94: 45, 92: 43,
      90: 41, 88: 39, 86: 37, 84: 35, 82: 33,
      80: 31, 78: 29, 76: 27, 74: 25, 72: 23,
      70: 21, 60: 18, 50: 15, 40: 12, 30: 10,
      20: 8, 10: 6, 0: 0
    }
  }
};




const hrpSlider = document.getElementById("hrpSlider");
const hrpValue = document.getElementById("hrpValue");
const hrpPoints = document.getElementById("hrpPoints");

function getHRPPoints(reps, gender, age) {
  const data = hrpTable[gender]?.[age];
  if (!data) return 0;

  const thresholds = Object.keys(data).map(Number).sort((a,b)=>b-a);

  for (let pts of thresholds) {
    if (reps >= data[pts]) return pts;
  }
  return 0;
}

function updateHRP() {
  const reps = parseInt(hrpSlider.value);
  const gender = genderSelect.value;
  const age = ageSelect.value;

  hrpValue.textContent = reps + " reps";

  const pts = getHRPPoints(reps, gender, age);
  hrpPoints.textContent = pts + " pts";
}



hrpSlider.addEventListener("input", updateHRP);
genderSelect.addEventListener("change", updateHRP);
ageSelect.addEventListener("change", updateHRP);

updateScore(); // deadlift
updateHRP();   // pushups







// =========================
// SDC
// =========================
const sdcTable = {
  male: {
    "17-21": {
      100: 60, 98: 58, 96: 57, 94: 56, 92: 55,
      90: 53, 88: 52, 86: 51, 84: 50, 82: 48,
      80: 47, 78: 45, 76: 44, 74: 43, 72: 41,
      70: 40, 60: 35, 50: 30, 40: 25, 30: 20,
      20: 15, 10: 10, 0: 0
    }
  },
  female: {
    "17-21": {
      100: 50, 98: 48, 96: 47, 94: 45, 92: 43,
      90: 41, 88: 39, 86: 37, 84: 35, 82: 33,
      80: 31, 78: 29, 76: 27, 74: 25, 72: 23,
      70: 21, 60: 18, 50: 15, 40: 12, 30: 10,
      20: 8, 10: 6, 0: 0
    }
  }
};




const sdcSlider = document.getElementById("sdcSlider");
const sdcValue = document.getElementById("sdcValue");
const sdcPoints = document.getElementById("sdcPoints");

function getSDCPoints(reps, gender, age) {
  const data = sdcTable[gender]?.[age];
  if (!data) return 0;

  const thresholds = Object.keys(data).map(Number).sort((a,b)=>b-a);

  for (let pts of thresholds) {
    if (reps >= data[pts]) return pts;
  }
  return 0;
}

function updateSDC() {
  const reps = parseInt(sdcSlider.value);
  const gender = genderSelect.value;
  const age = ageSelect.value;

sdcValue.textContent = reps + " reps";

  const pts = getSDCPoints(reps, gender, age);
  sdcPoints.textContent = pts + " pts";
}



sdcSlider.addEventListener("input", updateSDC);
genderSelect.addEventListener("change", updateSDC);
ageSelect.addEventListener("change", updateSDC);

updateScore(); // deadlift
updateSDC();   // pushups






// =========================
// PLAMK
// =========================
const plkTable = {
  male: {
    "17-21": {
      100: 60, 98: 58, 96: 57, 94: 56, 92: 55,
      90: 53, 88: 52, 86: 51, 84: 50, 82: 48,
      80: 47, 78: 45, 76: 44, 74: 43, 72: 41,
      70: 40, 60: 35, 50: 30, 40: 25, 30: 20,
      20: 15, 10: 10, 0: 0
    }
  },
  female: {
    "17-21": {
      100: 50, 98: 48, 96: 47, 94: 45, 92: 43,
      90: 41, 88: 39, 86: 37, 84: 35, 82: 33,
      80: 31, 78: 29, 76: 27, 74: 25, 72: 23,
      70: 21, 60: 18, 50: 15, 40: 12, 30: 10,
      20: 8, 10: 6, 0: 0
    }
  }
};




const plkSlider = document.getElementById("plkSlider");
const plkValue = document.getElementById("plkValue");
const plkPoints = document.getElementById("plkPoints");

function getPLKPoints(reps, gender, age) {
  const data = plkTable[gender]?.[age];
  if (!data) return 0;

  const thresholds = Object.keys(data).map(Number).sort((a,b)=>b-a);

  for (let pts of thresholds) {
    if (reps >= data[pts]) return pts;
  }
  return 0;
}

function updatePLK() {
  const reps = parseInt(plkSlider.value);
  const gender = genderSelect.value;
  const age = ageSelect.value;

  plkValue.textContent = reps + " reps";

  const pts = getPLKPoints(reps, gender, age);
  plkPoints.textContent = pts + " pts";
}



plkSlider.addEventListener("input", updatePLK);
genderSelect.addEventListener("change", updatePLK);
ageSelect.addEventListener("change", updatePLK);

updateScore(); // deadlift
updatePLK();   // pushups







// =========================
// 2 mile run
// =========================
const twomrTable = {
  male: {
    "17-21": {
      100: 60, 98: 58, 96: 57, 94: 56, 92: 55,
      90: 53, 88: 52, 86: 51, 84: 50, 82: 48,
      80: 47, 78: 45, 76: 44, 74: 43, 72: 41,
      70: 40, 60: 35, 50: 30, 40: 25, 30: 20,
      20: 15, 10: 10, 0: 0
    }
  },
  female: {
    "17-21": {
      100: 50, 98: 48, 96: 47, 94: 45, 92: 43,
      90: 41, 88: 39, 86: 37, 84: 35, 82: 33,
      80: 31, 78: 29, 76: 27, 74: 25, 72: 23,
      70: 21, 60: 18, 50: 15, 40: 12, 30: 10,
      20: 8, 10: 6, 0: 0
    }
  }
};




const twomrSlider = document.getElementById("twomrSlider");
const twomrValue = document.getElementById("twomrValue");
const twomrPoints = document.getElementById("twomrPoints");

function getTWOMRPoints(reps, gender, age) {
  const data = twomrTable[gender]?.[age];
  if (!data) return 0;

  const thresholds = Object.keys(data).map(Number).sort((a,b)=>b-a);

  for (let pts of thresholds) {
    if (reps >= data[pts]) return pts;
  }
  return 0;
}

function updateTWOMR() {
  const reps = parseInt(twomrSlider.value);
  const gender = genderSelect.value;
  const age = ageSelect.value;

  twomrValue.textContent = reps + " reps";

  const pts = getTWOMRPoints(reps, gender, age);
  twomrPoints.textContent = pts + " pts";
}



twomrSlider.addEventListener("input", updateTWOMR);
genderSelect.addEventListener("change", updateTWOMR);
ageSelect.addEventListener("change", updateTWOMR);

updateScore(); // deadlift
updateTWOMR();   // pushups






const circle = document.getElementById("progressCircle");
const totalText = document.getElementById("totalScore");

const radius = 50;
const circumference = 2 * Math.PI * radius;


function updateCircle(score) {
  const maxScore = 600;
  const percent = score / maxScore;

  const offset = circumference - percent * circumference;
  circle.style.strokeDashoffset = offset;

  totalText.textContent = score;

  // color logic (FIXED location)
  if (score >= 540) circle.style.stroke = "limegreen";
  else if (score >= 360) circle.style.stroke = "orange";
  else circle.style.stroke = "red";
}




if (score >= 540) circle.style.stroke = "limegreen";
else if (score >= 360) circle.style.stroke = "orange";
else circle.style.stroke = "red";










const scoreTable = {
  male: {
    "17-21": { 100: 340, 98: 330, 96: 320, 94: 310, 92: 300, 89: 290, 87: 280, 85: 270, 83: 260, 81: 250, 79: 240, 77: 230, 75: 220, 73: 210, 70: 200, 69: 190, 67: 180, 65: 170, 63: 160, 60: 150, 50: 130, 40: 120, 30: 110, 20: 100, 10: 90, 0: 80 },
    "22-26": { 100: 350, 99: 340, 97: 330, 95: 320, 93: 310, 91: 300, 89: 290, 87: 280, 85: 270, 83: 260, 81: 250, 79: 240, 77: 230, 75: 220, 73: 210, 71: 200, 70: 190, 67: 180, 65: 170, 63: 160, 60: 150, 50: 130, 40: 120, 30: 110, 20: 100, 10: 90, 0: 80 },
    "27-31": { 100: 350, 99: 340, 98: 340, 97: 330, 95: 320, 93: 310, 91: 300, 89: 290, 87: 280, 85: 270, 83: 260, 81: 250, 79: 240, 77: 230, 75: 220, 73: 210, 71: 200, 70: 190, 67: 180, 65: 170, 63: 160, 60: 150, 50: 130, 40: 120, 30: 110, 20: 100, 10: 90, 0: 80 }
    // Add more groups following the M|C columns in your image
  },
  female: {
    "17-21": { 100: 220, 98: 210, 97: 200, 94: 190, 91: 180, 88: 170, 84: 160, 80: 150, 75: 140, 68: 130, 60: 120, 50: 110, 40: 100, 30: 90, 20: 80, 10: 70, 0: 60 },
    "22-26": { 100: 230, 98: 220, 97: 210, 95: 200, 93: 190, 89: 180, 86: 170, 82: 160, 78: 150, 73: 140, 67: 130, 60: 120, 50: 110, 40: 100, 30: 90, 20: 80, 10: 70, 0: 60 }
    // Add more groups following the F columns in your image
  }
};

// =========================
// ELEMENTS
// =========================
const slider = document.getElementById("mdlSlider");
const valueOutput = document.getElementById("value1");
const pointsOutput = document.getElementById("points1");
const statusOutput = document.getElementById("status1");
const genderSelect = document.getElementById("genderSelect");
const ageSelect = document.getElementById("ageSelect");

// =========================
// CALCULATION LOGIC
// =========================
function getDeadliftPoints(weight, gender, age) {
  const ageData = scoreTable[gender]?.[age];
  
  // If no data or weight is 0, return 0 points immediately
  if (!ageData || weight === 0) return 0;

  const pointThresholds = Object.keys(ageData).map(Number).sort((a, b) => b - a);

  for (let pts of pointThresholds) {
    if (weight >= ageData[pts]) {
      return pts;
    }
  }
  
  return 0; // Default fallback
}

function updateScore() {
  const weight = parseInt(slider.value);
  const gender = genderSelect.value;
  const age = ageSelect.value;

  valueOutput.textContent = weight + " lbs";

  const points = getDeadliftPoints(weight, gender, age);
  pointsOutput.textContent = points + " pts";

  if (statusOutput) {
    // If weight is 0 or points are below 60, it's a NO GO
    if (points >= 60 && weight > 0) {
      statusOutput.textContent = "GO";
      statusOutput.style.color = "limegreen";
    } else {
      statusOutput.textContent = "NO GO";
      statusOutput.style.color = "red";
    }
  }
}

// =========================
// EVENTS & INIT
// =========================
slider.addEventListener("input", updateScore);
genderSelect.addEventListener("change", updateScore);
ageSelect.addEventListener("change", updateScore);

// Run once on load
updateScore();

