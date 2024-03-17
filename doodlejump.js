// board
let board;
let boardWidth = 360;
let boardHeight = 576;
let context;

// doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth / 2 - doodlerWidth / 2;
let doodlerY = boardHeight * (7 / 8) - doodlerHeight;
let doodlerLeftImage;
let doodlerRightImage;

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
};
