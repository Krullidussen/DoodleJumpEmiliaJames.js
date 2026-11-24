/* jshint esversion: 8 */

let img;

async function setup() {
    img = await loadImage('ImageAssets/Platform.png');

    createCanvas(400, 600);

    background(173, 216, 230);

    image(img, 0, 0, 50, 50);

    describe('An image of one of the platforms for the game.');
}
