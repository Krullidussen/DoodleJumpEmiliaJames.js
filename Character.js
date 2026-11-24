let playerSprite;
let player;

const testPlatform = { x: 110, y: 440, width: 140, height: 14 };

class Player {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;

    this.width = 64;
    this.height = this.width * (sprite.height / sprite.width);

    this.velocityY = 0;
    this.facing = 1; // 1 = right, -1 = left
  }

  move() {
    const speed = 5;
    const previousX = this.x;

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= speed;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += speed;
    }

    this.x = constrain(this.x, 0, width - this.width);

    // Remember the last direction she moved, even after the key is released.
    if (this.x < previousX) {
      this.facing = -1;
    } else if (this.x > previousX) {
      this.facing = 1;
    }
  }

  show() {
    push();

    // Draw from her horizontal center so she flips in place.
    translate(this.x + this.width / 2, this.y);
    scale(this.facing, 1);
    image(this.sprite, -this.width / 2, 0, this.width, this.height);

    pop();
  }

  updateJump(platform) {
    const previousFeet = this.y + this.height;

    this.velocityY += 0.4;
    this.y += this.velocityY;

    const currentFeet = this.y + this.height;

    const overlapsHorizontally =
      this.x < platform.x + platform.width &&
      this.x + this.width > platform.x;

    const crossedPlatformTop =
      previousFeet <= platform.y && currentFeet >= platform.y;

    // Bounce when her feet cross the platform's top on the way down.
    if (this.velocityY > 0 && overlapsHorizontally && crossedPlatformTop) {
      this.y = platform.y - this.height;
      this.velocityY = -12;
    }
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

  player.move();
  player.updateJump(testPlatform);

  fill(65, 155, 85);
  rect(testPlatform.x, testPlatform.y, testPlatform.width, testPlatform.height);

  player.show();
}