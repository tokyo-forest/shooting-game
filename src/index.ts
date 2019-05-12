import * as PIXI from 'pixi.js'
import {createKeyboard} from './common/keyboard';
import Sprite = PIXI.Sprite;

class User {
    public age: number;
    public familyName: string;
    public givenName: string;

    constructor(familyName: string, givenName: string, age: number) {
        this.age = age;
        this.familyName = familyName;
        this.givenName = givenName;
    }
}

const user = new User('テスト', 'テスト', 44); // 名前と年齢は適当に

const contentsElem = document.getElementById('contents');
if (!!contentsElem) {
    contentsElem.innerText = `${user.familyName} ${user.givenName}`;
}


// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader.add('bunny', 'contents/img/ufo.gif').load((loader: any, resources: any) => {
    // This creates a texture from a 'bunny.png' image
    const bunny = new PIXI.Sprite(resources.bunny.texture);

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    app.stage.addChild(bunny);

});

let ufoSprite = PIXI.Sprite.from('contents/img/ufo.gif');

interface Ufo {
    sprite: Sprite,
    vx: number,
    vy: number
}

let ufo: Ufo = {
    sprite: ufoSprite,
    vx: 0,
    vy: 0
}

app.stage.addChild(ufoSprite);

let left = createKeyboard("ArrowLeft"),
    up = createKeyboard("ArrowUp"),
    right = createKeyboard("ArrowRight"),
    down = createKeyboard("ArrowDown");


left.press = () => {
    ufo.vx = -5;
    ufo.vy = 0;
};

//Left arrow key `release` method
left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && ufo.vy === 0) {
        ufo.vx = 0;
    }
};

//Up
up.press = () => {
    ufo.vy = -5;
    ufo.vx = 0;
};
up.release = () => {
    if (!down.isDown && ufo.vx === 0) {
        ufo.vy = 0;
    }
};

//Right
right.press = () => {
    ufo.vx = 5;
    ufo.vy = 0;
};
right.release = () => {
    if (!left.isDown && ufo.vy === 0) {
        ufo.vx = 0;
    }
};

//Down
down.press = () => {
    ufo.vy = 5;
    ufo.vx = 0;
};
down.release = () => {
    if (!up.isDown && ufo.vx === 0) {
        ufo.vy = 0;
    }
};

//Set the game state
let state = play;

//Start the game loop
app.ticker.add(delta => gameLoop(delta));

function gameLoop(delta: any){

    //Update the current game state:
    state(delta);
}

function play(delta: any) {

    //Use the cat's velocity to make it move
    ufo.sprite.x += ufo.vx;
    ufo.sprite.y += ufo.vy
}