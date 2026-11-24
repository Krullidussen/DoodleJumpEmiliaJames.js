/* jshint esversion: 8 */

let normalImg, movingImg, breakingImg;
let platforms = [];

const PLATFORM_COUNT = 8;

async function setup() {
    normalImg = await loadImage('ImageAssets/Platform.png');
    movingImg = await loadImage('ImageAssets/MovingPlatform.png');
    breakingImg = await loadImage('ImageAssets/BreakingPlatform.png');

    createCanvas(400, 600);

    platforms.push(createPlatform(width / 2 - 40, height - 40, "normal"));
    while (platforms.length < PLATFORM_COUNT) {
        addPlatformAbove();
    }
}

function draw(){
    background(173, 216, 230);

    for (let i = 0; i < platforms.length; i++) {
        updatePlatform(platforms[i]);
        drawPlatform(platforms[i]);
    }

    replacePlatforms();
}
//skapa platformar
function createPlatform(x, y, type) {
    return{
        x: x,
        y: y,
        width: 80,
        height: 20,
        type: type,
        speed: 2,
        broken: false
    };
}

function randomType() {
    let r = random();
    if (r < 0.6) {
        return "normal";
    } else if (r < 0.85) {
        return "moving";
    } else {
        return "breaking";
    }
}

function addPlatformAbove() {
    let highestY = height;
    for (let i = 0; i < platforms.length; i++) {
        if (platforms[i].y < highestY) {
            highestY = platforms[i].y;
        }
    }
    let y = highestY - random(60, 110);
    let x = random(0, width - 80);
    platforms.push(createPlatform(x, y, randomType()));
}
//rörelse och ritninig

function updatePlatform(p) {
    if (p.type === "moving") {
        p.x += p.speed;
        if (p.x <= 0 || p.x + p.width >= width) {
            p.speed = -p.speed;
        }
    }
}

function drawPlatform(p) {
    if (p.broken) {
        return;
    }

    let img;
    switch (p.type) {
        case "normal":
            img = normalImg;
            break;
        case "moving":
            img = movingImg;
            break;
        case "breaking":
            img = breakingImg;
            break;
    }
    image(img, p.x, p.y, p.width, p.height);
}
//nya plattformar när man åker uppåt

function scrollPlatforms(amount) {
    for (let i = 0; i < platforms.length; i++) {

    }
}

function replacePlatforms() {
    for (let i = platforms.length - 1; i >= 0; i--) {
        if (platforms[i].y > height) {
            platforms.splice(i, 1);
        }
    }
    while (platforms.length < PLATFORM_COUNT) {
        addPlatformAbove();
    }
}
