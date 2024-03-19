// board
let board;
let boardWidth = 360;
let boardHeight = 576;
let context;
let fps = 60;
// doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth / 2 - doodlerWidth / 2;
let doodlerY = boardHeight * (7 / 8) - doodlerHeight;
let doodlerLeftImage;
let doodlerRightImage;
// physics
let velocityX = 0;
let velocityY = 0; // doodler jump speed
let initialVelocityY = -8; // starting velocity Y
let gravity = 0.4;

// platforms
let platformArray = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;

let doodler = {
  img: null,
  x: doodlerX,
  y: doodlerY,
  width: doodlerWidth,
  height: doodlerHeight,
};

window.onload = function () {
  // draw the board
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  // draw the doodler
  /*
  context.fillStyle = "green";
  context.fillRect(doodler.x, doodler.y, doodler.width, doodler.height);
  */

  //load images
  doodlerRightImage = new Image();
  doodlerRightImage.src = "doodler-right.png";
  doodler.img = doodlerRightImage;
  doodlerRightImage.onload = function () {
    context.drawImage(
      doodler.img,
      doodler.x,
      doodler.y,
      doodler.width,
      doodler.height
    );
  };

  doodlerLeftImage = new Image();
  doodlerLeftImage.src = "doodler-left.png";

  platformImg = new Image();
  platformImg.src = "platform.png";

  velocityY = initialVelocityY;
  placePlatforms();

  setInterval(update, 1000 / fps);
  document.addEventListener("keydown", moveDoodler);
};
function update() {
  context.clearRect(0, 0, board.width, board.height);

  // doodler
  doodler.x += velocityX;
  if (doodler.x > boardWidth) {
    doodler.x = 0;
  } else if (doodler.x + doodler.width < 0) {
    doodler.x = boardWidth;
  }
  context.drawImage(
    doodler.img,
    doodler.x,
    doodler.y,
    doodler.width,
    doodler.height
  );
  velocityY += gravity;
  doodler.y += velocityY;

  // platform
  for (let i = 0; i < platformArray.length; i++) {
    let platform = platformArray[i];
    if (detectCollision(doodler, platform)) {
      velocityY = initialVelocityY; // jump
    }
    context.drawImage(
      platform.img,
      platform.x,
      platform.y,
      platform.width,
      platform.height
    );
  }
  console.log("nigga");
}

function moveDoodler(e) {
  if (e.code == "ArrowRight" || e.code == "KeyD") {
    velocityX = 4;
    doodler.img = doodlerRightImage;
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    velocityX = -4;
    doodler.img = doodlerLeftImage;
  }
}
function placePlatforms() {
  platformArray = [];

  //starting platform
  let platform = {
    img: platformImg,
    x: boardWidth / 2,
    y: boardHeight - 50,
    width: platformWidth,
    height: platformHeight,
  };
  platformArray.push(platform);

  platform = {
    img: platformImg,
    x: boardWidth / 2,
    y: boardHeight - 150,
    width: platformWidth,
    height: platformHeight,
  };
  platformArray.push(platform);
}
function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
