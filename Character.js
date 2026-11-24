let playerSprite;
let player;

class Player {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.width = 64;
    this.height = this.width * (sprite.height / sprite.width);
  }
  show() {
    image(this.sprite, this.x, this.y, this.width, this.height);
  }
}

function preload() {
  playerSprite = loadImage("asset/player.png");
}

function setup() {
  createCanvas(360, 520);
  player = new Player(156, 180, playerSprite);
}

function draw() {
  background(225, 240, 255);
  player.show();
}