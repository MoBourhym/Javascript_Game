const gameBorder = document.querySelector("#gameBorder");
const ctx = gameBorder.getContext("2d");
const scoreDisplay = document.querySelector("#score");
const heartDisplay = document.querySelector("#heart");
const button = document.querySelector("button");

const gameWidth = gameBorder.width;
const gameHeight = gameBorder.height;
const backgroundColor = "dodgerblue";
const barColor = "lightgrey";
const barCounter = "black";
const ballRadius = 2;
const barSpeed = gameWidth / 20;

let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let score = 0;
let hearts = 3;

let bar = {
  width: gameWidth / 10,
  height: 5,
  x: (gameWidth - 10) / 2,
  y: gameHeight - 10,
};

window.addEventListener("load", startGame);
window.addEventListener("keyup", changeDirection);

function startGame() {
  timerID = setInterval(startTimer, 1000);
  createBall();
  nextIterations();
  
}

function startTimer() {
  score++;
  scoreDisplay.textContent = "Score: " + score + " dh";
}

function showGameOver(finalScore) {
  alert("Game Over! Your final score is: " + finalScore);
}

function drawBall() {
  ctx.fillStyle = barColor;
  ctx.strokeStyle = barCounter;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

function nextIterations() {
   intervallID = setTimeout(() => {
    clearGround();
    drawBar();
    drawBall();
    moveBall();
    checkCollision();
    nextIterations();
  }, 10);
}

function drawBar() {
  ctx.strokeStyle = barCounter;
  ctx.fillStyle = barColor;
  ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
  ctx.strokeRect(bar.x, bar.y, bar.width, bar.height);
}

function clearGround() {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const leftKey = 37;
  const rightKey = 39;
  if (keyPressed === leftKey && bar.x > 0) {
    bar.x -= barSpeed;
  } else if (keyPressed === rightKey && bar.x + bar.width < gameWidth) {
    bar.x += barSpeed;
  }
}

function checkCollision() {
  if (ballX < ballRadius || ballX > gameWidth - ballRadius) {
    ballXDirection = -ballXDirection;
  }

  if (ballY < ballRadius) {
    ballYDirection = -ballYDirection;
  }

  if (
    ballX + ballRadius >= bar.x &&
    ballX - ballRadius <= bar.x + bar.width &&
    ballY + ballRadius >= bar.y
  ) {
    ballYDirection = -ballYDirection;
   
  }

  if (ballY > gameHeight) {
    hearts--;
    heartDisplay.textContent = "Hearts: " + hearts;
    createBall();
    startTimer();
    if(hearts<=0)
    resetGame();
  }
}

function createBall() {
  if (Math.round(Math.random()) == 1) ballXDirection = 1;
  else ballXDirection = -1;

  if (Math.round(Math.random()) == 1) ballYDirection = 1;
  else ballYDirection = -1;

  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall();
}

function moveBall() {
  ballX += (ballSpeed * ballXDirection);
  ballY += (ballSpeed * ballYDirection);
}


function resetGame() {
  alert("Your score is: "+score);
  hearts = 3;
  score = 0;
  bar = {
    width: gameWidth / 10,
    height: 5,
    x: (gameWidth - 10) / 2,
    y: gameHeight - 10,
  };
  ballSpeed = 1;
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  ballXDirection = 0;
  ballYDirection = 0;
  heartDisplay.textContent = "Hearts: " + hearts;
  scoreDisplay.textContent = "Score: " + score + " dh";
  clearInterval(intervallID);
  clearInterval(timerID);
  startGame();
}
