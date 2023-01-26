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

function increaseScore() {}

function resetGame() {}

function endGame() {}

function loop() {}
