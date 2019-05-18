import * as PIXI from 'pixi.js'
import KeyboardManager from './common/KeyboardManager';
import MyAircraftFactory from "./domain/factory/MyAircraftFactory";
import {Aircraft} from "./domain/aircraft/Aircraft";
import EnemyAircraftFactory from "./domain/factory/EnemyAircraftFactory";
import {MyAircraft} from "./domain/aircraft/MyAircraft";


// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

let myAircraftFactory: MyAircraftFactory = new MyAircraftFactory(app.stage);
let enemyAircraftFactory: EnemyAircraftFactory = new EnemyAircraftFactory(app.stage);

let myUfo: MyAircraft = myAircraftFactory.createAircraft();
let enemy1: Aircraft = enemyAircraftFactory.createAircraft();

let keyboardManager: KeyboardManager = new KeyboardManager();

keyboardManager.left.pushPressHandler((event: any) => {
    myUfo.moveLeft()
});
keyboardManager.left.pushReleaseHandler((event: any) => {
    if (!keyboardManager.right.isDown) {
        myUfo.stopLeft();
    }
});
keyboardManager.up.pushPressHandler((event: any) => {
    myUfo.moveUp()
});
keyboardManager.up.pushReleaseHandler((event: any) => {
    if (!keyboardManager.down.isDown) {
        myUfo.stopUp();
    }
});

keyboardManager.right.pushPressHandler((event: any) => {
    myUfo.moveRight()
});
keyboardManager.right.pushReleaseHandler((event: any) => {
    if (!keyboardManager.left.isDown) {
        myUfo.stopRight();
    }
});

keyboardManager.down.pushPressHandler((event: any) => {
    myUfo.moveDown()
});
keyboardManager.down.pushReleaseHandler((event: any) => {
    if (!keyboardManager.up.isDown) {
        myUfo.stopDown();
    }
});

//Set the game state
let state = (delta: any) => {
    myUfo.play();
    enemy1.play();
};

//Start the game loop
app.ticker.add(delta => state(delta));
