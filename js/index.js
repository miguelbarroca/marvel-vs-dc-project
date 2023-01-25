const myCanvas = document.querySelector('Canvas')
const ctx = myCanvas.getContext('2d');
document.querySelector("#game-board").style.display = "none"
myCanvas.width = 1880; 
myCanvas.height = 750;
let score = 0;
let pause = false;
let gameOver = false;
let animateId 
let introMusic = new Audio("../music/intromusic.wav");
introMusic.volume = 0.5
let gameMusic = new Audio("../music/streetsofrage.mp3");
gameMusic.volume = 0.2

// ------------------- RANDOMIZER
const getRandomSpawn = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --------------------------Background IMG (properties)
const backImg = new Image();
backImg.src = "../images/background.jpg";
const backImg2 = new Image();
backImg2.src = "../images/background.jpg";
let background1X = 0;
let background2X = -myCanvas.width; 
const backgroundImgs = () => {
  ctx.drawImage(backImg2, background1X, 0, myCanvas.width, myCanvas.height);
  ctx.drawImage(backImg2, background2X, 0, myCanvas.width, myCanvas.height);
  
} 

// -------------------------- CHAR IMG (properties)
const charImg = new Image();
charImg.src = "../images/spiderman.png";
let charPosX = 50;
let charPosY = myCanvas.height/2 - 30;
let charWidth = 60;
let charHeight = 110;
const charSpeed = 8;
let isMovingLeft = false
let isMovingRight = false
let isMovingUp = false
let isMovingDown = false

// ------------------------------- Enemies
const aquamanImg = new Image();
aquamanImg.src = "images/aquaman.png"
let aquamanPosX = 2000;
let aquamanPosY = 100;
let aquamanWidth = 150;
let aquamanHeight = 100;
let aquamanSpeed = 10;

const batmanImg = new Image();
batmanImg.src = "./images/batman.png"
let batmanPosX = 2200;
let batmanPosY = 280;
let batmanWidth = 130;
let batmanHeight = 80;
let batmanSpeed = 10;

const flashImg = new Image();
flashImg.src = "./images/flash.png"
let flashPosX = 2200;
let flashPosY = -380;
let flashWidth = 120;
let flashHeight = 100;
let flashSpeed = 10;

const supermanImg = new Image();
supermanImg.src = "./images/superman.png"
let supermanPosX = 2300;
let supermanPosY = -380;
let supermanWidth = 150;
let supermanHeight = 100;
let supermanSpeed = 10;

const wonderwomanImg = new Image();
wonderwomanImg.src = "./images/wonderwoman.png"
let wonderwomanPosX = 2400;
let wonderwomanPosY = -380;
let wonderwomanWidth = 130;
let wonderwomanHeight = 60;
let wonderwomanSpeed = 10;

const thanosImg = new Image();
thanosImg.src = "./images/thanosgauntlet.png"
let thanosPosX = 2400;
let thanosPosY = myCanvas.height /2;
let thanosWidth = 100;
let thanosHeight = 90;
let thanosSpeed = 10;

const gameoverImg = new Image();
gameoverImg.src = "./images/gameover.jpg"

// ----------------------- DRAWING CHARACTERS 
const char = () => {
  ctx.drawImage(charImg, charPosX, charPosY, charWidth, charHeight);
}
const drawaquaman = () => {
  ctx.drawImage(aquamanImg, aquamanPosX, aquamanPosY, aquamanWidth, aquamanHeight);
}
const drawbatman = () => {
  ctx.drawImage(batmanImg, batmanPosX, batmanPosY, batmanWidth, batmanHeight);
}
const drawflash = () => {
  ctx.drawImage(flashImg, flashPosX, flashPosY, flashWidth, flashHeight);
}
const drawsuperman = () => {
  ctx.drawImage(supermanImg, supermanPosX, supermanPosY, supermanWidth, supermanHeight);
}
const drawwonderwoman = () => {
  ctx.drawImage(wonderwomanImg, wonderwomanPosX, wonderwomanPosY, wonderwomanWidth, wonderwomanHeight);
}
const drawthanos = () => {
  ctx.drawImage(thanosImg, thanosPosX, thanosPosY, thanosWidth, thanosHeight);
}

// ---------------------- WINDOW ON.LOAD
function drawScore() {
  ctx.font = "16px Fira Code";
  ctx.fillStyle = "#B22222";
  ctx.fillText("Score: "+score, myCanvas.width / 2, 50);
}
window.onload = () => {
  introMusic.play();
  document.getElementById('start-button').onclick = () => {
    startGame();
    document.querySelector(".game-intro").style.display = "none";
    document.querySelector("#game-board").style.display = 'block';

    
  };
}
// -------------------- ANIMATE -----------------------------
function animate(){
  backgroundImgs();
  char();
  drawaquaman();
  drawbatman();
  drawflash();
  drawsuperman();
  drawwonderwoman();
  drawthanos();
  drawScore()
  console.log(aquamanSpeed)

  
  aquamanPosX -= aquamanSpeed;
  batmanPosX -= batmanSpeed;
  flashPosX -= flashSpeed;
  supermanPosX -= supermanSpeed;
  wonderwomanPosX -= wonderwomanSpeed;
  thanosPosX -= thanosSpeed;


  background1X -= 3;  
  background2X -= 3;
  
  if(background1X < -myCanvas.width){
    background1X = myCanvas.width
  }
  if (background2X < -myCanvas.width) {
    background2X = myCanvas.width
  }
  
// --------------------char MOVING LEFT AND RIGHT -------------------
  if (isMovingLeft && charPosX > 20) {
    charPosX -= charSpeed
  }
  if (isMovingRight && charPosX < 1000) {
    charPosX += charSpeed
  }
  if (isMovingUp && charPosY > 3 ) {
    charPosY -= charSpeed
  }
  if (isMovingDown && charPosY < 610) {
    charPosY += charSpeed
  }
// -------------------- EnemiesSPAWN && Collision -------------------
if (aquamanPosX < -200){
  score += 1
  aquamanPosX = 1800;
  aquamanPosY = getRandomSpawn(700, 1)
}  
if (batmanPosX < -300){
  score += 1
  batmanPosX = 1800;
  batmanPosY = getRandomSpawn(700, 1)
}
if (flashPosX < -400){
  score += 1
  flashPosX = 1800;
  flashPosY = getRandomSpawn(700, 1)
}
if (supermanPosX < -700){
  score += 1
  supermanPosX = 1800;
  supermanPosY = getRandomSpawn(700, 1)
}
if (wonderwomanPosX < -200){
    wonderwomanPosX = 1800;
    wonderwomanPosY = getRandomSpawn(700, 1)
}
if (thanosPosX < -200){
  thanosPosX = 1800;
  thanosPosY = getRandomSpawn(700, 1)
}

if (aquamanPosX < charPosX + charWidth -45&&
  aquamanPosX + aquamanWidth > charPosX  &&
  aquamanPosY < charPosY + charHeight -50&&
  aquamanHeight -50 + aquamanPosY > charPosY) {
  gameOver = true;
} 
if (batmanPosX < charPosX + charWidth -45&&
  batmanPosX + batmanWidth > charPosX &&
  batmanPosY < charPosY + charHeight &&
  batmanHeight -50 + batmanPosY > charPosY) {
    gameOver = true;
}
if (flashPosX < charPosX + charWidth -45 &&
  flashPosX + flashWidth > charPosX &&
  flashPosY < charPosY + charHeight &&
  flashHeight -50 + flashPosY > charPosY) {
  gameOver = true;
}
if (supermanPosX < charPosX + charWidth -45&&
    supermanPosX + supermanWidth > charPosX &&
    supermanPosY < charPosY + charHeight &&
    supermanHeight -50 + supermanPosY > charPosY) {
    gameOver = true;
}
if (wonderwomanPosX < charPosX + charWidth -45&&
    wonderwomanPosX + wonderwomanWidth > charPosX &&
    wonderwomanPosY < charPosY + charHeight &&
    wonderwomanHeight -50 + wonderwomanPosY > charPosY) {
    gameOver = true; 
}
if (thanosPosX < charPosX + charWidth -50&&
  thanosPosX + thanosWidth > charPosX &&
  thanosPosY < charPosY + charHeight &&
  thanosHeight -50 + thanosPosY > charPosY) {
  gameOver = true;
  } 


// --------------------GAME OVER  && PAUSE-----------------------------------
  if (!gameOver){
    animateId = requestAnimationFrame(animate)
  } 
  else {
    cancelAnimationFrame(animateId)
    ctx.drawImage(gameoverImg, 730, 200, 500, 400)
    gameMusic.stop();
    console.log('gameOver')
 }




// ------------------------- PAUSE ----------------------
  if (pause === true) {
    cancelAnimationFrame(animateId);
    paused()
  }
}
function paused(){
  animateId = requestAnimationFrame(paused)
  if (pause === false) {
    cancelAnimationFrame(animateId);
    animate()
  }
}

// ------------------- START GAME -----------------------------------
  function startGame() {
    animate();
    gameMusic.play();
    console.log("Game Started")
  }

  // -------------- EVENT LISTENERS ------------------------------
  document.addEventListener('keypress', event => {
    if (event.key === 'a') {
      isMovingLeft = true;
    }
    if (event.key === 'd') {
      isMovingRight = true;
    } 
    if (event.key === 'w') {   
      isMovingUp = true;
    }
    if (event.key === 's') {
      isMovingDown = true;
    }
    if (event.key === 'm') {
      gameMusic.pause();
    }
  })

  document.addEventListener('keyup', () => {
    isMovingLeft = false
    isMovingRight = false
    isMovingUp = false
    isMovingDown = false
});

document.getElementById('pause-button').onclick = () => {
  if(!pause) {
  pause = true
}
else pause = false;
}
document.getElementById('restart-button').onclick = () => {
  cancelAnimationFrame(animateId);
score = 0;
pause = false;
gameOver = false;
score = 0;
pause = false;
gameOver = false;
background1X = 0;
background2X = -myCanvas.width
charPosX = 50;
charPosY = myCanvas.height/2 - 30;
charWidth = 60;
charHeight = 110;
isMovingLeft = false
isMovingRight = false
isMovingUp = false
isMovingDown = false


aquamanPosX = 2000;
aquamanPosY = 100;
aquamanWidth = 150;
aquamanHeight = 100;
batmanPosX = 2200;
batmanPosY = 280;
batmanWidth = 130;
batmanHeight = 80;
flashPosX = 2200;
flashPosY = -380;
flashWidth = 120;
flashHeight = 100;
supermanPosX = 2300;
supermanPosY = -380;
supermanWidth = 150;
supermanHeight = 100;
wonderwomanPosX = 2400;
wonderwomanPosY = -380;
wonderwomanWidth = 130;
wonderwomanHeight = 60;
thanosPosX = 2400;
thanosPosY = myCanvas.height
thanosWidth = 100;
thanosHeight = 90;


startGame()
}
// ----------------------------------------------------------

