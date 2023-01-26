const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameContainer = document.getElementById("gameContainer");

const flappyImg = new Image();
flappyImg.src = "assets/flappyDunk.png";

const flapSpeed = -5;
const birdWidth = 40;
const birdHeight = 30;
const pipeWidth = 50;
const pipeGap = 125;

let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;

let pipeX = 400;
let pipeY = canvas.height - 200;

let scoreDiv = document.getElementById("scoreDisplay");
let score = 0;
let highScore = 0;

document.body.onkeyup = function (e) {
  if (e.code == "Space") {
    birdVelocity = flapSpeed;
  }
};

document.getElementById("restartButton").addEventListener("click", function () {
  hideEndMenu();
  resetGame();
  loop();
});

function increaseScore() {}

function collisionCheck() {
  const birdBox = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight,
  };

  const topPipeBox = {
    x: pipeX,
    y: pipeY - pipeGap + birdHeight,
    width: pipeWidth,
    height: pipeY,
  };

  const bottomPipeBox = {
    x: pipeX,
    y: pipeY + pipeGap + birdHeight,
    width: pipeWidth,
    height: canvas.height - pipeY - pipeGap,
  };

  if (
    birdBox.x + birdBox.width > topPipeBox.x &&
    birdBox.x < topPipeBox.x + topPipeBox.width &&
    birdBox.y < topPipeBox.y
  ) {
    return true;
  }

  if (
    birdBox.x + birdBox.width > bottomPipeBox.x &&
    birdBox.x < bottomPipeBox.x + bottomPipeBox.width &&
    birdBox.y + birdBox.height > bottomPipeBox.y
  ) {
    return true;
  }

  if (birdY < 0 || birdY + birdHeight > canvas.height) {
    return true;
  }

  return false;
}

function hideEndMenu() {
  document.getElementById("endMenu").style.display = "none";
  gameContainer.classList.remove("backdropBlur");
}

function showEndMenu() {
  document.getElementById("endMenu").style.display = "block";
  gameContainer.classList.add("backdropBlur");
  document.getElementById("endScore").innerHTML = score;
  if (highScore < score) {
    highScore = score;
  }
  document.getElementById("bestScore").innerHTML = highScore;
}

function resetGame() {}

function endGame() {
  showEndMenu();
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(flappyImg, birdX, birdY);

  ctx.fillStyle = "#333";
  ctx.fillRect(pipeX, -100, pipeWidth, pipeY);
  ctx.fillRect(pipeX, pipeY + pipeGap, pipeWidth, canvas.height - pipeY);

  if (collisionCheck()) {
    endGame();
    return;
  }

  pipeX -= 1.5;

  if (pipeX < -50) {
    pipeX = 400;
    pipeY = Math.random() * (canvas.height - pipeGap) + pipeWidth;
  }

  birdVelocity += birdAcceleration;
  birdY += birdVelocity;

  requestAnimationFrame(loop);
}

loop();
