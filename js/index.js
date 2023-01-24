const myCanvas = document.querySelector('Canvas')
const ctx = myCanvas.getContext('2d');
document.querySelector("#game-board").style.display = "none"
myCanvas.width = 1880; 
myCanvas.height = 750;
let score = 0;
pause = false;
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

// -------------------------- CHAR IMG (properties)
const charImg = new Image();
charImg.src = "../images/spiderman.png";
let charPosX = 50;
let charPosY = myCanvas.height/2 - 30;
let charWidth = 80;
let charHeight = 130;
const charSpeed = 8;
let isMovingLeft = false
let isMovingRight = false
let isMovingUp = false
let isMovingDown = false

// ------------------------------- Enemies
const aquamanImg = new Image();
aquamanImg.src = "../images/aquaman.png"
let aquamanPosX = 2000;
let aquamanPosY = 100;
let aquamanWidth = 170;
let aquamanHeight = 120;

const batmanImg = new Image();
batmanImg.src = "../images/batman.png"
let batmanPosX = 2200;
let batmanPosY = 280;
let batmanWidth = 150;
let batmanHeight = 100;

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
let thanosPosY = myCanvas.height /2;
let thanosWidth = 130;
let thanosHeight = 90;

function drawScore() {
  ctx.font = "16px Fira Code";
  ctx.fillStyle = "#B22222";
  ctx.fillText("Score: "+score, myCanvas.width / 2, 50);
}



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

// ---------------------- WINDOW ON.LOAD

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
  drawScore()

  aquamanPosX -= 11;
  batmanPosX -= 11;
  flashPosX -= 13;
  supermanPosX -= 13;
  wonderwomanPosX -= 11;
  thanosPosX -= 17;


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
  if ( charPosX === -myCanvas.width) {
    charSpeed === 0;
  }
// -------------------- EnemiesSPAWN && Collision -------------------
if (aquamanPosX < -200){
  aquamanPosX = 1800;
  aquamanPosY = getRandomSpawn(700, 1)
}  
if (batmanPosX < -300){
  batmanPosX = 1800;
  batmanPosY = getRandomSpawn(700, 1)
}
if (flashPosX < -400){
  flashPosX = 1800;
  flashPosY = getRandomSpawn(700, 1)
}
if (supermanPosX < -700){
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

  if (aquamanPosX < charPosX)  {
    score += 1;
  }
// --------------------GAME OVER -----------------------------------
  if (!gameOver){
    animateId = requestAnimationFrame(animate)
  } 
  else {
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
     
      isMovingLeft = true
    }
    if (event.key === 'd') {
      
      isMovingRight = true
    } 
    if (event.key === 'd') {
      
      isMovingRight = true
    }
    if (event.key === 'w') {
      
      isMovingUp = true
    }
    if (event.key === 's') {
      
      isMovingDown = true
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
  cancelAnimationFrame(animateId);
}
if(pause) {
  animateId = requestAnimationFrame(animate)
}
}


