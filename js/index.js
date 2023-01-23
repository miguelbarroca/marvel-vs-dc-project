const myCanvas = document.querySelector('Canvas')
const ctx = myCanvas.getContext('2d');
document.querySelector("#game-board").style.display = "none"
myCanvas.style.border = "2px solid black"
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
// -------------------------- Car IMG (properties)
const charImg = new Image();
charImg.src = "../images/captainamerica.png";
let charPosX = 50;
let charPosY = myCanvas.height/2 - 30;
let charWidth = 100;
let charHeight = 150;
const charSpeed = 6;
let isMovingLeft = false
let isMovingRight = false
let isMovingUp = false
let isMovingDown = false

// ------------------------------- Enemies
const aquamanImg = new Image();
aquamanImg.src = "../images/aquaman.png"
let aquamanPosX = 2000;
let aquamanPosY = 100;
let aquamanWidth = 150;
let aquamanHeight = 100;

const batmanImg = new Image();
batmanImg.src = "../images/batman.png"
let batmanPosX = 2200;
let batmanPosY = 280;
let batmanWidth = 150;
let batmanHeight = 90;

const flashImg = new Image();
flashImg.src = "../images/flash.png"
let flashPosX = 2200;
let flashPosY = -380;
let flashWidth = 150;
let flashHeight = 120;

const supermanImg = new Image();
supermanImg.src = "../images/superman.png"
let supermanPosX = 2300;
let supermanPosY = -380;
let supermanWidth = 170;
let supermanHeight = 120;

const wonderwomanImg = new Image();
wonderwomanImg.src = "../images/wonderwoman.png"
let wonderwomanPosX = 2400;
let wonderwomanPosY = -380;
let wonderwomanWidth = 150;
let wonderwomanHeight = 80;

const thanosImg = new Image();
thanosImg.src = "../images/thanosgauntlet.png"
let thanosPosX = 2400;
let thanosPosY = 1;
let thanosWidth = 150;
let thanosHeight = 100;




// ------------------- GAME VARIABLES
let gameOver = false;
let animateId 

const backgroundImgs = () => {
  ctx.drawImage(backImg2, background1X, 0, myCanvas.width, myCanvas.height);
  ctx.drawImage(backImg2, background2X, 0, myCanvas.width, myCanvas.height);
  
} 

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

// ------------------------------ RANDOMIZER 



window.onload = () => {
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

  aquamanPosX -= 10;
  batmanPosX -= 10;
  flashPosX -= 12;
  supermanPosX -= 12;
  wonderwomanPosX -= 10;
  thanosPosX -= 18;


  background1X -= 3;  
  background2X -= 3;
  
  if(background1X < -myCanvas.width){
    background1X = myCanvas.width
  }
  if (background2X < -myCanvas.width) {
    background2X = myCanvas.width
  }
  
// --------------------char MOVING LEFT AND RIGHT -------------------
  if (isMovingLeft) {
    charPosX -= charSpeed
  }
  if (isMovingRight) {
    charPosX += charSpeed
  }
  if (isMovingUp) {
    charPosY -= charSpeed
  }
  if (isMovingDown) {
    charPosY += charSpeed
  }
// -------------------- EnemiesSPAWN && Collision -------------------
if (aquamanPosX < -200){
  aquamanPosX = 1800;
  aquamanPosY = getRandomSpawn(1000, 50)
}  
if (batmanPosX < -300){
  batmanPosX = 1800;
  batmanPosY = getRandomSpawn(1000, 50)
}
if (flashPosX < -400){
  flashPosX = 1800;
  flashPosY = getRandomSpawn(1000, 50)
}
if (supermanPosX < 500){
  supermanPosX = 1800;
  supermanPosY = getRandomSpawn(1000, 50)
}
if (wonderwomanPosX < -200){
    wonderwomanPosX = 1800;
    wonderwomanPosY = getRandomSpawn(1000, 50)
}
if (thanosPosX < -200){
  thanosPosX = 1800;
  thanosPosY = getRandomSpawn(1000, 50)
}

if (aquamanPosX < charPosX + charWidth &&
  aquamanPosX + aquamanWidth > charPosX &&
  aquamanPosY < charPosY + charHeight &&
  aquamanHeight + aquamanPosY > charPosY) {
  gameOver = true;
} 
if (batmanPosX < charPosX + charWidth &&
  batmanPosX + batmanWidth > charPosX &&
  batmanPosY < charPosY + charHeight &&
  batmanHeight + batmanPosY > charPosY) {
    gameOver = true;
}
if (flashPosX < charPosX + charWidth &&
  flashPosX + flashWidth > charPosX &&
  flashPosY < charPosY + charHeight &&
  flashHeight + flashPosY > charPosY) {
  gameOver = true;
}
if (supermanPosX < charPosX + charWidth &&
    supermanPosX + supermanWidth > charPosX &&
    supermanPosY < charPosY + charHeight &&
    supermanHeight + supermanPosY > charPosY) {
    gameOver = true;
}
if (wonderwomanPosX < charPosX + charWidth &&
    wonderwomanPosX + wonderwomanWidth > charPosX &&
    wonderwomanPosY < charPosY + charHeight &&
    wonderwomanHeight + wonderwomanPosY > charPosY) {
    gameOver = true; 
}
// --------------------GAME OVER -----------------------------------
  if (!gameOver){
    animateId = requestAnimationFrame(animate)
  } else {
    cancelAnimationFrame(animateId)
  }
}




// ------------------- START GAME -----------------------------------
  function startGame() {
    animate();
    console.log("Game Started")
  }
  document.addEventListener('keypress', event => {
    if (event.key === 'a') {
      // move paddle to the left
      isMovingLeft = true
    }
    if (event.key === 'd') {
      // move paddle to the right
      isMovingRight = true
    } 
    if (event.key === 'd') {
      // move paddle to the right
      isMovingRight = true
    }
    if (event.key === 'w') {
      // move paddle to the right
      isMovingUp = true
    }
    if (event.key === 's') {
      // move paddle to the right
      isMovingDown = true
    }
  })
  document.addEventListener('keyup', () => {
    // Stop moving the paddle
    isMovingLeft = false
    isMovingRight = false
    isMovingUp = false
    isMovingDown = false
});