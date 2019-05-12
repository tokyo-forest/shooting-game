import * as PIXI from 'pixi.js'
import KeyboardManager from './common/KeyboardManager';
import {MyAircraft} from "./domain/MyAircraft";
import {EnemyAircraft} from "./domain/EnemyAircraft";
import AircraftFactory from "./common/AircraftFactory";
import {Keyboard} from "./common/Keyboard";


// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

let aircraftFactory: AircraftFactory = new AircraftFactory(app.stage);

let ufo: MyAircraft = aircraftFactory.createMyAircraft();
let enemy1: EnemyAircraft = aircraftFactory.createEnemyAircraft();

let keyboardManager: KeyboardManager = new KeyboardManager();

keyboardManager.left.pushPressHandler((event: any) => {
    ufo.moveLeft()
});
keyboardManager.left.pushReleaseHandler((event: any) => {
    if (!keyboardManager.right.isDown) {
        ufo.stopLeft();
    }
});
keyboardManager.up.pushPressHandler((event: any) => {
    ufo.moveUp()
});
keyboardManager.up.pushReleaseHandler((event: any) => {
    if (!keyboardManager.down.isDown) {
        ufo.stopUp();
    }
});

keyboardManager.right.pushPressHandler((event: any) => {
    ufo.moveRight()
});
keyboardManager.right.pushReleaseHandler((event: any) => {
    if (!keyboardManager.left.isDown) {
        ufo.stopRight();
    }
});

keyboardManager.down.pushPressHandler((event: any) => {
    ufo.moveDown()
});
keyboardManager.down.pushReleaseHandler((event: any) => {
    if (!keyboardManager.up.isDown) {
        ufo.stopDown();
    }
});

//Set the game state
let state = (delta: any) => {
    ufo.play();
    enemy1.play();
};

//Start the game loop
app.ticker.add(delta => state(delta));
